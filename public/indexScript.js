$(document).ready ( function (){
  
  var dbScheduleCount  = firebase.database().ref().child('schedule').child('count');
  
  dbScheduleCount.on('value', snap => 
  {
      var scheduleCount = snap.val(); 
      ShowSchedules(scheduleCount);
  });
  
  
});

function ShowSchedules(scheduleCount){
  let ind = 1;
  for (var i=1; i <= scheduleCount; i++) {

    var dbSchedule  = firebase.database().ref().child('schedule').child('schedule ' + i);

    dbSchedule.on('value', snap => 
    {
        var schedule = snap.val();
        var dbStationsCount  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child('count');
        dbStationsCount.on('value', snap => 
        {
            var stationsCount = snap.val(); 
            var dbFirstStation  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child(1);
            dbFirstStation.on('value', snap => 
            {
                var firstStation = snap.val(); 
                var dbLastStation  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child(stationsCount);
                dbLastStation.on('value', snap => 
                {
                    var lastStation = snap.val(); 
                    var list = '<button  onclick="scheduleInd('+ ind +')" type="button" class="btn btn-info Schedule "' + '>' + schedule.train_number + ": " + 
                    firstStation.station_name + " " + schedule.departure + " - " + lastStation.nextstation_name + " " + schedule.arrival + '</btn>';
                    ind += 1;
                    document.getElementById('schedulesField').innerHTML += list;
                });
            });
        });
        //window.alert(route);
    });
      
  }
}

// function scheduleInd(number, departure)
// {
//   document.location.href = "/schedule.html?schedule=" + number + '&deparure=' + departure;
// }

function scheduleInd(number)
{
  document.location.href = "/schedule.html?schedule=" + number;
}


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
