let coordinates = [];

$(document).ready ( function (){
  
  var parameters = location.search.substring(1).split("&");
  var temp = parameters[0].split("=");
  number = unescape(temp[1]);
  ShowSchedule(number);
  setTimeout(map_init, 3000);
});

function ShowSchedule(number){
  var dbSchedule  = firebase.database().ref().child('schedule').child('schedule ' + number);
  
  dbSchedule.once('value', snap => 
  {
      var schedule = snap.val();
      var time = schedule.departure;
      var dbStationsCount  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child('count');
      dbStationsCount.once('value', snap => 
      {
          var stationsCount = snap.val(); 
          var first = true;
          for (i=1; i<=stationsCount; i++)
          {
            var dbCurrStation  = firebase.database().ref().child('route').child('route ' + schedule.route_id).child('stations').child(i);
            dbCurrStation.once('value', snap => 
            {
                var currStation = snap.val(); 
                var travel = currStation.travel_time;
                if (first)
                {
                  var listN = '<div class="Schedule">' + schedule.train_number + ": " + 
                  currStation.station_name + " - " + time + '</div>';
                  document.getElementById('scheduleField').innerHTML += listN;
                  first = false;
                  coordinates_saving(currStation.station_name, time);
                }
                time = newtime(time, travel);
                coordinates_saving(currStation.nextstation_name, time);
                var list = '<div class="Schedule">' + schedule.train_number + ": " + 
                currStation.nextstation_name + " - " + time + '</div>';
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


function coordinates_saving(st_name, time)
{ 
  var dbStation  = firebase.database().ref().child('station').child(st_name);

  dbStation.on('value', snap => 
  {
    var station = snap.val();
    var tempLatitude = station.latitude;
    var tempLongitude = station.longitude;
    setCookie('station_latitude', tempLatitude);
    setCookie('station_longitude', tempLongitude);

    coordinates[coordinates.length] = st_name;
    var latitude = getCookie ('station_latitude');
    coordinates[coordinates.length] = latitude;
    var longitude = getCookie ('station_longitude');
    coordinates[coordinates.length] = longitude;
    coordinates[coordinates.length] = time;
  });
  
}

function directMain(){
  document.location.href = "/index.html";
}

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
//ymaps.ready(map_init);
function map_init(){ 
    // Создание карты. 
    
    // var n = (coordinates.length)/4;
    // console.log(n);
    // console.log(coordinates[9] + " " + coordinates[n] + " " + n);
    // console.log(coordinates[10] + " " + coordinates[n+1] + " " + (n+1));
    var center_latitude = parseFloat(coordinates[9]);
    var center_longitude = parseFloat(coordinates[10]);   

    var myMap = new ymaps.Map("map", {
      
        // Координаты центра карты. Порядок по умолчанию: «широта, долгота».
        // Можно использовать инструмент - определение координат.
        //center: [59.906797, 30.297825],
        center: [center_latitude, center_longitude],
        // Уровень масштабирования. Допустимые значения: от 0 (весь мир) до 19.
        zoom: 10
    });
    
    

    var i = 0;
    while (i < coordinates.length)
    {
      var st_name = coordinates[i];
      var curr_latitude = parseFloat(coordinates[i+1]);
      var curr_longitude = parseFloat(coordinates[i+2]);
      var time = coordinates[i+3];
      console.log(i + " " + st_name + " " + curr_latitude + " " + curr_longitude + " " + time);
      myMap.geoObjects
      .add(new ymaps.Placemark([curr_latitude, curr_longitude], {
          balloonContent: '<strong> Ж/д станция ' + st_name + '</strong>',
          iconCaption: (i/4+1) + ". " + st_name + ': '+ time
      }, {
          preset: 'islands#greenDotIconWithCaption'
      }));  

      i += 4;
    }

  if (myMap)
    return 1;
}
