var ejs = require("ejs");
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbprofile";
var mongoURLInterest = "mongodb://localhost:27017/fbinterest";
exports.profileCreation=function(req,res){
	console.log("Inside profile");
	var userOverview,json_responses,workAndEductaion,contactInfo,lifeEvents,username;
	userOverview=req.param("userOverview");
	workAndEductaion=req.param("workAndEductaion");
	contactInfo=req.param("contactInfo");
	lifeEvents=req.param("lifeEvents");
	username=req.session.username;
	console.log("In profile creation handle request:"+ workAndEductaion);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbprofile');
		coll.find({username:username}).toArray(function(err, user){
			if (user.length==0)
			{
				coll.insert({userOverview:[userOverview],workAndEductaion:[workAndEductaion],contactInfo:[contactInfo],lifeEvents:[lifeEvents],username:username},function(err,user)
						{
											var code = "200";
											var value = "Profile Created";
											json_responses = {"statusCode" : 200,"value" : value};
											res.send(json_responses);
						});
			}
			else
			{
				coll.update({username:username},{$addToSet:{userOverview:userOverview,workAndEductaion:workAndEductaion,contactInfo:contactInfo,lifeEvents:lifeEvents}},function(err,user)
						{
											var code = "200";
											var value = "Profile Updated";
											json_responses = {"statusCode" : 200,"value" : value};
											res.send(json_responses);
						});
			}
		});
	});
};
exports.profileInfo=function(req,res){
	console.log("Inside profileInfo");
	var json_responses={};
	var name;
	var userOverview;
	var workAndEductaion;
	var contactInfo;
	var lifeEvents,code;
	name=req.param("name");
	if(name==1)
	{
		name=req.session.username;
	}
	var msg_payload={"username":name};
	var userOverviewList=[];
	var workAndEductaionList=[];
	var contactInfoList=[];
	var lifeEventsList=[];
	console.log("In profile info handle request:"+ name);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbprofile');
		coll.find({username:name}).toArray(function(err, user){
			if (user.length==0)
			{
								code = "200";
								userOverview = "";
								workAndEductaion="";
								contactInfo="";
								lifeEvents="";
								json_responses = {"statusCode" : 200,"userOverview" : userOverview,"workAndEductaion" : workAndEductaion,"contactInfo" : contactInfo,"lifeEvents" : lifeEvents};
								res.send(json_responses);
					
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
								userOverview=userOverviewList;
								workAndEductaion=workAndEductaionList;
								contactInfo=contactInfoList;
								lifeEvents=lifeEventsList;
								json_responses = {"statusCode" : 200,"userOverview" : userOverview,"workAndEductaion" : workAndEductaion,"contactInfo" : contactInfo,"lifeEvents" : lifeEvents};
								res.send(json_responses);	
			}
		});
	});
};
exports.interestCreation=function(req,res){
	console.log("Inside interest");
	var json_responses,music,shows,sports,username,code,value;
	music=req.param("music");
	shows=req.param("shows");
	sports=req.param("sports");
	username=req.session.username;
	console.log("In Interest creation handle request:"+music);
		mongo.connect(mongoURLInterest, function(){
		console.log('Connected to mongo at: ' + mongoURLInterest);
		var coll = mongo.collection('fbinterest');
		coll.find({username:username}).toArray(function(err, user){
			if (user.length==0)
			{
				coll.insert({music:[music],shows:[shows],sports:[sports],username:username},function(err,user)
						{
											code = "200";
											value = "Interest Created";
											json_responses = {"statusCode" : 200};
											res.send(json_responses);	

						});
			}
			else
			{
				coll.update({username:username},{$addToSet:{music:music,shows:shows,sports:sports}},function(err,user)
						{
											code = "200";
											value = "Interest Updated";
											json_responses = {"statusCode" : 200};
											res.send(json_responses);	
											
						});
			}
		});
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
	var sportsList=[];
	var showsList=[];
	var musicList=[];
	console.log("In interest info handle request:"+ name);
		mongo.connect(mongoURLInterest, function(){
		console.log('Connected to mongo at: ' + mongoURLInterest);
		var coll = mongo.collection('fbinterest');
		coll.find({username:name}).toArray(function(err, user){
			if (user.length==0)
			{
								var code = "200";
								var music = "";
								var sports="";
								var shows="";
								json_responses = {"statusCode" : 200,"music" : music,"sports" : sports,"shows" : shows};
								res.send(json_responses);			
			}
			else
			{
								console.log("Inside success");
								console.log(user);
								var list=[];
								res.code = "200";
								for(var i=0;i<user.length;i++)
								{
									for(var j=0;j<user[i].music.length;j++)
									{
										musicList[j]=user[i].music[j];
										console.log(musicList[j]);
									}
									for(var k=0;k<user[i].shows.length;k++)
									{
										showsList[k]=user[i].shows[k];
										console.log(showsList[k]);
									}
									for(var l=0;l<user[i].sports.length;l++)
									{
										sportsList[l]=user[i].sports[l];
										console.log(sportsList[l]);
									}
								}
								var musicI=musicList;
								var showsI=showsList;
								var sportsI=sportsList;
								json_responses = {"statusCode" : 200,"music" : musicI,"sports" : sportsI,"shows" : showsI};
								res.send(json_responses);						
			}
		});
	});
};