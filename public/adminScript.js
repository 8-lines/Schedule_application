function logout(){
  isLog = 0;
  firebase.auth().signOut();
  document.location.href = "/index.html";
}

// добавление новых данных в таблицу
function addTrain(){
  var trainID = document.getElementById("trainID_field_sign").value.toString();
  var trainNB = document.getElementById("trainNB_field_sign").value.toString();

  writeTrainData(trainID, trainNB);
  isLog = 1;
}

function writeTrainData(trainID, trainNB) {

  firebase.database().ref('train/' + substringArray[0]).set({
    train_id: trainID,
    train_number: trainNB,
  });

}
