var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/fbinterest";
function handle_interestEditrequest(msg, callback){
	var res = {};
	console.log("In Interest creation handle request:"+ msg.music);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbinterest');
		coll.find({username: msg.username}).toArray(function(err, user){
			if (user.length==0)
			{
				coll.insert({music:[msg.music],shows:[msg.shows],sports:[msg.sports],username:msg.username},function(err,user)
						{
											res.code = "200";
											res.value = "Interest Created";
											callback(null, res);
						});
			}
			else
			{
				coll.update({username: msg.username},{$addToSet:{music:msg.music,shows:msg.shows,sports:msg.sports}},function(err,user)
						{
											res.code = "200";
											res.value = "Interest Updated";
											callback(null, res);
						});
			}
		});
	});
}
function handle_interestInforequest(msg, callback){
	var res = {};
	var sportsList=[];
	var showsList=[];
	var musicList=[];
	console.log("In interest info handle request:"+ msg.username);
		mongo.connect(mongoURL, function(){
		console.log('Connected to mongo at: ' + mongoURL);
		var coll = mongo.collection('fbinterest');
		coll.find({username: msg.username}).toArray(function(err, user){
			if (user.length==0)
			{
								res.code = "200";
								res.music = "";
								res.sports="";
								res.shows="";
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
								res.music=musicList;
								res.shows=showsList;
								res.sports=sportsList;
								callback(null, res);
							
						
			}
		});
	});
}
exports.handle_interestEditrequest = handle_interestEditrequest;
exports.handle_interestInforequest = handle_interestInforequest;