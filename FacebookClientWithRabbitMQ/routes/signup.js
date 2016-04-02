/**
 * New node file
 */
var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fblogin";
exports.signup=function(req,res)
{
	var json_responses;
	var password=req.param("signuppassword");
	var firstname=req.param("firstname");
	var lastname=req.param("lastname");
	var email=req.param("signupemail");
	var msg_payload = { "email": email, "password": password,"firstname": firstname, "lastname": lastname };		
	console.log("In POST Request for signup= email:"+ email+" "+password);
	mq_client.make_request('signup_queue',msg_payload, function(err,results){
		console.log(results);
		if(err)
		{
			throw err;
		}
		else 
		{
			if(results.code == 200)
			{
				console.log("valid Login");
				json_responses = {"statusCode" : 200};
				////req.session.username=results.session;
				console.log("Session Value="+req.session.username);
				//res.send(json_responses);
				res.render('login');
			}
			else 
			{    
				
				console.log("Invalid Login");
				json_responses = {"statusCode" : 401};
				//res.send(json_responses);
				res.render('login');
			}
		}  
	});
};
