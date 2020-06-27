const express = require('express');
const { managerById, getManager } = require('../controllers/managerController');
const { requireSignin } = require('../controllers/auth');
const router = express.Router();

router.get('/manager/:managerId', requireSignin, getManager);
router.param('managerId', managerById)

module.exports = router;
