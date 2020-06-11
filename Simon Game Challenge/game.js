var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var clicks = 0;
var started = false;

function nextSequence() {
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log("GAME PATTERN: "+gamePattern);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

$(".btn").click(function () {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  console.log("USER CHOSEN PATTERN: "+userClickedPattern);
  clicks++;
  if(clicks == level)
  {
    clicks = 0;
    checkAnswer(level);
  }
})

function playSound(name) {
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#"+currentColor).addClass("pressed");
  setTimeout(function () {
      $("#"+currentColor).removeClass("pressed");
  },100);
}

$(document).keydown(function () {
  if(!started)
  {
    started = true;
    $("#level-title").text("Level 1");
    setTimeout(function () {
      nextSequence();
    },500);
  }
});

function displayWrong() {
  $("#level-title").text("You Lose. Your score is "+level+". Press a key to play again.");
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  },200)
}

function checkAnswer(currentLevel) {
  var i=0;
  for(i=0;i<currentLevel;i++)
  {
    console.log(userClickedPattern[i]+" "+gamePattern[i]);
    if(userClickedPattern[i]!=gamePattern[i])
    {
      displayWrong();
      startOver();
      break;
    }
  }
  userClickedPattern=[];
  if(i==currentLevel)
  {
    setTimeout(function(){
      nextSequence();
    },1000);
  }
}

function startOver() {
  level = 0;
  started = false;
  gamePattern = [];
}
