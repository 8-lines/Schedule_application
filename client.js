document.addEventListener("DOMContentLoaded", function(event) {
	var xhr = new XMLHttpRequest(); 
xhr.open("GET", "http://localhost:8080/hello", true); 
//xhr.send(); 

xhr.onload = function() { 
  alert("OK!");
  var responseText = this.responseText; 
  var div = document.getElementById("results"); 
	div.innerText = responseText; 
}; 

xhr.onerror = function() { 
	alert("Error occuried!"); 
}; 

xhr.send();
});