//initial firebase

var firebaseConfig = {
    apiKey: "AIzaSyDLY0b9nO76ypnIPcMaZQsnzfn9uqVtnzI",
    authDomain: "train-schedule-96f92.firebaseapp.com",
    databaseURL: "https://train-schedule-96f92.firebaseio.com",
    projectId: "train-schedule-96f92",
    storageBucket: "train-schedule-96f92.appspot.com",
    messagingSenderId: "283393405732",
    appId: "1:283393405732:web:75308c6c865812b6a539b1",
    measurementId: "G-RHJHH5ZXEC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

//global variables
var trainLine = "";
var destination = "";
var start = "";
var frequency = "";
var hour = "";
var minute = "";
var schedule = [];

$(function () {
    $("#hour-input").keydown(function () {
        // Save old value.
        if (!$(this).val() || (parseInt($(this).val()) <= 11 && parseInt($(this).val()) >= 0))
            $(this).data("old", $(this).val());
    });
    $("#hour-input").keyup(function () {
        // Check correct, else revert back to old value.
        if (!$(this).val() || (parseInt($(this).val()) <= 11 && parseInt($(this).val()) >= 0))
        ;
        else
            $(this).val($(this).data("old"));
    });
});

$(function () {
    $("#minute-input").keydown(function () {
        // Save old value.
        if (!$(this).val() || (parseInt($(this).val()) <= 11 && parseInt($(this).val()) >= 0))
            $(this).data("old", $(this).val());
    });
    $("#minute-input").keyup(function () {
        // Check correct, else revert back to old value.
        if (!$(this).val() || (parseInt($(this).val()) <= 11 && parseInt($(this).val()) >= 0))
        ;
        else
            $(this).val($(this).data("old"));
    });
});
//when submit button click

$("#submit").on("click", function (event) {
    //a. get the value from the input

    event.preventDefault();

    trainLine = $("#train-input").val().trim();
    destination = $("#destination-input").val().trim();

    hour = $("#hour-input").val().trim();
    minute = $("#minute-input").val().trim();

    start = hour + ":" + minute;


    frequency = $("#freq-input").val().trim();

    console.log(start);

    //b. push to firebase
    database.ref().push({
        trainLine: trainLine,
        destination: destination,
        startTime: start,
        frequency: frequency
    })

});

//get back data from firebase, update to DOM
database.ref().on("child_added", function (childSnapshot) {

    console.log(childSnapshot.val());
    // console.log(childSnapshot.val().trainLine);

    var trainLine = childSnapshot.val().trainLine;
    var destination = childSnapshot.val().destination;
    var startTime = childSnapshot.val().startTime;
    var frequency = childSnapshot.val().frequency;

    // var nextTrain = 








    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainLine),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(),
        $("<td>").text(),
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);

});