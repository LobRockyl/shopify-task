// Get Data Models
const Item = require('../models/Item');
const sanityChecker = require('../services/sanity_check');
exports.view = async (req, reply) => {
	reply.view('./src/views/index.ejs');
};
exports.view_create = async (req, reply) => {
	reply.view('./src/views/create.ejs');
};
exports.view_edit = async (req, reply) => {
	reply.view('./src/views/edit.ejs');
};
exports.view_delete = async (req, reply) => {
	reply.view('./src/views/delete.ejs');
};
// Get all items
exports.getItems = async (req, reply) => {
	try {
		const items = await Item.find();
		reply.send({ success: true, items });
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};
exports.getItem = async (req, reply) => {
	try {
		const items = await Item.findOne({ _id: req.params.id });
		console.log('itemsss----->', items);
		if (items && items != null) {
			reply.send({ success: true, items });
		} else {
			reply.statusCode = 404;
			reply.code(404).send({ success: false, items });
		}
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};
// Get all items segregated group-wise
exports.getAllItemsGroupwise = async (req, reply) => {
	try {
		const items = await Item.aggregate([
			{
				$group: {
					_id: '$group',
					doc: {
						$push: { name: '$name', id: '$id' },
					},
				},
			},
		]);
		reply.send({ success: true, items });
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};
// Get items of a group
exports.getGroupwiseItems = async (req, reply) => {
	try {
		console.log(req.params);
		const group = req.params.group;
		const items = await Item.find({ group: group });
		reply.send({ success: true, items });
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};

// Add a new item
exports.createItem = async (req, reply) => {
	try {
		//check creation data for sanity
		if (await sanityChecker.creation_data_checker(req.body)) {
			creation_data = req.body;

			const new_item = new Item(creation_data);

			// reply.send({success:true,msg:"new item created"})
			const a = await new_item.save();
			reply.view('./src/views/index.ejs', {
				success: true,
				msg: 'new item created',
			});
		} else {
			reply.view('./src/views/index.ejs', {
				success: false,
				msg: 'Please input correctly',
			});
		}
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};

// // Update an existing item
exports.updateItem = async (req, reply) => {
	try {
		const id = req.params.id;
		//check updateData for sanity
		const checked_item_data =
			await sanityChecker.edition_data_checker_and_formatter(req.body);
		console.log(checked_item_data);
		if (checked_item_data.success == true) {
			const { ...updateData } = checked_item_data.data;
			const update = await Item.updateOne({ _id: id }, updateData, {
				new: true,
			});
			if (update.n > 0) {
				reply.send({ success: true, msg: 'item updated' });
			} else {
				reply.send({ success: false, msg: 'item not found' });
			}
		} else {
			reply.send({ success: false, msg: checked_item_data.msg });
		}
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};

// Delete an item
exports.deleteItem = async (req, reply) => {
	try {
		const id = req.params.id;
		const deleted = await Item.findOneAndDelete({ _id: id });
		//console.log(car)
		console.log(deleted === null);
		if (deleted === null) {
			reply.code(404).send({ success: false, msg: 'item not found' });
		} else {
			reply.send({ success: true, msg: 'item deleted' });
		}
	} catch (err) {
		reply.send({ success: false, error: err });
	}
};
