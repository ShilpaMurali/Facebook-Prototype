/**
 * New node file
 */
var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fblogin";
exports.login=function(req,res)
{	var email, password;
	var json_responses; 
	email=req.param("email");
	password=req.param("password");
	var msg_payload = { "email": email, "password": password };		
	console.log("In POST Request = Email:"+ email+" "+password);
	mq_client.make_request('login_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				req.session.username=results.session;
				console.log("Final Session"+req.session.username);
				//var json_responses={"statusCode":200};
				res.render('Header');
			}
			else {    				
				console.log("Invalid Login");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.render('login');
			}
		}  
	});
	//req.session.username=globalSession;
	console.log("Final Session"+req.session.username);
};
exports.logout = function(req,res)
{
		req.session.destroy();
		res.redirect('/');
};
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
		//Set these headers to notify the browser not to maintain any cache for the page being loaded
		res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
		res.render("homepage",{username:req.session.username});
	}
	else
	{
		res.redirect('/');
	}
};