var ejs = require("ejs");
var mq_client = require('../rpc/client');
exports.profileCreation=function(req,res){
	console.log("Inside profile");
	var userOverview,json_responses,workAndEductaion,contactInfo,lifeEvents,yourName;
	userOverview=req.param("userOverview");
	workAndEductaion=req.param("workAndEductaion");
	contactInfo=req.param("contactInfo");
	lifeEvents=req.param("lifeEvents");
	yourName=req.session.username;
	var msg_payload={"userOverview":userOverview,"workAndEductaion":workAndEductaion,"contactInfo":contactInfo,"lifeEvents":lifeEvents,"username":yourName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('profileEdit_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Profile Edit");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.profileInfo=function(req,res){
	console.log("Inside profileInfo");
	var json_responses={};
	var yourName,name;
	//yourName=req.session.username;
	name=req.param("name");
	if(name==1)
	{
		name=req.session.username;
	}
	var msg_payload={"username":name};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('profileInfo_queue',msg_payload, function(err,results){
		console.log(" Profile is "+ results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				json_responses = {"statusCode" : 200,"userOverview":results.userOverview,"workAndEductaion":results.workAndEductaion,"contactInfo":results.contactInfo,"lifeEvents":results.lifeEvents};
				console.log("Response after adding profile");
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid profile Info");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.interestCreation=function(req,res){
	console.log("Inside interest");
	var json_responses,music,shows,sports,yourName;
	music=req.param("music");
	shows=req.param("shows");
	sports=req.param("sports");
	yourName=req.session.username;
	var msg_payload={"music":music,"shows":shows,"sports":sports,"username":yourName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('interestEdit_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Interest Edit");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.interestInfo=function(req,res){
	console.log("Inside interestInfo");
	var json_responses={};
	var name;
	name=req.param("name");
	if(name==1)
	{
		name=req.session.username;
	}
	var msg_payload={"username":name};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('interestInfo_queue',msg_payload, function(err,results){
		console.log(" Interests is "+ results.music);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){
				json_responses = {"statusCode" : 200,"music":results.music,"sports":results.sports,"shows":results.shows};
				console.log("Response after adding interest");
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Interest Info");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};