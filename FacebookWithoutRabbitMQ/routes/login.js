/**
 * New node file
 */
var ejs = require("ejs");
var mongo = require("./mongo");
var bcrypt = require('bcrypt-nodejs');
var mongoURL = "mongodb://localhost:27017/fblogin";
exports.login=function(req,res)
{	var email, password,code,value;
	var json_responses; 
	email=req.param("email");
	password=req.param("password");
	console.log("In POST Request = Email:"+ email+" "+password);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fblogin');
	coll.findOne({email:email}, function(err, user){
		if (user)
		{
			if(bcrypt.compareSync(password,user.password))
			{
				console.log(user.password);
				// This way subsequent requests will know the user is logged in.
				code = "200";
				value = "Success Login";
				req.session.username=user.firstname;
				res.render('Header');
			} else
			{
				code = "401";
				value = "Failed Login";
				res.render('login');
			}
		}
	});
 });
};
exports.logout = function(req,res)
{
		req.session.destroy();
		res.redirect('/');
};
