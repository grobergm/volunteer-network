const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path')
const app = express(); // Export app for other routes to use

const port = 8000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', (req,res)=>{
  console.log(req.body)
});

app.listen(port, () => console.log(`Server is listening on port: ${port}`));
