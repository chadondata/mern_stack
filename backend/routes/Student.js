const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const studentSchema = require('../models/Student');

router.route('/create-student').post((req, res, next) => {
    console.log('Received post!');
    studentSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            console.log(data);
            res.json(data);
        }
    });
    console.log('Yup!');
});

router.route('/edit-student/:id').get((req, res, next) => {
    studentSchema.findById(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

router.route('/update-student/:id').put((req, res, next) => {
    studentSchema.findByIdAndUpdate(req.params.id, {
        $set : req.body
    }, (error, data) => {
        if (error) {
            console.log(error);
            return next(error);
        } else {
            res.json(data);
            console.log('Student updated successfully');
        }
    });
});

router.route('/delete-student/:id').delete((req, res, next) => {
    studentSchema.findByIdAndRemove(req.params.id, (error, Data) => {
        if(error) {
            return next(error);
        } else {
            res.status(200).json({
                msg : data
            });
        }
    });
});

module.exports = router;