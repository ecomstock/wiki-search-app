// Opens random Wiki page.
$("#random").click(function() {
  window.open('https://en.wikipedia.org/wiki/Special:Random');                   
});

// Runs AJAX call when search button is clicked. 
$('#search').click(function() {
  // Captures values in search field.
  let searchInput = $('#inputText').val();
  $.ajax({
    url: 'https://en.wikipedia.org/w/api.php',
    data: { 
      action: 'query', 
      list: 'search', 
      srsearch: searchInput, 
      format: 'json' 
    },
    dataType: 'jsonp',
    success: searchResult
  });
});

// Runs AJAX call when "enter" key pressed.
$('#inputText').keypress(function(e){
  if(e.which == 13){// "enter" key
      $('#search').click();
  }
});

// Loops through search results and appends to page.
function searchResult(data){
  console.log('IN RESULT');
  $('#results').html("");//Clear results
   for (var i = 0; i < data.query.search.length; i++){
     $('#results').append('<a target="newwindow" href="https://en.wikipedia.org/wiki/' + data.query.search[i].title.replace(/ /g,"_") + '"><li class="list-group-item">' + data.query.search[i].title + '</a><p>' + data.query.search[i].snippet + '...</p></li>');
   }
}