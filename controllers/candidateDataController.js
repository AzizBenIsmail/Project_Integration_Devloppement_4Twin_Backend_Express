var express = require("express");
var router = express.Router();
const fs = require('fs');
const pdf = require('pdf-parse');

const dataBuffer = fs.readFileSync('public/resumes/CV.pdf')
pdf(dataBuffer).then(function(data) {
  console.log(data);
  //res.json(data);
})

//module.exports = { dataBuffer };
