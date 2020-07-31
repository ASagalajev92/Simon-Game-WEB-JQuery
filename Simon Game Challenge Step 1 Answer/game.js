// 2. buttonColours array
var buttonColours = ["red", "blue", "green", "yellow"];

//-----    New Empty Array for randomly chosed color   -----//
var gamePattern = [];

//-----    New Empty Array for user pressed button color  -----//
var userPattern = [];

//-----    Counting levels of game   -----//
var level = 0;


//-----    Function for getting random element and saving it to new array   -----//
function nextSequence() {
  //-----   Empty existed array after repeted call of function   -----//
  userPattern = [];

  // creating random number from 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  //-----    variable to store randomly chosed color   -----//
  var randomColor = buttonColours[randomNumber];
  //-----    Saving randomColor element to new Array gamePattern   -----//
  gamePattern.push(randomColor);
  //-----    Checking that lvl is greater that 0 and then changing #level-title   -----//
  if (level > 0) {
    $("#level-title").text("Level " + level);
  }
  //-----    Increasing lvl every nextSequence() call   -----//
  level++;

  //-----    Selecting button that have same id as randomColor   -----//
  switch (randomColor) {
    case "red":
      $("#red").delay(100).fadeOut().fadeIn('slow');
      playSound(randomColor);

      break;
    case "blue":
      $("#blue").delay(100).fadeOut().fadeIn('slow');
      playSound(randomColor);
      break;
    case "green":
      $("#green").delay(100).fadeOut().fadeIn('slow');
      playSound(randomColor);

      break;
    case "yellow":
      $("#yellow").delay(100).fadeOut().fadeIn('slow');
      playSound(randomColor);

      break;
    default:
  }

}

//-----    Click listener to user clicked button   -----//
$(".btn").on("click", function() {
  //-----    Getting chosed button id and storing to variable   -----//
  var userChosenColor = $(this).attr("id");
  //-----    Adding content of button that user chosed to our empty array   -----//
  userPattern.push(userChosenColor);
  //-----    Playing sound when user click button   -----//
  playSound(userChosenColor);
  //-----    Changing style of button when its clicked   -----//
  animatePress(userChosenColor);

  //-----    Checking for right answer   -----//
  //-----    Taking last element element in user chosed array userPattern[]   -----//
  var lastElementInArray = userPattern.length - 1;
  //-----    Callind check function and past last user clicked element   -----//
  checkAnswer(lastElementInArray);


});

//-----    Audio function for using in our methods   -----//
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();

}

//-----    Animation function   -----//
function animatePress(currentColor) {
  //-----    Adding animation class .pressed and saving to variable   -----//
  var $addedClass = $("#" + currentColor).addClass("pressed");
  //-----    time out  150 millisekonds befor deleting .pressed class   -----//
  setTimeout(function() {
    $addedClass.removeClass("pressed");
  }, 150);

}


$(document).keypress(function(event) {
  //-----    Checking buttons that was pressed   -----//
  if (event.key === "q" && level < 1) {
    nextSequence();
  } else if (event.key === "e") {
    userPattern.push("green");
    checkAnswer(userPattern.length-1);
    playSound("green");
    animatePress("green");
  } else if (event.key === "o") {
    userPattern.push("red");
    checkAnswer(userPattern.length-1);
    playSound("red");
    animatePress("red");
  } else if (event.key === "f") {
    userPattern.push("yellow");
    checkAnswer(userPattern.length-1);
    playSound("yellow");
    animatePress("yellow");
  } else if (event.key === "k") {
    userPattern.push("blue");
    checkAnswer(userPattern.length-1);
    playSound("blue");
    animatePress("blue");
  }
});

function checkAnswer(level) {
  //-----    Cheking if user clicked button element is equals to last element in gamePattern[]   -----//
  if (gamePattern[level] === userPattern[level]) {
    if (userPattern.length === gamePattern.length) {
      //-----    timeout before calling new nextSequence()   -----//
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
  }
}
