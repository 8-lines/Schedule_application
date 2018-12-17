$(document).ready ( function (){
  
  var cookieEmail = getCookie ('LoginCookie');
  //window.alert(cookieEmail);
  if (cookieEmail == undefined)
  {
    document.location.href = "/403.html";
  }
  
  
});



// добавление новых данных в таблицу
function addSchedule(){
  var routeID = document.getElementById("routeID_field_sign").value.toString();
  var trainNB = document.getElementById("trainNB_field_sign").value.toString();
  var departureTM = document.getElementById("departureTM_field_sign").value.toString();
  var arrivalTM = document.getElementById("arrivalTM_field_sign").value.toString();

  var dbScheduleCount  = firebase.database().ref().child('schedule').child('count');
  dbScheduleCount.once('value', snap => 
  {
    let tmp = snap.val();
    if (tmp == null) { tmp = 0; }
    tmp += 1;
    dbScheduleCount.set(tmp);
    writeScheduleData(routeID, trainNB, departureTM, arrivalTM, tmp);
  });
  
  window.alert("Successfully added!");

}

function writeScheduleData(routeID, trainNB, departureTM, arrivalTM, count) {

  firebase.database().ref('schedule/schedule ' + count).set({
    train_number: trainNB,
    route_id: routeID,
    departure: departureTM,
    arrival: arrivalTM
  });

  //window.alert("Successfully added!");

}

function directMain(){
  document.location.href = "/index.html";
}

function directSchedule(){
  document.location.href = "/schedule.html";
}