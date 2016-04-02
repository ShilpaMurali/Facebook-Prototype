var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbprofile";
function handle_profileEditrequest(msg, callback){
	var res = {};
	console.log("In profile creation handle request:"+ msg.userOverview);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbprofile');
		coll.find({username: msg.username}).toArray(function(err, user){
			if (user.length==0)
			{
				coll.insert({userOverview:[msg.userOverview],workAndEductaion:[msg.workAndEductaion],contactInfo:[msg.contactInfo],lifeEvents:[msg.lifeEvents],username:msg.username},function(err,user)
						{
											res.code = "200";
											res.value = "Profile Created";
											callback(null, res);
						});
			}
			else
			{
				coll.update({username: msg.username},{$addToSet:{userOverview:msg.userOverview,workAndEductaion:msg.workAndEductaion,contactInfo:msg.contactInfo,lifeEvents:msg.lifeEvents}},function(err,user)
						{
											res.code = "200";
											res.value = "Profile Updated";
											callback(null, res);
						});
			}
		});
	});
}
function handle_profileInforequest(msg, callback){
	var res = {};
	var userOverviewList=[];
	var workAndEductaionList=[];
	var contactInfoList=[];
	var lifeEventsList=[];
	console.log("In profile info handle request:"+ msg.username);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbprofile');
		coll.find({username: msg.username}).toArray(function(err, user){
			if (user.length==0)
			{
								res.code = "200";
								res.userOverview = "";
								res.workAndEductaion="";
								res.contactInfo="";
								res.lifeEvents="";
								callback(null, res);
					
			}
			else
			{
								console.log("Inside success");
								console.log(user);
								res.code = "200";
								for(var i=0;i<user.length;i++)
								{
									for(var j=0;j<user[i].userOverview.length;j++)
									{
										userOverviewList[j]=user[i].userOverview[j];
										console.log(userOverviewList[j]);
									}
									for(var k=0;k<user[i].workAndEductaion.length;k++)
									{
										workAndEductaionList[k]=user[i].workAndEductaion[k];
										console.log(workAndEductaionList[k]);
									}
									for(var l=0;l<user[i].contactInfo.length;l++)
									{
										contactInfoList[l]=user[i].contactInfo[l];
										console.log(contactInfoList[l]);
									}
									for(var m=0;m<user[i].lifeEvents.length;m++)
									{
										lifeEventsList[m]=user[i].lifeEvents[m];
										console.log(lifeEventsList[m]);
									}
								}
								res.userOverview=userOverviewList;
								res.workAndEductaion=workAndEductaionList;
								res.contactInfo=contactInfoList;
								res.lifeEvents=lifeEventsList;
								callback(null, res);		
			}
		});
	});
}
exports.handle_profileEditrequest = handle_profileEditrequest;
exports.handle_profileInforequest = handle_profileInforequest;


