var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
 
var app = express();
 
// all environments

app.set('port', process.env.PORT || 2000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
 
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
 
mongoose.connect('mongodb://localhost/Signup');
 
var Schema = new mongoose.Schema({
	name   : String,
	surname: String,
	dob   : Date,
	email:String,
	passwd:String,
	cpassword:String,
	phno:Number,
	adhno:Number,
	pan:String
	
});
 
var user = mongoose.model('emp', Schema);

app.get('/view', function(req, res){
	user.find({}, function(err, docs){
		if(err) res.json(err);
		else    res.render('index', {users: docs});
	});
});
 
app.post('/new', function(req, res){
	new user({
		name   : req.body.name,
		surname: req.body.surname,
		dob   : req.body.year,
		email: req.body.email,
		passwd  : req.body.password,
		cpassword: req.body.cpassword,
		phno   : req.body.phno,
		adhno   : req.body.adhno,
		pan: req.body.pan
	}).save(function(err, doc){
		if(err) res.json(err);
		else    res.redirect('/view');
	});
});
 
 
 
var server = http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});