
function drop(divName){
	console.log("yup");
	console.log(divName);
	var div = document.getElementById(divName);
	div.parentNode.removeChild(div);	        
	var btn = document.createElement('addC');
	btn.type = "button";
	btn.value = "+ Comment";
	btn.onclick = "addComment('addComment');";
	
}
