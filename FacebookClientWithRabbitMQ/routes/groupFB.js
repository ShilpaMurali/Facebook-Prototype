var ejs = require("ejs");
var mq_client = require('../rpc/client');
exports.group=function(req,res){
	console.log("Inside group");
	var groupName,json_responses,yourName;
	var groupMember={};
	var groupname=req.param("groupname");
	var groupmember=req.param("groupmember");
	yourName=req.session.username;
	var msg_payload={"groupname":groupname,"groupmember":groupmember,"username":yourName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('group_queue',msg_payload, function(err,results){
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
				console.log("Invalid Group");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.groupMembers=function(req,res){
	console.log("Inside group Members");
	var groupName,json_responses,yourName;
	yourName=req.session.username;
	var msg_payload={"username":yourName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('groupMember_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"list":results.list};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Group");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.membersOfAGroup=function(req,res){
	console.log("Inside group Members List");
	var json_responses,yourName;
	yourName=req.session.username;
	var groupname=req.param("groupname");
	var msg_payload={"username":yourName,"groupname":groupname};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('groupMemberList_queue',msg_payload, function(err,results){
		console.log(results);
		if(err){
			throw err;
		}
		else 
		{
			if(results.code == 200){				
				json_responses = {"statusCode" : 200,"list":results.list};
				console.log(json_responses);
				res.send(json_responses);
			}
			else 
			{    				
				console.log("Invalid Group");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.deleteGroupMember=function(req,res){
	console.log("Inside group Members delete");
	var json_responses,yourName;
	yourName=req.session.username;
	var groupMemberToBeDeleted=req.param("groupMemberToBeDeleted");
	var groupName=req.param("groupName");
	var msg_payload={"username":yourName,"groupMemberToBeDeleted":groupMemberToBeDeleted,"groupName":groupName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('groupMemberDelete_queue',msg_payload, function(err,results){
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
				console.log("Invalid Deletion");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};
exports.deleteGroup=function(req,res){
	console.log("Inside group delete");
	var json_responses,yourName;
	yourName=req.session.username;
	var groupName=req.param("groupName");
	var msg_payload={"username":yourName,"groupName":groupName};
	console.log("Message Payload"+ JSON.stringify(msg_payload));
	mq_client.make_request('groupDelete_queue',msg_payload, function(err,results){
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
				console.log("Invalid Deletion");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		}  
	});
};