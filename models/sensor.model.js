const mongoose = require('mongoose');

var SensorSchema = new mongoose.Schema({
    temper: {
        type: String,
        required: 'This field is required.'
    },
    humid: {
        type: String
    },
    pir: {
        type: Boolean
    }
});



mongoose.model('Sensor', SensorSchema);