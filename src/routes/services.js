const express = require('express');
const router = express.Router();
const { accounts, writeJSON } = require('../data');

router.get('/transfer', (request, response) => {
  response.render('transfer');
});

router.post('/transfer', (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount, 10);
  writeJSON();
  res.render('transfer', { message: 'Transfer Completed' });
});

router.get('/payment', (req, res) =>
  res.render('payment', { account: accounts.credit })
);
router.post('/payment', (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);
  writeJSON();
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});

module.exports = router;
