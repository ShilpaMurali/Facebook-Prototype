var ejs = require("ejs");
var mq_client = require('../rpc/client');
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbfriend";
exports.friendRequest=function(req,res)
{
	console.log("Inside friend request");
	//console.log("In friend request");
	var friendName,json_responses,yourName;
	friendName=req.param("fbfriend");
	console.log("friend"+friendName);
	yourName=req.session.username;
	var msg_payload={"username":yourName,"friendname":friendName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('friend_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"value" :results.value};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Search");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.friendFunction=function(req,res)
{

	console.log("Inside Add friend function");
	console.log("In add friend request");
	var friendName,json_responses,yourName;
	friendName=req.param("fbfriend");
	console.log("friend"+friendName);
	yourName=req.session.username;
	var msg_payload={"username":yourName,"friendname":friendName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('addfriend_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"value" :results.value};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Search");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.acceptRequest=function(req,res)
{
	console.log("Inside Accept friend function");
	console.log("In add friend request");
	var friendName,json_responses,yourName;
	friendName=req.param("fbfriend");
	console.log("friend"+friendName);
	yourName=req.session.username;
	var msg_payload={"username":yourName,"friendname":friendName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('acceptfriend_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"value" :results.value};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Search");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.friendList=function(req,res)
{
	console.log("Inside friend list function");
	var json_responses,yourName;
	yourName=req.session.username;
	var msg_payload={"username":yourName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('listfriend_queue',msg_payload, function(err,results){
		
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"friendList" :results.list};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Search");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
