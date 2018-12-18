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


function writeScheduleData(routeID, trainNB, departureTM, arrivalTM) {

    firebase.database().ref('schedule/test').set({
        train_number: trainNB,
        route_id: routeID,
        departure: departureTM,
        arrival: arrivalTM
    });

    var dbTrain = firebase.database().ref().child('schedule').child('test').child('train_number');
        dbTrain.on('value', snap => {
            var trainNMB = snap.val();
            setCookie('userNick', trainNMB)
        });
    var trainNMB = getCookie('userNick' );
    return trainNMB;
}

function ShowSchedule(number){

    var dbSchedule  = firebase.database().ref().child('schedule').child('schedule ' + number);
  
    dbSchedule.on('value', snap => 
    {
        var schedule = snap.val();
   
        var dbFirstStation  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child(1);
        dbFirstStation.on('value', snap => 
        {
            var firstStation = snap.val();
            var str = firstStation.station_name;
            setCookie('stationNM', str);
        });
  
    });
    var stationNM = getCookie('stationNM');
    return stationNM;
}

function login(userEmail, userPass){
    setCookie ('isLog', 1);
    var isLog = firebase.auth().currentUser;
    if (isLog==null)
    {
        firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
        if(error)
        {
            var errorMessage = error.message;
            setCookie ('isLog', 0);
        }   
      });
    }
    else
    {
      window.alert("Allready logged in!" );
      document.location.href = "/admin.html";
    }
    var isLog = parseInt(getCookie('isLog'));
    if (isLog == 0) {
        return 0;
    }   
    else {
        return 1;
    }
}

function ind(index){
    setCookie('newCookie', index);
    return index;
}

