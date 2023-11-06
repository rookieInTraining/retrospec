const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const { faker } = require('@faker-js/faker');

const mongoose = require("mongoose");
const Dashboard = require("../model/Dashboard");
const RetroSpec = require('../model/RetroPoint');

mongoose.connect("mongodb://localhost:27017/retrospec");

router.use(bodyParser.json());

router.get('/dashboard/:id/fetch', async (req, res) => {
    const data = await RetroSpec.find({
        dashboardId: req.params.id,
    });
    if(!data) {
        res.send(404);
    } else {
        res.status(200).send(data);
    }
})

router.post('/create', async (req, res) => {
    const db = new Dashboard({
        _id: req.body.dashboardId,
        name: faker.hacker.ingverb(),
        createdTime: new Date(),
        deleted: false
    });
    await db.save();    
    res.send('204');
})

module.exports = router;