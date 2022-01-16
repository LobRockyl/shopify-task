const mongoose = require("mongoose");
const Item = require('../models/Item')
//const {start} = require("../index")
const build = require('../app')
beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})

test("Get all items: GET /api/items", async () => {
  const b = build()
  const item = new Item({name:"test",group:"test-group"});
  const a = await item.save()

 
  const response = await b.inject({
    method: 'GET',
    url: "/api/items"
  })
  console.log(response)
  expect(response.statusCode).toEqual(200)  
});

test("Get items of group: GET /api/items/:group", async () => {
  const b = build()
  const item = new Item({name:"test",group:"test-group"});
  const a = await item.save()

 
  const response = await b.inject({
    method: 'GET',
    url: "/api/items/test-group"
  })
  console.log(response.body)
  expect(response.statusCode).toEqual(200) 
  resp=response.json()
  expect(resp["success"]).toEqual(true) 
  // response.body.items.length
  expect(resp["items"]).not.toHaveLength(0)
});

//CRUD test
test("CRUD test", async () => {
  const b = build()

  //CREATE
  const item = new Item({name:"test",group:"test-group"});
  const a = await item.save()
  created_item = a._id
  console.log("created item ID:",created_item)
  var resp;

  //READ
  const response = await b.inject({
    method: 'GET',
    url: "/api/item/"+created_item.toString()
  })
  console.log("Read item ID: ",response.body)
  expect(response.statusCode).toEqual(200) 
  resp=response.json()
  expect(resp["success"]).toEqual(true) 

  //UPDATE
  const response1 = await b.inject({
    method: 'PUT',
    url: "/api/items/"+created_item.toString(),
    body:{name:"edited_name",group:"edited_group"}
  })
  console.log("Update")
  expect(response1.statusCode).toEqual(200) 
  resp=response1.json()
  expect(resp["success"]).toEqual(true)

  //CHECK EDITED VALUE 
  const response2 = await b.inject({
    method: 'GET',
    url: "/api/item/"+created_item.toString()
  })
  console.log("Read item ID: ",response2.body)
  expect(response2.statusCode).toEqual(200) 
  resp=response2.json()
  expect(resp["success"]).toEqual(true)
  expect(resp["items"]["name"]).toEqual("edited_name")
  expect(resp["items"]["group"]).toEqual("edited_group")
  
  //DELETE
  const response3 = await b.inject({
    method: 'DELETE',
    url: "/api/items/"+created_item.toString() 
  })
  console.log("Delete")
  expect(response3.statusCode).toEqual(200) 
  resp=response3.json()
  expect(resp["success"]).toEqual(true)

  //CHECK IF DELETED
  const response4 = await b.inject({
    method: 'GET',
    url: "/api/item/"+created_item.toString()
  })
  console.log(response4)
  expect(response4.statusCode).toEqual(404) //should be not found aka 404
  resp=response4.json()
  expect(resp["success"]).toEqual(false)
});