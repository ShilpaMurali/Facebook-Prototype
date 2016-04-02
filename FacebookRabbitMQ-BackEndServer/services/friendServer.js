var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbfriend";
function handle_friendrequest(msg, callback){
	var res = {};
	console.log("In friend page handle request:"+ msg.friendname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.find({$or:[{sender: msg.username},{acceptor:msg.username}]},{_id:0}).toArray(function(err, user){
				if (user.length==0)
			{
				// This way subsequent requests will know the user is logged in.
				res.code = "200";
				res.value = 1;
				callback(null, res);
			} 
			else
			{
					coll.find({$and:[{sender:msg.username},{acceptor:msg.friendname},{senderStatus:{$ne:"4"}},{acceptorStatus:{$ne:"4"}}]},{sender:1,_id:0}).toArray(function(err,user1){
					if(user1.length!==0)
					{
						console.log("I am in if statemnet for 2");
						res.code = "200";
						res.value = 2;
						callback(null, res);
					}
					else
					{
						coll.find({$and:[{sender:msg.friendname},{acceptor:msg.username}]},{_id:0}).toArray(function(err,user2){
							if(user2.length!==0)
							{
								if(user2[0].senderStatus==4 && user2[0].acceptorStatus==4)
								{
									res.code = "200";
									res.value = 4;
									callback(null, res);
								}
								else
								{
									console.log("I am in else for 3 statemnet");
									res.code = "200";
									res.value = 3;
									callback(null, res);
								}
							}
							else
							{
								coll.find({$and:[{sender:msg.username},{acceptor:msg.friendname}]},{_id:0}).toArray(function(err,user3){
									if(user3.length!==0)
									{
										if(user3[0].senderStatus== 4 && user3[0].acceptorStatus==4)
										{
											res.code = "200";
											res.value = 4;
											callback(null, res);
										}
									}
									else
									{
										res.code = "200";
										res.value = 1;
										callback(null, res);
									}
									
								});
								
							}
						});
					}
				});
			}
		});
	});	
}
function handle_addfriendrequest(msg, callback){
	var res = {};
	console.log("In add friend handle request:"+ msg.friendname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.insert({sender:msg.username,senderStatus:"2",acceptor:msg.friendname,acceptorStatus:"3"},function(err,user)
	{
				res.code = "200";
				res.value = 2;
				callback(null, res);
	});
});	
}
function handle_acceptfriendrequest(msg, callback){
	var res = {};
	console.log("In accept friend handle request:"+ msg.friendname);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.update({$and:[{sender:msg.friendname},{acceptor:msg.username}]},{$set:{senderStatus:"4",acceptorStatus:"4"}},function(err,user)
	{
				res.code = "200";
				res.value = 4;
				callback(null, res);
	});
});	
}
function handle_listfriendrequest(msg, callback){
	var res = {};
	console.log("In list friend handle request:"+ msg.username);
	mongo.connect(mongoURL, function(){
	console.log('Connected to mongo at: ' + mongoURL);
	var coll = mongo.collection('fbfriend');
	coll.find({$and:[{senderStatus:"4"},{acceptorStatus:"4"},{$or:[{sender:msg.username},{acceptor:msg.username}]}]},{senderStatus:0,acceptorStatus:0,_id:0}).toArray(function(err,user)
	{
			if (user)
			{
				console.log(user)
				var list=[];
				res.code = "200";
				res.value = "Success list";
				for(var i=0;i<user.length;i++)
				{
					if(user[i].sender==msg.username)
					{
						console.log("I'm in true");
						list[i]=user[i].acceptor;
					}
					if(user[i].acceptor==msg.username)
					{
						console.log("I'm in true");
						list[i]=user[i].sender;
					}					
					console.log("Freidn list is" +list);
				}
				res.list=list;
			} 
			else
			{
				console.log("I'm in else");
				res.code = "401";
				res.value = "Failed search";
			}
			callback(null, res);
		});
});	
}
exports.handle_friendrequest = handle_friendrequest;
exports.handle_addfriendrequest = handle_addfriendrequest;
exports.handle_acceptfriendrequest = handle_acceptfriendrequest;
exports.handle_listfriendrequest = handle_listfriendrequest;