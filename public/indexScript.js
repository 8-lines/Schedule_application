let time;

$(document).ready ( function (){
  
  var dbScheduleCount  = firebase.database().ref().child('schedule').child('count');

  var day = new Date();
  var now_hours = day.getHours();
  var now_minutes = day.getMinutes();
  time = now_hours + ":" + now_minutes;
  //window.alert(time);

  dbScheduleCount.once('value', snap => 
  {
      var scheduleCount = snap.val(); 
      ShowSchedules(scheduleCount);
  });
  
  
});

function ShowSchedules(scheduleCount){
  let ind = 1;
  for (var i=1; i <= scheduleCount; i++) 
  {
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
                    var date = new Date();
                    var time = date.getHours() + ":" + date.getMinutes();
                    var isGone = time_check(time, schedule.departure, schedule.arrival);
                    var list = '<button  onclick="scheduleInd('+ ind +')" type="button" class="btn btn-info Schedule "';

                    if (isGone == 1) {list += 'style="background-color:rgba(244, 67, 54, 0.9)"'; }
                    else if (isGone == 0) { list += 'style="background-color:rgba(190, 162, 0, 0.9)"'; }
                    else if (isGone == -1) { list += 'style="background-color:rgba(76, 175, 80, 0.9)"'; }

                    list = list + '>' + schedule.train_number + ": " + firstStation.station_name + " " + 
                    schedule.departure + " - " + lastStation.nextstation_name + " " + schedule.arrival + '</btn>';
                    ind += 1;
                    document.getElementById('schedulesField').innerHTML += list;
                });
                
            });
        });
        //window.alert(route);
    });
      
  }
}

function time_check(time, departure, arrival)
{
  //window.alert(time + " " + departure + " " + arrival);
  //var date = new Date();
  //var time = date.getHours() + ":" + date.getMinutes();
  //var time = "11:" + date.getMinutes();
  var dep_time = Date.parse("09 Aug 1995 " + departure);
  var arr_time = Date.parse("09 Aug 1995 " + arrival);
  time = Date.parse("09 Aug 1995 " + time);
  //window.alert(time + " " + dep_time + " " + arr_time);
  if (time < dep_time)
    return -1;

  if ((time > dep_time) && (time < arr_time))
    return 0;

  if (time > arr_time)
    return 1;
  
}


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
  user = firebase.auth().currentUser;
  if (user==null)
  {
    var userEmail = document.getElementById("email_field").value.toString();
    var userPass = document.getElementById("passw_field").value.toString();
    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
      // Handle Errors here.
      var errorMessage = error.message;
      window.alert("Error: " + errorMessage);
    });
    setCookie('LoginCookie', userEmail, {path: '/', exrises: 100});
    document.location.href = "/admin.html";
  }
  else
  {
    setCookie('LoginCookie', user.email, {path: '/', exrises: 100});
    window.alert("Allready logged in!" );
    document.location.href = "/admin.html";
  }
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

function directMain(){
  document.location.href = "/index.html";
}

function ind(index){
  setCookie('newCookie', index);
  return index;
}
