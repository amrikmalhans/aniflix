const express = require('express');
const routes = require('express').Router();
const User = require('../models/userSchema');
const bcrypt = require('bcryptjs')
const passport = require('passport')

// Login Page
routes.get('/login', (req, res) => {
   res.render('login')
  });

//Register Page
routes.get('/register', (req, res) => {
    res.render('register')
   });

//Register Handle
routes.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
     // Validation Passed
     User.findOne({ email: email })
        .then(user => {
            if(user){
                // User Exist
                errors.push({ msg: 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2
                });
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                }) 
                bcrypt.genSalt(10, (err, salt) => 
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) throw err;
                        // set password to hash
                        newUser.password = hash;
                        // save user
                        newUser.save()
                            .then(user => {
                                req.flash('success_msg', 'You are now registered and can log in!')
                                res.redirect('/users/login');
                            })
                            .catch(err => console.error(err))
                }))
                
            }
        })
  }

   });

// Login Handle
routes.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});


// logout Handle
routes.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = routes;


























