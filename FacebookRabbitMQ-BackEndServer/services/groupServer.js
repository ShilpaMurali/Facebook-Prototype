var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbgroup";
function handle_grouprequest(msg, callback){
	var res = {};
	console.log("In group handle request:"+ msg.groupname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupname: msg.groupname}).toArray(function(err, user){
		if (user.length==0)
		{
			coll.insert({groupname: msg.groupname,groupmember:[msg.groupmember,msg.username],groupadmin:msg.username},function(err,user)
					{
										res.code = "200";
										res.value = "Group Created";
										callback(null, res);
					});
		}
		else
		{
			coll.update({groupname: msg.groupname},{$addToSet:{groupmember:msg.groupmember}},function(err,user)
					{
										res.code = "200";
										res.value = "Member Added";
										callback(null, res);
					});
		}
	});
});	
}
function handle_groupMemberrequest(msg, callback){
	var res = {};
	console.log("In group member handle request:"+ msg.username);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupmember:{$in:[msg.username]}}).toArray(function(err,user)
	{
		if(user.length==0)
		{
			console.log("Inside fail");
			res.code = "401";
			res.list = "Group not available";
			callback(null, res);
		}
		else
		{
			console.log("Inside success");
			console.log(user);
			var list=[];
			res.code = "200";
			//res.value = "Group list is";
			for(var i=0;i<user.length;i++)
			{
				list[i]=user[i].groupname;
				console.log(list[i]);
			}
			res.list=list;
			callback(null, res);
		}
	});
});	
}
function handle_groupMemberListrequest(msg, callback){
	var res = {};
	console.log("In group member handle request:"+ msg.username);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupname: msg.groupname}).toArray(function(err, user)
	{
		if(user.length==0)
		{
			console.log("Inside fail");
			res.code = "401";
			res.list = "Group not available";
			callback(null, res);
		}
		else
		{
			console.log("Inside success");
			console.log(user);
			var list=[];
			res.code = "200";
			for(var i=0;i<user.length;i++)
			{
				for(var j=0;j<user[i].groupmember.length;j++)
				{
					list[j]=user[i].groupmember[j];
					console.log(list[j]);
				}
			}
			res.list=list;
			callback(null, res);
		}
	});
});	
}
/*function handle_groupMemberDeleterequest(msg, callback){
	var res = {};
	console.log("In group member delete handle request:"+ msg.groupName);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.find({groupname: msg.groupName}).toArray(function(err, user)
	{
		if(user.length!=0)
		{
			console.log("Inside success. User is the group admin");
			console.log(user);
			var list=[];
			res.code = "200";
			if(user.groupadmin==msg.username)
			{
				coll.remove({groupmember: msg.groupMemberToBeDeleted},function(err, user)
				{		
					res.code = "200";
					res.list = "Group member deleted";
					callback(null, res);
				});
			}
			else
			{
				console.log("User is not the group admin");
				res.code = "401";
				res.list = "User is not the group admin";
				callback(null, res);
			}
		}
		else
		{
			console.log("User is not the group admin");
			res.code = "401";
			res.list = "User is not the group admin";
			callback(null, res);
		}
	});
});	
}*/
function handle_groupMemberDeleterequest(msg, callback){
	var res = {};
	console.log("In group member delete handle request:"+ msg.groupName);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.update({$and:[{groupadmin: msg.username},{groupname:msg.groupName}]},{$pull:{groupmember: msg.groupMemberToBeDeleted}},function(err, user)
	{
		if(user)
		{
				//coll.update({groupname:msg.groupName},{$pull:{groupmember: msg.groupMemberToBeDeleted}},function(err, user)
				//coll.findAndModify({query:{$and:[{groupadmin: msg.username},{groupname:msg.groupName}]},update:{$pull:{groupmember: msg.groupMemberToBeDeleted}}},function(err, user)
				//coll.remove({$and:[{groupadmin: msg.username},{groupname:msg.groupName}]},function(err, user)
				//{		
					res.code = "200";
					res.list = "Group member deleted";
					callback(null, res);
				//});
		}
		else
		{
			res.code = "401";
			res.list = "Cannot delete group";
			callback(null, res);
		}	
	});
});	
}
function handle_groupDeleterequest(msg, callback){
	var res = {};
	console.log("In group delete handle request:"+ msg.groupName);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbgroup');
	coll.remove({$and:[{groupadmin: msg.username},{groupname:msg.groupName}]},function(err, user)
	{
		if(user)
		{
						
						res.code = "200";
						res.list = "Group member deleted";
						callback(null, res);
				
		}
		else
		{
			res.code = "401";
			res.list = "Cannot delete group";
			callback(null, res);
		}			
	});
});	
}
exports.handle_grouprequest = handle_grouprequest;
exports.handle_groupMemberrequest = handle_groupMemberrequest;
exports.handle_groupMemberListrequest = handle_groupMemberListrequest;
exports.handle_groupMemberDeleterequest = handle_groupMemberDeleterequest;
exports.handle_groupDeleterequest = handle_groupDeleterequest;