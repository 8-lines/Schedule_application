$(document).ready ( function (){
  
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  number = unescape(temp[1]);
  ShowSchedule(number);
  
});

function ShowSchedule(number){
  var dbSchedule  = firebase.database().ref().child('schedule').child('schedule ' + number);

  dbSchedule.on('value', snap => 
  {
      var schedule = snap.val();
      var time = schedule.departure;

      var dbStationsCount  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child('count');
      dbStationsCount.on('value', snap => 
      {
          var stationsCount = snap.val(); 
          var first = true;
          for (i=1; i<=stationsCount; i++)
          {
            
            var dbCurrStation  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child(i);
            dbCurrStation.on('value', snap => 
            {
                var currStation = snap.val(); 
                var travel = currStation.travel_time;
                if (first)
                {
                  var listN = '<div class="Schedule">' + schedule.train_number + ": &nbsp;" + 
                  currStation.station_name + " &nbsp;-&nbsp;&nbsp;" + time + '</div>';
                  document.getElementById('scheduleField').innerHTML += listN;
                  first = false;
                }
                time = newtime(time, travel);
                var list = '<div class="Schedule">' + schedule.train_number + ": &nbsp;" + 
                currStation.nextstation_name + " &nbsp;-&nbsp;&nbsp;" + time + '</div>';
                document.getElementById('scheduleField').innerHTML += list;
            });
          }

      });
      //window.alert(route);
  });
      
}

function newtime(told, tdiff){
  var time = new Date('Jan 1, 2009 ' + told);
  var tnew = new Date('Jan 1, 2009 ' + tdiff);
  time.setMilliseconds(tnew.getHours() * 60 * 60 * 1000);
  time.setMilliseconds(tnew.getMinutes() * 60 * 1000);
  hours = time.getHours();
  minutes = time.getMinutes();
  if (hours < 10) { hours = "0" + hours; }
  if (minutes < 10) { minutes = "0" + minutes; }
  var str = hours + ":" + minutes;
  return str;
}

function logout(){
  isLog = 0;
  firebase.auth().signOut();
  document.location.href = "/index.html";
}

function directMain(){
  document.location.href = "/index.html";
}