const fs = require('fs');
const path = require('path');
const express = require('express');
const { response } = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
  response.render('index', { title: 'Index' });
});

app.listen(3000, () => {
  console.log('PS Project Running on port 3000!');
});
