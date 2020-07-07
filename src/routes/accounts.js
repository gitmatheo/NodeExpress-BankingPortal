const express = require('express');
const router = express.Router();

const { accounts } = require('../data');

router.get('/savings', (request, response) => {
  response.render('account', { account: accounts.savings });
});

router.get('/checking', (request, response) => {
  response.render('account', { account: accounts.checking });
});

router.get('/credit', (request, response) => {
  response.render('account', { account: accounts.credit });
});

module.exports = router;
