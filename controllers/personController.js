const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Person = mongoose.model('Person');

router.get('/', (req, res) => {
    res.render("person/addOrEdit", {
        viewTitle: "인적 정보"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var person = new Person();
    person.fullName = req.body.fullName;
    person.email = req.body.email;
    person.mobile = req.body.mobile;
    person.city = req.body.city;
    person.save((err, doc) => {
        if (!err)
            res.redirect('person/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("person/addOrEdit", {
                    viewTitle: "Insert Person",
                    person: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Person.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('person/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("person/addOrEdit", {
                    viewTitle: 'Update Person',
                    person: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}


router.get('/list', (req, res) => {
    Person.find((err, docs) => {
        if (!err) {
            res.render("person/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving person list :' + err);
        }
    });
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Person.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("person/addOrEdit", {
                viewTitle: "Update Person",
                person: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/person/list');
        }
        else { console.log('Error in person delete :' + err); }
    });
});

module.exports = router;

