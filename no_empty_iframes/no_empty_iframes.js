/* Once page finishes loading, find all empty iframes  and add empty div inside */
window.onload = function() { 
  var frames = document.getElementsByTagName("iframe");
  for (var i = 0; i < frames.length; i++) {
    var doc = frames[i].contentWindow.document;
    if (doc.body.innerHTML === "") {
    	var elemDiv = document.createElement('div');
    	doc.body.appendChild(elemDiv);
    }
  }
}
