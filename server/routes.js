const { Router } = require('express');

const authController = require('./controllers/authController');
const companyController = require('./controllers/companyController');

const router = Router();

router.use('/auth', authController);
router.use('/company', companyController);

router.get('*', (req, res) => {
    //res.render('404');
});

module.exports = router;