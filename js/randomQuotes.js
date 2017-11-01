
 var holdquote;
 var author;

 

function myFunction() {
  var x = document.getElementById("demo");
  if (x.className.indexOf("w3-show") == -1) {
      x.className += " w3-show";
  } else { 
      x.className = x.className.replace(" w3-show", "");
  }
}


function myTweet()
{
  window.open("https://twitter.com/intent/tweet?text="+holdquote+"~ "+author, "","width=500, height=400");
}


$(document).ready(function() {
 
 $("#quoteButton").click( function() {
    lol1 = $('#quoteText');

  $.ajax(
  {
  type: 'GET',
  url: 'https://talaikis.com/api/quotes/random/',
  success: function(orders)
  {
  
  $.each(orders, function(i, order)
  {
    holdquote = orders.quote;
    author = orders.author;
    lol1.empty().append('<li></strong>'+'"'+ orders.quote + '"'+'</li>'+'<li id ="authorText">' +' <strong>~</strong> '+orders.author+'</li>');
  });

  }

  
  });
  


           }
        );








                            });