const express = require('express');
const router = express.Router();
const { createObject, getObjects, updateObject, deleteObject } = require('../controllers/objectController');
const auth = require('../middleware/auth');

router.post('/', auth, createObject);

router.get('/', auth, getObjects);

router.put('/:id', auth, updateObject);

router.delete('/:id', auth, deleteObject);

module.exports = router;
