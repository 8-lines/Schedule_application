$(document).ready ( function (){
  
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  number = unescape(temp[1]);
  
  var dbScheduleCount  = firebase.database().ref().child('schedule').child('count');
  
  dbScheduleCount.on('value', snap => 
  {
      var scheduleCount = snap.val(); 
      ShowSchedules(scheduleCount);
  });
  
  
});

function ShowSchedules(exactSchedules){
  //window.alert(exactSchedules.length);
  for (var i=0; i<exactSchedules.length; i++) {
    var newlist = '<div class = "ScheduleAll">' + exactSchedules[i].col1 + ": &nbsp;&nbsp;&nbsp;&nbsp;" + exactSchedules[i].col2 + " &nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;" + exactSchedules[i].col3 + '</div>';
    document.getElementById('schedulesFieldAll').innerHTML += newlist;
    if ((i+1)%5==0)
    {
      var list_temp = '<div class = "Schedule-top">' + '</div>';
      document.getElementById('schedulesFieldAll').innerHTML += list_temp;
    }
  }
  
}

function logout(){
  isLog = 0;
  firebase.auth().signOut();
  document.location.href = "/index.html";
}

function directMain(){
  document.location.href = "/index.html";
}