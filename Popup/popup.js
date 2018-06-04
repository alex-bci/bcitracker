console.log('Index runs');

var cload = {'i' : 0 };

var datalayer = {"urlid":1,
				"tags":["1","5","7","8"],
				"corrections":[
				{"id":1,"selection":"this is bad text","username":"open","correction":"this is correct text","source":'www.source.com',"upVotes":3,"tags":"[\"1\",\"5\",\"7\",\"8\"]","userid":12345,"timestamp":'3 Hrs ago'},
				{"id":2,"selection":"this is bad text","username":"open","correction":"this is correct text","source":'www.source.com',"upVotes":3,"tags":"[\"1\",\"5\",\"7\",\"8\"]","userid":12345,"timestamp":'3 Hrs ago'},
				{"id":3,"selection":"this is bad text","username":"open","correction":"this is correct text","source":'www.source.com',"upVotes":3,"tags":"[\"1\",\"5\",\"7\",\"8\"]","userid":12345,"timestamp":'3 Hrs ago'},
				{"id":4,"selection":"this is bad text","username":"open","correction":"this is correct text","source":'www.source.com',"upVotes":3,"tags":"[\"1\",\"5\",\"7\",\"8\"]","userid":12345,"timestamp":'3 Hrs ago'}
				],
				"comments":[
				{"id":1,"username":"Alex","body":"This is a comment","score":"12","timestamp":"3 hrs ago","children":[{"id":1,"username":"Alex","body":"This is a comment","score":"12","timestamp":"3 hrs ago","parentid":"1"},{"id":1,"username":"Alexandra","body":"this is a reply to alex's comment","score":"12","timestamp":"3 hrs ago","parentid":"1"}]},
				{"id":2,"username":"Abby","body":"This is a comment","score":"15","timestamp":"3 hrs ago"},
				{"id":3,"username":"Andrea","body":"This is a comment","score":"25","timestamp":"3 hrs ago"},
				{"id":1,"username":"Alexsandra","body":"that's not how you spell my name","score":"12","timestamp":"3 hrs ago"},
				{"id":2,"username":"Abby","body":"This is a comment","score":"15","timestamp":"3 hrs ago"},
				{"id":3,"username":"Andrea","body":"This is a comment","score":"25","timestamp":"3 hrs ago"}
				
				],
				"subcomments":[
				{"id":1,"username":"Alex","body":"This is a comment","score":"12","timestamp":"3 hrs ago","parentid":"1"},
				{"id":1,"username":"Alexandra","body":"this is a reply to alex's comment","score":"12","timestamp":"3 hrs ago","parentid":"1"},
				]
			};

var open = 0;

if (typeof(pageUrl) === "undefined") {

	var pageUrl;

} 

// Angular Controllers
var app = angular.module('popup', []);
	app.controller('popupCtrl', function($scope,$http,$location,$compile) {
						
		var serverName = "http://localhost:3005"

		// Comment Controls
			// Override for local data
			$scope.data = datalayer;

			// Get Comments
			$scope.loadComments = loadComments;

			$scope.expand 	 	= loadComments;

			function loadComments (id) {

				var address = serverName + "/comments/";

				var callData = {"url":$scope.meta.url};

				if ( id ) {
					
					// Set the ID parameter
					callData.parentId = id;

					// The second conditional region below triggers the "CreateChildForm" function.

					// Add the Angular HTML so that the data has somewhere to live
					// Add new content to div with id - 'parentId' + '_commentcontainer'
				}

				var res = $http.post(address, callData);
				res.success(function(data, status, headers, config) {
					console.log('comment search successful - result:')
					console.log(data);
					$scope.comments = data;
				});
				res.error(function(data, status, headers, config) {
					console.log("comment search failed with error");
					console.log(data);
					$scope.meta.score = " - ";
					// alert( "failure message: " + JSON.stringify({data: data}));
				});	
				console.log(pageUrl);
			}

			// Comment option functions
			$scope.reply = function reply(id){
		
						if(open == 0){
						var parentid 		= id + "_commentcontainer";
						var parent 			= document.getElementById(parentid);
						var formDiv 		= document.createElement('div');
							formDiv.id 		= "reply_" + id;
							console.log(parent);

						var replyForm 		= "<form id='replyform_" + id + "'><input type='textarea' name='replyBody'></form><a href='#' ng-click=\"savereply('" + formDiv.id + "');\">Save</a> <a href='#' ng-click=\"cancel('" + formDiv.id + "');\">Cancel</a>";
						console.log(replyForm);
						formDiv.innerHTML 	= replyForm;

						parent.appendChild(formDiv);



						$compile(document.getElementById(formDiv.id))($scope);


							
							//formDiv 			= document.getElementById(formDiv.id);
								

						}else{
							console.log("reply limit reached");

						}

							open = 1;
					}

			$scope.savereply = function(id){
						console.log(id);
						console.log('save');

						open = 0;

					}

			$scope.cancel = function(id){
						console.log(id);
						var	id = '#' + id;
						$(id).remove();

						open = 0;
						flagCount = 0;

					}

			function expandCommentForm (parentid) {
			}

		// PageData Calls
			if (typeof $scope.meta === 'undefined') { 
				checkData();
			}

			function checkData(){
				var pageData = getPageData(checkUrl);
			}

			function getPageData (cb) {

				if( typeof chrome.tabs === 'undefined' ) {
					var pageData = {
				    	"url":"https://blockchain.wtf/edu/blockchain-101/",
				    	"title":"No Title Found"
					};
					$scope.meta = pageData;
					cb(pageData);
					return;


				} else { 
				    chrome.tabs.getSelected(null, function(tab) {

				    	if (!tab) {

						    var pageData = {
						    	"url":"https://blockchain.wtf/edu/blockchain-101/",
						    	"title":"No Title Found"
						    };

					        $scope.meta = pageData;
					        pageUrl = pageData.url;

					        cb(pageData);
					        return;

				    	} else {

					    	var pageData = {};

					    	if(tab.title) {
					    		pageData.title = tab.title;
					    	} else {
					    		pageData.title = "No title found";
					    	}
					    	if(tab.url) {
					    		pageData.url = tab.url;
					    	} else {
					    		pageData.url = "https://blockchain.wtf/edu/blockchain-101/";
					    	}
					    	
					    	console.log('Page data found:');
					    	console.log(pageData);

					        $scope.meta = pageData;
					        pageUrl = pageData.url;
					        
					        cb(pageData);

					    }
				    });
				}
			}

			function checkUrl (pageData) {
				var checkAddress = serverName + "/check/";
				console.log('window is ' + pageData.url);

				var res = $http.post(checkAddress, pageData);
				res.success(function(data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);	
					$scope.meta.score = data.totalScore;
				});
				res.error(function(data, status, headers, config) {
					console.log(data);
					console.log(status);
					console.log(headers);
					console.log(config);
					$scope.meta.score = " - ";
					// alert( "failure message: " + JSON.stringify({data: data}));
				});	
				console.log(pageUrl);
			}

	});
	

	





