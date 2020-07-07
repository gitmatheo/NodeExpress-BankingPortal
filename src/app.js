const fs = require('fs');
const path = require('path');
const express = require('express');
const { response } = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// fs.readFileSync("src/json/accounts.json", "UTF-8")

const accountData = fs.readFileSync('src/json/accounts.json', 'UTF-8');
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync('src/json/users.json', 'UTF-8');
const users = JSON.parse(userData);

app.get('/', (request, response) => {
  response.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', (request, response) => {
  response.render('account', { account: accounts.savings });
});

app.get('/checking', (request, response) => {
  response.render('account', { account: accounts.checking });
});

app.get('/credit', (request, response) => {
  response.render('account', { account: accounts.credit });
});

app.get('/profile', (request, response) => {
  response.render('profile', { user: users[0] });
});

app.get('/transfer', (request, response) => {
  response.render('transfer');
});

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance -= req.body.amount;
  accounts[req.body.to].balance += parseInt(req.body.amount, 10);
  let accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, 'json', 'accounts.json'),
    accountsJSON,
    'utf8'
  );
  res.render('transfer', { message: 'Transfer Completed' });
});

app.get('/payment', (req, res) =>
  res.render('payment', { account: accounts.credit })
);
app.post('/payment', (req, res) => {
  accounts.credit.balance -= req.body.amount;
  accounts.credit.available += parseInt(req.body.amount);
  let accountsJSON = JSON.stringify(accounts, null, 4);
  fs.writeFileSync(
    path.join(__dirname, 'json', 'accounts.json'),
    accountsJSON,
    'utf8'
  );
  res.render('payment', {
    message: 'Payment Successful',
    account: accounts.credit,
  });
});
app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
