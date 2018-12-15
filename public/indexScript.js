$(document).ready ( function (){
  var dbScheduleCount  = firebase.database().ref().child('schedule').child('count');
  
  dbScheduleCount.on('value', snap => 
  {
      var count = snap.val(); 
      ShowSchedules(count);
  });
  
  
});

function ShowSchedules(count){
  window.alert("YES!");
  for (var i=0; i <= count; i++) {
      var dbSchedule  = firebase.database().ref().child('schedule').child(i);
      dbSchedule.on('value', snap => 
      {
          var schedule_rec = snap.val();
          var list = '<div class = "Schedule">'+ schedule_rec.schedule + '</div>';
          document.getElementById('schedulesField').innerHTML += list;
      });
  }
}

// $(document).ready ( function (){
//   $.ajax({
//     type: "GET",
//     url:'/schedulesList',
//     dataType:"json",
//     success: function(data){
//       console.log(data);
//       schedules = data;
//       ShowSchedules(schedules);
//     }
//   });
// });

// function ShowSchedules(schedules){
//   //window.alert("OK!");
//   var list_temp = '<div class = "Schedule-top">' + '</div>';
//   document.getElementById('schedulesField').innerHTML += list_temp;
//     for (var i=0; i<schedules.length; i++) {
//     var list = '<div class = "Schedule">'+ schedules[i].col1 + ": &nbsp;&nbsp;" + schedules[i].col2 + " &nbsp;" +
//     schedules[i].col3 + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + schedules[i].col4 + " &nbsp;" + schedules[i].col5 + '</div>';
//     document.getElementById('schedulesField').innerHTML += list;
//   }
// }

var isLog = firebase.auth().currentUser;


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    if (isLog != null) {
      document.location.href = "/schedule.html";
    }

  } 
});

function login(){
  isLog = firebase.auth().currentUser;
  if (isLog==null)
  {
    isLog = 1;
    var userEmail = document.getElementById("email_field").value.toString();
    var userPass = document.getElementById("passw_field").value.toString();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
  }
  else
  {
    window.alert("Allready logged in!" );
    document.location.href = "/schedule.html";
  }
}

function logout(){
  isLog = 0;
  firebase.auth().signOut();
  document.location.href = "/index.html";
}

function signup(){
  var userEmail = document.getElementById("email_field_sign").value.toString();
  var userPass = document.getElementById("passw_field_sign").value.toString();
  firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    //var errorCode = error.code;
    //var errorMessage = error.message;
    window.alert("Error: " + " " + error.message);
  });
  isLog = 1;
}
