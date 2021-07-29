const { Router } = require('express');

const authController = require('./controllers/authController');

const router = Router();

router.use('/auth', authController);
router.get('*', (req, res) => {
    //res.render('404');
});

module.exports = router;