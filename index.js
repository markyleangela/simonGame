var buttonColours = ["red", "blue","green","yellow"];
var gamePattern = []
var userClickedPattern = []
var level = 0;
var started = false

$(document).keypress(function(){

    if(!started){
        $(".level-title").text("Level " + level);
        nextSequence()
        started = true;
    }
    
});

function nextSequence(){
    level++;

    var randomNum = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomNum];
    gamePattern.push(randomColour); 

    $("." + randomColour).fadeIn(100).fadeOut(100).fadeIn(100);

    
    $("#level-title").text("Level " + level);
    
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed");
    setTimeout(function(){
        $("." + currentColour).removeClass("pressed");
    }, 500);
}

$(".btn").click(function (){
    
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(level);

    console.log(gamePattern);
    console.log(userClickedPattern);
})


function checkAnswer(currentLevel){

    if(currentLevel == userClickedPattern.length){
        for(var i = 0; i < level; i++){
            if(userClickedPattern[i] != gamePattern[i]){
                $("#level-title").text("Game Over");
                return;
            }
        }
        setTimeout(nextSequence, 1000);
        userClickedPattern = [];
        return;
    } 

}