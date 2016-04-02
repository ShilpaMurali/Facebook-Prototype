var app=angular.module('myApp',['ngRoute']);
// Controllers
app.controller('IndexController',function($scope,$http,$location) {
$scope.userlist=[];
$scope.name;
$scope.list;
$scope.music=[];
$scope.shows=[];
$scope.sports=[];
$scope.userOverview=[];	
$scope.workAndEductaion=[];	
$scope.contactInfo=[];
$scope.lifeEvents=[];
$scope.secondary_name="";
$scope.location=$location.url();
console.log("location"+$scope.location);
if($scope.location=="/about")
{
	$scope.shilpa=1;
	var name=1;
	$http(
			{
				method : "POST",
				url : '/interestInfo',
				data:{
					"name":name
				}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					$scope.music=data.music;	
					$scope.sports=data.sports;	
					$scope.shows=data.shows;
					console.log("Interest display success");
				}
			}).error(function(error)
			{
				console.log("error");
			});	
		$http(
			{
				method : "POST",
				url : '/profileInfo',
				data:{
					"name":name
				}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					$scope.userOverview=data.userOverview;	
					$scope.workAndEductaion=data.workAndEductaion;	
					$scope.contactInfo=data.contactInfo;
					$scope.lifeEvents=data.lifeEvents;
					console.log("Profile display success");
				}
			}).error(function(error)
			{
				console.log("error");
			});
}
else
{
	$scope.shilpa=0;
	$scope.person=($scope.location.split('/about/')).toString();
	var person=$scope.person.slice(1);
	$scope.groupName=($scope.location.split('/groups/')).toString().slice(1);
		$http(
			{
				method : "POST",
				url : '/interestInfo',
				data:{
					"name":person
				}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					$scope.music=data.music;	
					$scope.sports=data.sports;	
					$scope.shows=data.shows;
					console.log("Interest display success");
				}
			}).error(function(error)
			{
				console.log("error");
			});	
		$http(
			{
				method : "POST",
				url : '/profileInfo',
				data:{
					"name":person
				}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					$scope.userOverview=data.userOverview;	
					$scope.workAndEductaion=data.workAndEductaion;	
					$scope.contactInfo=data.contactInfo;
					$scope.lifeEvents=data.lifeEvents;
					console.log("Profile display success");
				}
			}).error(function(error)
			{
				console.log("error");
			});
		var str=$scope.person.slice(1);
		$scope.person=str;
		$http(
	 		{		
				method : "POST",
				url : '/friend',
				data:{"fbfriend":str}
			}).success(function(data)
			 {
			//checking the response data for statusCode
				if (data.statusCode == 200)
				 {
					$scope.value = data.value;
					if($scope.value==1)
						{
							$scope.Text="Add Friend";
						}
					if($scope.value==2)
					{
						$scope.Text="Friend Request Sent";
					}
					if($scope.value==3)
					{
						$scope.Text="Accept Request";
					}
					if($scope.value==4)
					{
						$scope.Text="Friends";
					}
				}			
			}).error(function(error) {
				console.log("error");
		});
}
$scope.search=function(){
 		$http(
 		{		
			method : "GET",
			url : '/search'
		}).success(function(data)
		 {
		//checking the response data for statusCode
			if (data.statusCode == 200)
			 {
				$scope.userlist = data.list;
			}			
		}).error(function(error) {
	});
  };
  $scope.name=function(){
		$http(
		 		{		
					method : "GET",
					url : '/getName'
				}).success(function(data)
				 {
				//checking the response data for statusCode
					if (data.statusCode == 200)
					 {
						$scope.name = data.username;
					}			
				}).error(function(error) {
					console.log("error");
			});
	};
	$scope.friendFunction=function(Text,str){
		if(Text=="Add Friend")
		{
			$http(
		 		{		
					method : "POST",
					url : '/Addfriend',
					data:{"fbfriend":str}
				}).success(function(data)
				 {
				//checking the response data for statusCode
					if (data.statusCode == 200)
					 {
						$scope.value = data.value;
						console.log("Friend value"+data.value);
						if($scope.value==2)
						{
							$scope.Text="Friend Request Sent";
						}
						
					}			
				}).error(function(error) {
					console.log("error");
			});
		}
		if(Text=="Accept Request")
		{
			$http(
		 		{		
					method : "POST",
					url : '/acceptRequest',
					data:{"fbfriend":str}
				}).success(function(data)
				 {
				//checking the response data for statusCode
					if (data.statusCode == 200)
					 {
						$scope.value = data.value;
						if($scope.value==4)
						{
							$scope.Text="Friends";
						}
					}			
				}).error(function(error) {
					console.log("error");
			});
		}
	};
	$scope.friendList=function()
	{	
			$http(
			{
			method : "GET",
			url : '/friendList',
			}).success(function(data)
			{
			if(data.statusCode==200)
			{
			$scope.list=data.friendList;
			}
			}).error(function(error)
			{
				console.log("error");
			});	
	};	
	$scope.group=function(groupname,groupmember)
	{	
			$http(
			{
			method : "POST",
			url : '/groupFB',
			data:{"groupname":groupname,
					"groupmember":groupmember				
				}
			}).success(function(data)
			{
			if(data.statusCode==200)
			{	
				console.log("Group creation success");
			}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	$scope.groupMembers=function()
	{	
			$http(
			{
				method : "POST",
				url : '/groupMembers'
			}).success(function(data)
			{
			if(data.statusCode==200)
			{
				$scope.groupresult=data.list;	
				console.log("Group Member list success");
			}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	$scope.membersOfAGroup=function(groupname)
	{	
			$http(
			{
				method : "POST",
				url : '/membersOfAGroup',
				data:{"groupname":groupname}
			}).success(function(data)
			{
			if(data.statusCode==200)
			{
				$scope.groupMember=data.list;	
				console.log("Group Member list success");
			}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	$scope.deleteGroupMember=function(groupMemberToBeDeleted,groupName)
	{	
			$http(
			{
				method : "POST",
				url : '/deleteGroupMember',
				data:{"groupMemberToBeDeleted":groupMemberToBeDeleted,
					  "groupName":groupName
					}
			}).success(function(data)
			{
			if(data.statusCode==200)
			{	
				console.log("Group Member delete list");
			}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	$scope.deleteGroup=function(groupName)
	{	
			$http(
			{
				method : "POST",
				url : '/deleteGroup',
				data:{
					  "groupName":groupName
					}
			}).success(function(data)
			{
			if(data.statusCode==200)
			{	
				console.log("Group delete list");
			}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	$scope.profile=function(userOverview,workAndEductaion,contactInfo,lifeEvents)
	{	
			$http(
			{
				method : "POST",
				url : '/profile',
				data:{"userOverview":userOverview,
					  "workAndEductaion":workAndEductaion,
					  "contactInfo":contactInfo,
					  "lifeEvents":lifeEvents
					}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					console.log("Profile creation success");
				}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	/*$scope.profileInfo=function(name)
	{	
			$http(
			{
				method : "POST",
				url : '/profileInfo',
				data:{
					"name":name
				}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					$scope.userOverview=data.userOverview;	
					$scope.workAndEductaion=data.workAndEductaion;	
					$scope.contactInfo=data.contactInfo;
					$scope.lifeEvents=data.lifeEvents;
					console.log("Profile display success");
				}
			}).error(function(error)
			{
				console.log("error");
			});	
	};*/
	$scope.interest=function(music,shows,sports)
	{	
			$http(
			{
				method : "POST",
				url : '/interest',
				data:{"music":music,
					  "shows":shows,
					  "sports":sports
					}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					console.log("Interest added success");
				}
			}).error(function(error)
			{
				console.log("error");
			});	
	};
	/*$scope.interestInfo=function(name)
	{	
			$http(
			{
				method : "POST",
				url : '/interestInfo',
				data:{
					"name":name
				}
			}).success(function(data)
			{
				if(data.statusCode==200)
				{	
					$scope.music=data.music;	
					$scope.sports=data.sports;	
					$scope.shows=data.shows;
					console.log("Interest display success");
				}
			}).error(function(error)
			{
				console.log("error");
			});	
	};*/
	$scope.signIn = function() {
		$http({
            method: 'POST',
            url: '/login',
            data: { "email": $scope.email, "password": $scope.password }
            
         }).success(function(response){
            if(response.statusCode == 200)
            {
            	console.log("Inside success");
            }
        }).error(function(error){
        });
    };
    $scope.signup = function() {
		$http({
            method: 'POST',
            url: '/signup',
            data: { "email": $scope.email, "password": $scope.password,"firstname": $scope.firstname, "lastname": $scope.lastname }
            
         }).success(function(response){
              if(response.statusCode ==200)
            {
            	console.log("Signup Successful");
           		window.location = '/login';
            }
            else
            	window.location = '/login';
        }).error(function(error){
        });
    };
});
app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
$routeProvider
.when('/', {
    templateUrl: 'partials/homepage.ejs',
    controller: 'IndexController'
})
.when('/home', {
    templateUrl: 'partials/homepage.ejs',
    controller: 'IndexController'
})
.when('/about', {
    templateUrl: 'partials/about.ejs',
    controller: 'IndexController'
})
.when('/about/:srch', {
    templateUrl: 'partials/about.ejs',
    controller: 'IndexController'
})
.when('/groups/:srch', {
    templateUrl: 'partials/groups.ejs',
    controller: 'IndexController'
})
.otherwise({redirectTo:"/"});
}]);