var counter = 1;
var limit = 3;
function addSource(divName){
     if (counter == limit)  {
          alert("You have reached the limit of adding " + counter + " sources");
     }
     else {
          var newdiv = document.createElement('div');
          newdiv.innerHTML = "Source " + (counter + 1) + " <br><input type='text' name='myInputs[]'>";
          document.getElementById(divName).appendChild(newdiv);
          counter++;
     }
}
