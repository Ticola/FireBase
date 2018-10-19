// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNUiMtqpBDkwZDZjqM9So0StFqC37O2bo",
    authDomain: "train-project-cfdef.firebaseapp.com",
    databaseURL: "https://train-project-cfdef.firebaseio.com",
    projectId: "train-project-cfdef",
    storageBucket: "train-project-cfdef.appspot.com",
    messagingSenderId: "1035779857288"
};
firebase.initializeApp(config);

var database = firebase.database();


$("#add-user").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#trainname-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var firstTrain = $("#first-train-input").val().trim();
    var trainFreq = $("#train-freq-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        first: firstTrain,
        frequency: trainFreq

    };

    firebase.database().ref().push(newTrain);

    // console.log(newTrain.name);
    // console.log(newTrain.destination);
    // console.log(newTrain.first);
    // console.log(newTrain.frequency);

});

database.ref().on("child_added", function (childSnapshot, prevChildKey) {

    // console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrain = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().frequency;

    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");

    var currentTime = moment();

    var difference = moment().diff(moment(firstTrainConverted), "minutes");
    var differenceConverted = moment(difference).format("hh:mm");


    var tRemainder = difference % trainFreq;

    var minAway = trainFreq - tRemainder;

    var nextTrain1 = moment().add(minAway, "minutes");
    var nextTrainFormatted = moment(nextTrain1).format("hh:mm");


    $("#space-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" + trainFreq + "</td><td>" + nextTrainFormatted + "</td><td>" + minAway + "</td></tr>");

});
