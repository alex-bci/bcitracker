var server = 'http://localhost:3005';

var app = angular.module('nav', []);

var page = "< insert pagename >";

console.log("loaded view");

app.controller('head', function($scope, $http){ 
  $scope.title = page; 
});

app.controller('side-nav', function($scope, $http){ 
 
  $scope.navbar = [
    {
      "href":"index.html",
      "sign":"fa-dashboard",
      "text":" Home",
      "class":"active-menu"
    },{
      "href":"profile.html",
      "sign":"fa-user",
      "text":" Profile",
      "class":""
    },{
      "href":"search.html",
      "sign":"fa-search",
      "text":" Search",
      "class":""
    }
  ];
  // Don't forget to set class='active-menu' for whichever list item is currently selected

}); 

function select () {
  this.class = active-menu;
}

