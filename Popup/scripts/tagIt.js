console.log("hi"); 

var tags = (function () {
    var json = null;
    $.ajax({
        'async': false,
        'global': false,
        'url': "http://54.147.234.158/js/tags.json",
        'dataType': "json",
        'success': function (data) {
            json = data;
        }
    });
    console.log(json);
    return json;
})(); 

$(function(){
  console.log("ran",tags)
  $('#tags').tokenInput(tags, { 
      theme: "facebook",
      hintText: "Type a tag",
      noResultsText: "Nothing found. You can submit without tags, but there might not be a verified expert available to review your submission. Would you like to apply to become one?",
      searchingText: "Searching...",
      preventDuplicates: true
  }); 

});

