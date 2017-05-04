var express = require('express')
var mongoose = require('mongoose')
var crawler = require('./crawler')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/database')

crawler()