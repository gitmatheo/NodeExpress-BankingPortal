const fs = require('fs');
const path = require('path');
const express = require('express');
const { response } = require('express');

const app = express();
const accountRoutes = require('./routes/accounts.js');
const servicesRoutes = require('./routes/services.js');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/services', servicesRoutes);
app.use('/accounts', accountRoutes);

// fs.readFileSync("src/json/accounts.json", "UTF-8")

const { accounts, users, writeJSON } = require('./data.js');

app.get('/', (request, response) => {
  response.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/profile', (request, response) => {
  response.render('profile', { user: users[0] });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
