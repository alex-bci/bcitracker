


// Angular Controllers
var app = angular.module('app', []);
	app.controller('headCtrl', function($scope) {
		console.log('initialized cc');

		 $scope.data = {
	"title":"This website's name",
	"url":"https://blockchain.wtf/blockchain-101/",
	"flags":[{
		"flagClass":"Reported",
		"flagLink":"theblockchaininstitute.org/report.faq",
		"flagSign":"fa-ban",
		"flagText":"flagged for conflict of interest"
	}],
	"comments":[{
		"id":"1234injk1iunji",
		"commentClass":"normal",
		"isUpVoted":1, 
		"isDownVoted":0,
		"userName":"alexmorris",
		"points":100,
		"pointsUnit":"points",
		"age":2,
		"ageUnit":"weeks",
		"parent":"null"
	},{
		"id":"1234injk1iunji",
		"commentClass":"normal",
		"isUpVoted":1, 
		"isDownVoted":0,
		"userName":"alexmorris",
		"points":100,
		"pointsUnit":"points",
		"age":2,
		"ageUnit":"weeks",
		"parent":"null"
	}],
};

		//console.log($scope.meta);
	});

	app.controller('commentCtrl', function($scope,$compile) {
		console.log('initialized cc');
		$scope.data =  {
	"title":"This website's name",
	"url":"https://blockchain.wtf/blockchain-101/",
	"flags":[{
		"flagClass":"Reported",
		"flagLink":"theblockchaininstitute.org/report.faq",
		"flagSign":"fa-ban",
		"flagText":"flagged for conflict of interest"
	}],
	"comments":[{
		"id":"1234injk1iunji",
		"commentClass":"normal",
		"isUpVoted":1, 
		"isDownVoted":0,
		"userName":"alexmorris",
		"points":100,
		"pointsUnit":"points",
		"age":2,
		"ageUnit":"weeks",
		"parent":"null"
	},{
		"id":"1234injk1iunji",
		"commentClass":"normal",
		"isUpVoted":1, 
		"isDownVoted":0,
		"userName":"alexmorris",
		"points":100,
		"pointsUnit":"points",
		"age":2,
		"ageUnit":"weeks",
		"parent":"null"
	}],
};

		// // Comment option functions
		// $scope.reply = function reply(id){
	
		// 			if(open == 0){
		// 			var parentid 		= id + "_commentcontainer";
		// 			var parent 			= document.getElementById(parentid);
		// 			var formDiv 		= document.createElement('div');
		// 				formDiv.id 		= "reply_" + id;
		// 				console.log(parent);

		// 			var replyForm 		= "<form id='replyform_" + id + "'><input type='textarea' name='replyBody'></form><a href='#' ng-click=\"savereply('" + formDiv.id + "');\">Save</a> <a href='#' ng-click=\"cancel('" + formDiv.id + "');\">Cancel</a>";
		// 			console.log(replyForm);
		// 			formDiv.innerHTML 	= replyForm;

		// 			parent.appendChild(formDiv);



		// 			$compile(document.getElementById(formDiv.id))($scope);


						
		// 				//formDiv 			= document.getElementById(formDiv.id);
							

		// 			}else{
		// 				console.log("reply limit reached");

		// 			}

		// 				open = 1;
		// 		}

		// $scope.expand 	 = function(id){
		// 			console.log('expand');
		// 		}

		// $scope.savereply = function(id){
		// 			console.log(id);
		// 			console.log('save');

		// 			open = 0;

		// 		}

		// $scope.cancel = function(id){
		// 			console.log(id);
		// 			var	id = '#' + id;
		// 			$(id).remove();

		// 			open = 0;
		// 			flagCount = 0;

		// 		}


	});