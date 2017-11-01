function showPic(whichpic) { 
    var source = whichpic.getAttribute("img"); 
    var placeholder = document.getElementById("placeholder"); 
    placeholder.setAttribute("src",source);
}

function myFunction() {
    var x = document.getElementById("demo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else { 
        x.className = x.className.replace(" w3-show", "");
    }
}

