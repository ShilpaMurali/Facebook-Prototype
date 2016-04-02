
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var search = require('./routes/search');
var login = require('./routes/login');
var signup=require('./routes/signup');
var group=require('./routes/groupFB');
var getSessionData=require('./routes/getSessionData');
var friendRequest=require('./routes/friend');
var acceptRequest=require('./routes/friend');
var profile=require('./routes/profile');
var friendList=require('./routes/friend');
var getName=require('./routes/getName');
var http = require('http');
var path = require('path');
var session = require("client-sessions");
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var app = express();
//URL for the sessions collections in mongoDB
var mongoSessionConnectURL = "mongodb://localhost:27017/sessions";
var expressSession = require("express-session");
var mongoStore = require("connect-mongo")(expressSession);
var mongo = require("./routes/mongo");
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressSession({
	secret: 'cmpe273_teststring',
	resave: false,  //don't save session if unmodified
	saveUninitialized: false,	// don't create session until something stored
	duration: 30 * 60 * 1000,    
	activeDuration: 5 * 60 * 1000,
	store: new mongoStore({
		url: mongoSessionConnectURL
	})
}));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
app.get('/', routes.index);
app.post('/login', login.login);
app.post('/logout',login.logout);
app.get('/partials/:filename', routes.partials);
app.get('/partials/about/:srch',routes.partials);
app.get('/getSessionData',getSessionData.getSessionData);
app.get('/search',search.search);
app.post('/signup',signup.signup);
app.post('/groupFB',group.group);
app.post('/profile',profile.profileCreation);
app.post('/profileInfo',profile.profileInfo);
app.post('/interest',profile.interestCreation);
app.post('/interestInfo',profile.interestInfo);
app.post('/groupMembers',group.groupMembers);
app.post('/membersOfAGroup',group.membersOfAGroup);
app.post('/deleteGroupMember',group.deleteGroupMember);
app.post('/deleteGroup',group.deleteGroup);
app.get('/getName',getName.getName);
app.get('/users', user.list);
app.post('/friend',friendRequest.friendRequest);
app.post('/Addfriend',friendRequest.friendFunction);
app.post('/acceptRequest',acceptRequest.acceptRequest);
app.get('/friendList',friendList.friendList);
mongo.connect(mongoSessionConnectURL, function(){
	console.log('Connected to mongo at: ' + mongoSessionConnectURL);
	http.createServer(app).listen(app.get('port'), function(){
		console.log('Express server listening on port ' + app.get('port'));
	});  
});

