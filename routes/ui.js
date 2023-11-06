const path = require('path');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const static_path = '/../pages/'

router.use(bodyParser.json());
router.use(express.static(path.join(__dirname + '/../static')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + static_path + 'index.html'));
})

router.get('/dashboard/:id', (req, res) => {
    res.sendFile(path.join(__dirname + static_path + 'dashboard.html'));
})

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + static_path + 'not-found.html'));
})

module.exports = router;