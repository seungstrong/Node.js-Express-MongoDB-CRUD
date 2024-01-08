const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Sensor = mongoose.model('Sensor');

router.get('/', (req, res) => {
    res.render("sensor/addOrEdit", {
        viewTitle: "센서 정보"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var sensor = new Sensor();
    sensor.temper = req.body.temper;
    sensor.humid = req.body.humid;
    sensor.pir = req.body.pir;
    sensor.save((err, doc) => {
        if (!err)
            res.redirect('sensor/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("sensor/addOrEdit", {
                    viewTitle: "Insert Sensor",
                    sensor: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Sensor.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('sensor/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("sensor/addOrEdit", {
                    viewTitle: 'Update Sensor',
                    sensor: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Sensor.find((err, docs) => {
        if (!err) {
            res.render("sensor/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving sensor list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'temper':
                body['TemperError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Sensor.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("sensor/addOrEdit", {
                viewTitle: "Update Sensor",
                sensor: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Sensor.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/sensor/list');
        }
        else { console.log('Error in sensor delete :' + err); }
    });
});

module.exports = router;