
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MyDB', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
require('./person.model');
require('./sensor.model');

/*
mongoose.createConnection('mongodb://127.0.0.1:27017/MyDB', { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
});
require('./sensor.model');
*/









/*
const mongoose = require('mongoose');

const conn = mongoose.createConnection('mongodb://127.0.0.1:27017/EmployeeDB'   , { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
}        );
const EmployeeModel = conn.model('EmployeeModel', require('./employee.model'));

EmployeeModel.find({}, function() {
    console.log("this will print out last");
 });




const conn2 = mongoose.createConnection('mongodb://127.0.0.1:27017/SensorDB'   ,  { useNewUrlParser: true, useUnifiedTopology: true}, (err) => {


if (!err) { console.log('MongoDB Connection Succeeded.') }
    else { console.log('Error in DB connection : ' + err) }
}  );
const SensorModel =conn2.model('SensorModel', require('./sensor.model'));

SensorModel.find({}, function() {
    console.log("this will print out last");
 });

*/


//module.exports = {conn, EmployeeModel, conn2,SensorModel};





/*
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/EmployeeDB');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

*/