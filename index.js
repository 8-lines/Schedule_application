/*var mysql = require('mysql'); //подключение к базе данных

var con = mysql.createConnection({
    host: "35.236.149.253",
    user: "root",
    password: "root"
    });

con.connect(function(err) {
  if (err) throw err;
  //Select all customers and return the result object:
  con.query("use train_schedule;", function (err, result, fields){});
  con.query("SELECT * FROM train", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
}); */


var isLog = 0; //аутентификация

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (isLog == 1) {
      document.location.href = "/profile.html";
    }
      
    var user = firebase.auth().currentUser;
    if (user!=null){
      var email_id=user.email;
      //document.location.href = "/index.html"; 
    }
  } 
});

function login(){
  isLog = 1;
  var userEmail = document.getElementById("email_field").value.toString();
  var userPass = document.getElementById("passw_field").value.toString();
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorMessage = error.message;
    window.alert("Error: " + errorMessage);
  });
}

function logout(){
  isLog = 0;
  firebase.auth().signOut();
  document.location.href = "/index.html";
}