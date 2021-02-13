const express = require('express');
const router = express.Router();

const {
    userControllerSingUpGet,
    userControllerSingInGet,
    userControllerSingUpPost,
    userControllerSingInPost,
    userControllerSingOut
} = require('../controllers/user.controller');

router.get('/signup', userControllerSingUpGet);

router.post('/signup', userControllerSingUpPost);

router.get('/signin', userControllerSingInGet);

router.post('/signin', userControllerSingInPost)

router.get('/signout', userControllerSingOut);

module.exports = router;