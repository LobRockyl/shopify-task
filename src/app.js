const mongoose = require('mongoose');

// Import Routes
const routes = require('./routes');
const fastifyEnv = require('fastify-env');
// Require the fastify framework and instantiate it
const fastify = require('fastify');
require('dotenv').config();

function build(opts = {}) {
	const app = fastify(opts);
	const schema = {
		type: 'object',
		required: ['MONGO_DB_URI'],
		properties: {
			MONGO_DB_URI: {
				type: 'string',
			},
		},
	};
	const options = {
		confKey: 'config',
		dotenv: true,
		schema: schema,
		data: process.env,
	};
	// Loop over each route
	routes.forEach((route, index) => {
		app.route(route);
	});
	app.register(require('fastify-formbody'));
	app.register(fastifyEnv, options);

	app.register(require('point-of-view'), {
		engine: {
			ejs: require('ejs'),
		},
	});
	mongoose
		.connect(process.env.MONGO_DB_URI)
		.then(() => console.log('MongoDB connected...'))
		.catch((err) => console.log(err));

	return app;
}

module.exports = build;
