var server = 'http://localhost:3005';

var app = angular.module('nav', []);

console.log("loaded view");

app.controller('side-nav', function($scope, $http){ 
 
  $scope.title = "PageName";
  // Don't forget to set class='active-menu' for whichever list item is currently selected

}); 

function select () {
  this.class = active-menu;
}

