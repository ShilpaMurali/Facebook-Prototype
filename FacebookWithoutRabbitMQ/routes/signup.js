/**
 * New node file
 */
var ejs = require("ejs");
var mongo = require("./mongo");
var bcrypt = require('bcrypt-nodejs');
var mongoURL = "mongodb://localhost:27017/fblogin";
exports.signup=function(req,res)
{
	var json_responses,code,value;
	var password=req.param("signuppassword");
	var firstname=req.param("firstname");
	var lastname=req.param("lastname");
	var email=req.param("signupemail");
	console.log("In POST Request for signup= email:"+ email+" "+password);
	console.log("In handle request:"+email);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fblogin');
		coll.insert({email:email,password:bcrypt.hashSync(password, null, null),firstname:firstname,lastname:lastname},function(err,user)
		{
			code = "200";
			value = "Success Signup";
			res.render('login');
		});
	});
};
