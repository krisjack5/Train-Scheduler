 // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDuSgRsc6-QSfgO3BCL8dJHEInpCsB_t-A",
    authDomain: "train-schedule-ff81d.firebaseapp.com",
    databaseURL: "https://train-schedule-ff81d.firebaseio.com",
    storageBucket: "train-schedule-ff81d.appspot.com",
    messagingSenderId: "1012157122441"
  };
  firebase.initializeApp(config);


var database = firebase.database();


// adds a train
$("#addTrainBtn").on("click", function(){

	// holds user input
	var trainName = $("#trainNameInput").val().trim();
	var traindestination = $("#destinationInput").val().trim();
	var trainStart = moment($("#startInput").val().trim(), "HH:mm").format("X");
	var trainFrequency = $("#frequencyInput").val().trim();

	//new train data
	var newtrain = {
		name:  trainName,
		destination: traindestination,
		start: trainStart,
		frequency: trainFrequency
	}

	// Uploads train data to the database
	database.ref().push(newtrain);

	
	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#startInput").val("");
	$("#frequencyInput").val("");

	// Prevents moving to new page
	return false;
});


// event to add train to firebase
database.ref().on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	
	var trainName = childSnapshot.val().name;
	var traindestination = childSnapshot.val().destination;
	var trainStart = childSnapshot.val().start;
	console.log(trainStart);
	var trainFrequency = childSnapshot.val().frequency;

			

		// move time back 1 year
		var trainStartConverted = moment(trainStart, "X").subtract(1, "years");
		console.log(trainStartConverted);

		// Current Time
		var currentTime = moment();
		console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

		// Difference between the times
		var diffTime = moment().diff(moment(trainStartConverted), "minutes");
		console.log("DIFFERENCE IN TIME: " + diffTime);

		// remainder
		var tRemainder = diffTime % trainFrequency;
		console.log(tRemainder);

		// Minutes Until Train
		var tMinutesTillTrain = trainFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

		// arrival time
		var nextTrain = moment().add(tMinutesTillTrain, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));
		nextTrainPretty = moment(nextTrain).format("hh:mm A");

	
	console.log(trainName);
	console.log(traindestination);
	console.log(trainStartConverted);
	console.log(trainFrequency);

	
	var trainStartPretty = moment.unix(trainStartConverted).format("HH:mm");


	// Add train info to table
	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + traindestination + "</td><td>" + trainFrequency + "</td><td>" + nextTrainPretty + "</td><td>" + tMinutesTillTrain);

});