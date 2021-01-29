const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;

const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = "The email address or phone number that you've entered doesn't match any account.";
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = "The password that you've entered is incorrect.";
    }
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }

const createToken = (id) => {
    return jwt.sign({id}, 'iaun secret', {
        expiresIn: maxAge
    })
}

const signup_post = async (req,res) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({ username, email, password });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, overwrite: true });
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        // res.setHeader('Access-Control-Allow-Credentials',true);
        res.status(201).json({ user });
    }
    catch(err) {
        const errors = handleErrors(err);
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        // res.setHeader('Access-Control-Allow-Credentials',true);
        res.status(400).json({ errors });
    }
}

const login_post = async (req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.login(email, password);
        const token = createToken(user._id);
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        // res.setHeader('Access-Control-Allow-Credentials',true);
        res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge* 1000, overwrite: true});
        res.status(200).json({ user });
    }
    catch (err){
        const errors = handleErrors(err);
        // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        // res.setHeader('Access-Control-Allow-Credentials',true);
        res.status(400).json({ errors });
    }
}

const logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1,secure: false, overwrite: true });
    res.status(200).json({});
}

const checkUser = (req, res ) => {
    const token = req.cookies.jwt;
    console.log('checkUser',token);
    if (token) {
      jwt.verify(token, 'iaun secret', async (err, decodedToken) => {
        if (err) {
            console.log(err.message);
            res.send({ errors: err })
        } else {
            let user = await User.findById(decodedToken.id);
            res.send({ user });
        }
      });
    } else {
        res.status(400);
    }
  };
module.exports = {signup_post, login_post, logout_get, checkUser}