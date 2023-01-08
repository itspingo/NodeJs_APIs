# NodeJs_APIs
Node JS APIs for CRUD operations with MySQL database

after download into a separate folder, you will need to run these commands:
1. npm install  /* this will install all required node js packages used in this project */
2. nodemon ./server.js   /* this will run the server with URL:   http://localhost:3030/     */

- Usage

1. get all records from provided table name
http://localhost:3030/{table_name}   

2. get record form a table against record id
http://localhost:3030/{table_name}/{id}

3. find record from a table against some condition provided in json format
http://localhost:3030/find/{table_name}

condition to be provided

{
"cond":{
       "name" : "john"
       }
}

4. post a new record provided in json formate into a table
http://localhost:3030/{table_name}

data to be posted

{
"data":{
       "name" : "john",
       "email" : "jobh@email.com"
       }
}

5. put command is used to update an existing data against record id condtion provided in json format
http://localhost:3030/{table_name}

{
"data":{
       "name" : "john",
       "email" : "jobh@email.com"
       },
 "cond":{
       "id" : "2"
       }
}

6. delete command is used to delete a record against record id provided in json format
http://localhost:3030/{table_name}

condition to provide in json format
{
"cond":{
       "id" : "3"
       }
}

that's it.
