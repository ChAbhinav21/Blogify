const { Router } = require('express');
const router = Router();
const User = require('../models/user');

// GET: Sign In
router.get('/signin', (req, res) => {
    const error = req.session.error;
    const success = req.session.success;
    
    // Clear after showing
    req.session.error = null;
    req.session.success = null;

    return res.render('signin', { error, success });
});

// GET: Sign Up
router.get('/signup', (req, res) => {
    const exist = req.session.exist;
    const field = req.session.field;

    // Clear after showing
    req.session.exist = null;
    req.session.field = null;

    return res.render('signup', { exist, field });
});

router.get('/logout',(req,res)=>{
    return res.clearCookie("token").render('home',{user:null});
})

// POST: Sign Up
router.post('/signup', async (req, res) => {
    const { FullName, email, password } = req.body;

    if (!email || !password || !FullName) {
        req.session.field = true;
        return res.redirect('/user/signup');
    }

    const exist = await User.findOne({ email });

    if (exist) {
        req.session.exist = true;
        return res.redirect('/user/signup');
    }

    await User.create({  FullName, email, password }); // 🔐 Hashing to be added later
    return res.redirect('/user/signin');
});

// POST: Sign In
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
        
        res.cookie("token", token);
         return res.render('home',{user:req.user});
    } catch (err) {
        req.session.error = "Invalid email or password";
        return res.redirect('/user/signin');
    }
});

module.exports = router;
