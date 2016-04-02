var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbgroup";
exports.group=function(req,res){
	console.log("Inside group");
	var groupName,json_responses,username,code,value;
	var groupMember={};
	var groupname=req.param("groupname");
	var groupmember=req.param("groupmember");
	username=req.session.username;
	console.log("In group handle request:"+groupname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupname:groupname}).toArray(function(err, user){
		if (user.length==0)
		{
			coll.insert({groupname:groupname,groupmember:[groupmember,username],groupadmin:username},function(err,user)
					{
										code = "200";
										value = "Group Created";
										json_responses={"statusCode":200};
										res.send(json_responses);
					});
		}
		else
		{
			coll.update({groupname:groupname},{$addToSet:{groupmember:groupmember}},function(err,user)
					{
										code = "200";
										value = "Member Added";
										json_responses={"statusCode":code};
										res.send(json_responses);
					});
		}
	});
});	
};
exports.groupMembers=function(req,res){
	console.log("Inside group Members");
	var groupName,json_responses,username,code,list,value;
	username=req.session.username;
	console.log("In group member handle request:"+username);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupmember:{$in:[username]}}).toArray(function(err,user)
	{
		if(user.length==0)
		{
			console.log("Inside fail");
			code = "401";
			list = "Group not available";
			json_responses={"statusCode":code};
			res.send(json_responses);
		}
		else
		{
			console.log("Inside success");
			console.log(user);
			var listG=[];
			code = "200";
			//res.value = "Group list is";
			for(var i=0;i<user.length;i++)
			{
				listG[i]=user[i].groupname;
				console.log(listG[i]);
			}
			list=listG;
			json_responses={"statusCode":code,"list":list};
			res.send(json_responses);
		}
	});
});	
};
exports.membersOfAGroup=function(req,res){
	console.log("Inside group Members List");
	var json_responses,username,code,list;
	username=req.session.username;
	var groupname=req.param("groupname");
	console.log("In group member handle request:"+username);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupname:groupname}).toArray(function(err, user)
	{
		if(user.length==0)
		{
			console.log("Inside fail");
			code = "401";
			list = "Group not available";
			json_responses={"statusCode":401,"list":list};
			res.send(json_responses);
		}
		else
		{
			console.log("Inside success");
			console.log(user);
			var listG=[];
			code = "200";
			for(var i=0;i<user.length;i++)
			{
				for(var j=0;j<user[i].groupmember.length;j++)
				{
					listG[j]=user[i].groupmember[j];
					console.log(listG[j]);
				}
			}
			list=listG;
			json_responses={"statusCode":200,"list":list};
			res.send(json_responses);
		}
	});
});	
};
exports.deleteGroupMember=function(req,res){
	console.log("Inside group Members delete");
	var json_responses,username,code,list;
	username=req.session.username;
	var groupMemberToBeDeleted=req.param("groupMemberToBeDeleted");
	var groupName=req.param("groupName");
	console.log("In group member delete handle request:"+groupName);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({$and:[{groupadmin:username},{groupname:groupName}]}).toArray(function(err, user)
	{
		if(user)
		{
				coll.update({groupname:groupName},{$pull:{groupmember:groupMemberToBeDeleted}},function(err, user)
				//coll.findAndModify({query:{$and:[{groupadmin: msg.username},{groupname:msg.groupName}]},update:{$pull:{groupmember: msg.groupMemberToBeDeleted}}},function(err, user)
				{		
					code = "200";
					list = "Group member deleted";
					json_responses={"statusCode":200,"list":list};
					res.send(json_responses);
				});
		}
		else
		{
			code = "401";
			list = "Cannot delete group";
			json_responses={"statusCode":401,"list":list};
			res.send(json_responses);
		}	
	});
});	
};
exports.deleteGroup=function(req,res){
	console.log("Inside group delete");
	var json_responses,username,code,list;
	username=req.session.username;
	var groupName=req.param("groupName");
	console.log("In group delete handle request:"+groupName);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({$and:[{groupadmin:username},{groupname:groupName}]}).toArray(function(err, user)
	{
		if(user)
		{
					coll.remove({groupname:groupName},function(err, user)
					{		
						code = "200";
						list = "Group member deleted";
						json_responses={"statusCode":code,"list":list};
						res.send(json_responses);
					});
		}
		else
		{
			code = "401";
			list = "Cannot delete group";
			json_responses={"statusCode":code,"list":list};
			res.send(json_responses);
		}			
	});
});	
};