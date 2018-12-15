$(document).ready ( function (){
  $.ajax({
    type: "GET",
    url:'/scheduleExact',
    dataType:"json",
    success: function(data){
      console.log(data);
      exactSchedules = data;
      ShowSchedules(exactSchedules);
    }
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