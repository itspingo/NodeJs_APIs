// connection configurations
/*
var mysql = require('mysql');
 var dbConn = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: '',
     database: 'nodejs'
 });
 // connect to database
 return dbConn.connect(); 
 */
 
 var mysql=require('mysql');
 var connection=mysql.createConnection({
   host:'localhost',
   user:'root',
   password:'',
   database:'nodejs'
 });
connection.connect(function(error){
   if(!!error){
     console.log(error);
   }else{
     console.log('Connected!:)');
   }
 });  
 
module.exports = connection;