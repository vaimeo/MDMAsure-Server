const express = require('express');
const router = express.Router();

// Render the login page
router.get('/', (req, res, next) => {
  res.render('login', { title: 'Login' });
});

// Render the login page with a custom layout
router.get('/login', (req, res, next) => {
  res.render('login', { layout: './layouts/blank', title: 'Login', mytitle: 'menu' });
});

// Render the dashboard page
router.get('/app', (req, res, next) => {
  res.render('dashboard', { title: 'Dashboard 6 Page', mytitle: 'menu' });
});

// Render the login page with a custom layout for logout
router.get('/logout', (req, res, next) => {
  res.render('login', { layout: './layouts/blank', title: 'Logout' });
});

module.exports = router;
