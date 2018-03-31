$(document).ready(function() {

    //initialize firebase
  var config = {
    apiKey: "AIzaSyDe8mfUAUGV4xmFk72Xp5Y672U3u4UnhuE",
    authDomain: "test-b9b91.firebaseapp.com",
    databaseURL: "https://test-b9b91.firebaseio.com",
    projectId: "test-b9b91",
    storageBucket: "test-b9b91.appspot.com",
    messagingSenderId: "249429698926"
  };
  
  firebase.initializeApp(config);

  var database = firebase.database();

 
  //when the submit button is clicked page is prevented from reloading
  $("#submit").on("click", function(event) {
  		event.preventDefault();

     //grabs and trims the values the user input to each field of the form
     //and stores them in local variables
	  var name = $("#name").val().trim();
	  var destination = $("#destination").val().trim();
	  var first = $("#first").val().trim();
	  var frequency = $("#frequency").val().trim();

	  //variable for holding the data for each new train as an object
	  var newTrain = {
	  	name: name,
	  	destination: destination,
	  	start: first,
	  	frequency: frequency
	  };

	    //pushes the new train data to firebase
  		database.ref("/trains").push(newTrain);

	    //clears text inputs so user can more easily add another train
        $("#name").val("");
        $("#destination").val("");
        $("#first").val("");
        $("#frequency").val("");
    });
    

    //when a child is added to firebase a snapshot of the data is taken
	database.ref("/trains").on("child_added", function(childSnapshot) {

	  //variables for storing each value of the snapshot
	  var name = childSnapshot.val().name;
	  var destination = childSnapshot.val().destination;
	  var first = childSnapshot.val().first;
	  var frequency = childSnapshot.val().frequency;

      //time variables and conversions
        var firstTrain = 0;
        var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
	    var currentTime = moment();
		var difference = moment().diff(moment(firstTrainConverted), "minutes");
	    var remainder = difference % frequency;
        var minToTrain = frequency - remainder;
	    var nextTrain = moment().add(minToTrain, "minutes");


	  //each train is added to the table
	  $("#train-table tbody").append("<tr><td>" + name + "</td><td>" + destination + "</td><td>" + frequency + 
	   "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + minToTrain + "</td></tr>");
	});

});