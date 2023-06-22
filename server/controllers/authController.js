
const router = require('express').Router();   
const { body, validationResult } = require('express-validator');     
const { isGuest, isUser} = require('../middlewares/guards.js');    
const { register, login, } = require('../services/userService.js');


router.post('/register',  
    isGuest(),
    body('email')
        .trim()
        .isEmail().withMessage('Invalid email'),
    body('username')
        .trim()
        .isLength({ min: 1 }).withMessage('Username is required'),
    body('password')
        .trim()
        .isLength({ min: 1 }).withMessage('Password is required'),
    
    async (req, res) => {
    try {
        const { errors } = validationResult(req);
        
        if(errors.length > 0) {
            const message = errors.map(e => e.msg).join('\n');
            throw new Error(message);
        }

        const userData = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password, 
            memberSince: req.body.memberSince,
            location: req.body.location,
        }
        console.log('>>>>> in server authController')

        const registerData = await register(userData);
        console.log(registerData) 
        res.json(registerData);
    } catch (err) {
        console.log('>> err from auth ', err.message)
        
        res.status(err.status || 400).json({ message: err.message }) // 409 Conflict
    }  
});


router.post('/login', isGuest(), async (req, res) => {
    try {
        console.log(req.body.username, req.body.password)
     
        const userData = await login(req.body.username, req.body.password);
        res.json(userData);
    } catch(err) {
        console.log('>>> in authController/login  ', err.message);
        res.status(err.status || 400).json({ message: err.message }) // 409 Conflict
    }
});

router.get('/logout', isUser(), (req, res) => {
    console.log('logged out')
    res.status(204).json();

})


module.exports = router;




