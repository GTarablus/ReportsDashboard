const express = require('express');
const { setTask, getCount } = require('../services/task.service');

const router = express.Router();

router.get('/:type', getCount);
router.get('/:type/:id/status', setTask);

module.exports = router;
