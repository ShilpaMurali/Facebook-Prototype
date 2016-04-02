var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbfriend";
exports.friendRequest=function(req,res)
{
	console.log("Inside friend request");
	var friendname,json_responses,username,code,value;
	friendname=req.param("fbfriend");
	console.log("friend"+friendname);
	username=req.session.username;
	console.log("In friend page handle request:"+friendname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.find({$or:[{sender:username},{acceptor:username}]},{_id:0}).toArray(function(err, user){
			if (user.length==0)
			{
				// This way subsequent requests will know the user is logged in.
				code = "200";
				value = 1;
				json_responses = {"statusCode" : 200,"value" :value};
				res.send(json_responses);
			} 
			else
			{
					coll.find({$and:[{sender:username},{acceptor:friendname},{senderStatus:{$ne:"4"}},{acceptorStatus:{$ne:"4"}}]},{sender:1,_id:0}).toArray(function(err,user1){
					if(user1.length!==0)
					{
						code = "200";
						value = 2;
						json_responses = {"statusCode" : 200,"value" :value};
						res.send(json_responses);
					}
					else
					{
						coll.find({$and:[{sender:friendname},{acceptor:username}]},{_id:0}).toArray(function(err,user2){
							if(user2.length!==0)
							{
								if(user2[0].senderStatus==4 && user2[0].acceptorStatus==4)
								{
									code = "200";
									value = 4;
									json_responses = {"statusCode" : 200,"value" :value};
									res.send(json_responses);
								}
								else
								{
									code = "200";
									value = 3;
									json_responses = {"statusCode" : 200,"value" :value};
									res.send(json_responses);
								}
							}
							else
							{
								coll.find({$and:[{sender:username},{acceptor:friendname}]},{_id:0}).toArray(function(err,user3){
									if(user3.length!==0)
									{
										if(user3[0].senderStatus== 4 && user3[0].acceptorStatus==4)
										{
											code = "200";
											value = 4;
											json_responses = {"statusCode" : 200,"value" :value};
											res.send(json_responses);
										}
									}
									else
									{
										code = "200";
										value = 1;
										json_responses = {"statusCode" : 200,"value" :value};
										res.send(json_responses);
									}									
								});							
							}
						});
					}
				});
			}
		});
	});	
};
exports.friendFunction=function(req,res)
{
	console.log("Inside Add friend function");
	var friendname,json_responses,username,code,value;
	friendname=req.param("fbfriend");
	console.log("friend"+friendname);
	username=req.session.username;
	console.log("In add friend handle request:"+friendname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.insert({sender:username,senderStatus:"2",acceptor:friendname,acceptorStatus:"3"},function(err,user)
	{
				code = "200";
				value = 2;
				json_responses = {"statusCode" : 200,"value" :value};
				res.send(json_responses);
	});
 });
};
exports.acceptRequest=function(req,res)
{
	console.log("Inside Accept friend function");
	var friendname,json_responses,username;
	friendname=req.param("fbfriend");
	console.log("friend"+friendname);
	username=req.session.username;
	mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbfriend');
		coll.update({$and:[{sender:friendname},{acceptor:username}]},{$set:{senderStatus:"4",acceptorStatus:"4"}},function(err,user)
		{
					code = "200";
					value = 4;
					json_responses = {"statusCode" : 200,"value" :value};
					res.send(json_responses);
		});
	});	
};
exports.friendList=function(req,res)
{
	console.log("Inside friend list function");
	var json_responses,username,code,value;
	username=req.session.username;
	console.log("In list friend handle request:"+username);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.find({$and:[{senderStatus:"4"},{acceptorStatus:"4"},{$or:[{sender:username},{acceptor:username}]}]},{senderStatus:0,acceptorStatus:0,_id:0}).toArray(function(err,user)
	{
			if (user)
			{
				console.log(user);
				var list=[];
				code = "200";
				value = "Success list";
				for(var i=0;i<user.length;i++)
				{
					if(user[i].sender==username)
					{
						console.log("I'm in true");
						list[i]=user[i].acceptor;
					}
					if(user[i].acceptor==username)
					{
						console.log("I'm in true");
						list[i]=user[i].sender;
					}					
					console.log("Friend list is" +list);
				}
				var listFInal=list;
				json_responses = {"statusCode" : 200,"friendList" :listFInal};
				res.send(json_responses);
			} 
			else
			{
				console.log("I'm in else");
				code = "401";
				value = "Failed search";
				json_responses = {"statusCode" : 401};
				res.send(json_responses);
			}
		});
	});	
};
