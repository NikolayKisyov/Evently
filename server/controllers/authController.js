const router = require('express').Router();
const config = require('../config/index');
const authService = require('../services/authService');

const { auth } = require('../middlewares/auth');
const { json } = require('express');

router.post('/login', async (req, res, next) => {
    try {
        let token = await authService.login(req.body);
        let user = token.user;
        res.cookie(config.COOKIE_NAME, token.token, { httpOnly: true }).json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});

router.post('/register', async (req, res) => {
    try {
        let result = await authService.register(req.body);
        // console.log(result);
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.json(error);
    }
});


router.post('/logout', async (req, res, next) => {
    res.clearCookie(config.COOKIE_NAME).send();
});

module.exports = router;