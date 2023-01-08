var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

var dbConn = require('./dbconnect');


app.use(bodyParser.urlencoded({
	extended: true
}));



// default route
app.get('/', async(req, res)=>{
return res.send({ error: true, message: 'Hi, I am NODE-JS SERVER' })
});



// Retrieve all users 
app.get('/:tbl', async(req, res)=>{
let table_name = req.params.tbl;	
if (!table_name) {
return res.status(400).send({ error: true, message: 'Please provide table name' });
}

dbConn.query('SELECT * FROM ' + table_name, function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'users list.' });
});
});


// Retrieve user with id 
app.get('/:tbl/:id', async(req, res)=>{
let table_name = req.params.tbl;
if (!table_name) {
return res.status(400).send({ error: true, message: 'Please provide table name' });
}

let vid = req.params.id;
if (!vid) {
return res.status(400).send({ error: true, message: 'Please provide record ID' });
}

dbConn.query('SELECT * FROM '+table_name+' where id=?', vid, function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results[0], message: 'list.' });
});
});



// Retrieve user with id 

app.post('/find/:tbl', async(req, res)=>{
let table_name = req.params.tbl;
if (!table_name) {
return res.status(400).send({ error: true, message: 'Please provide table name' });
}

let vcond = req.body.cond;

//return res.status(400).send({ error: true, cond: vcond });

if (!vcond) {
return res.status(400).send({ error: true, message: 'Please provide condition' });
}

dbConn.query('SELECT * FROM '+table_name+' where ?', vcond, function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'Search Result.' });
});
});



// Add a new user  
app.post('/:tbl', async(req, res)=>{
	let table_name = req.params.tbl;
	if (!table_name) {
return res.status(400).send({ error: true, message: 'Please provide table name' });
}

	let vdata = req.body.data;
	
if (!vdata) {
return res.status(400).send({ error:true, message: 'Please provide record details' });
}
dbConn.query("INSERT INTO "+table_name+" SET ? ", vdata, function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'New record has been created successfully.' });
});
});



//  Update user with id
app.put('/:tbl', async(req, res)=>{
	let table_name = req.params.tbl;
	if (!table_name) {
return res.status(400).send({ error: true, message: 'Please provide table name' });
}

let vdata = req.body.data;
let vcond = req.body.cond;

//dbConn.query("UPDATE "+table_name+" SET name = ? , email = ? WHERE id = ?", [vname, vemail, vid], function (error, results, fields) {
	dbConn.query("UPDATE "+table_name+" SET ? WHERE ?",[vdata, vcond],  function (error, results, fields) {
	
if (error) throw error;
return res.send({ error: false, data: results, message: 'user has been updated successfully.' });
});

});




//  Delete user
app.delete('/:tbl', async(req, res)=>{
	let table_name = req.params.tbl;
	if (!table_name) {
return res.status(400).send({ error: true, message: 'Please provide table name' });
}

let vcond = req.body.cond;


if (!vcond) {
return res.status(400).send({ error: true, message: 'Please provide valid condition' });
}
dbConn.query("DELETE FROM "+table_name+" WHERE ?", [vcond], function (error, results, fields) {
if (error) throw error;
return res.send({ error: false, data: results, message: 'Record has been deleted successfully.' });
});
}); 





// set port
app.listen(3030, async(req, res)=>{
console.log('Node app is running on port 3030');
});


module.exports = app;