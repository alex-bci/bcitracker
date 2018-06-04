var score = 1;
var min = 3;
function addComment(divName){
     if (score == min)  {
          alert("You don't have sufficient privileges to comment on this post.");
     }
     else {
     //This has to be handled differently in the plugin mode
	    $("#cplus").load("/js/form.html");
     //var div = document.getElementById(divName);
	

	}
}

function saveComment(){


}


