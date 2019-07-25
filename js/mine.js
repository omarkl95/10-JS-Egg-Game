// global variables

var  container       = $('#container'),
     containerHeight = container.height(),
     content         = $('#content'),
     stateBar        = $('#statusBar'),
     scoreSpan       = $('#score'),
     lifeSpan        = $('#life'),

     hen = $('.hen'),
     eggs = $('.egg'),
     egg1 = $('#egg1'),
     egg2 = $('#egg2'),
     egg3 = $('#egg3'),
     eggInitialPosition = parseInt(eggs.css('top')),// get eggs the beginning point
     egg_height = eggs.height(),
     eggCurrentPosition = 0,
     eggTop = 0,
     brokenEggNum = 0,

     basket    = $('#basket'),
     basketHeight = basket.height(),
     basketTop = containerHeight - basketHeight,
     basketScore     = $('#basketScore'),

     floor     = $('#floor'),
//game control variables
     gameStart =$('#gameStart'),
     play =$('#play'),
     gameOverWindow = $('#gameOver'),
     gameOverScore  = $('#gameOverScore'),
     playAgain      = $('#playAgain'),

// sound effects variables
     playSound = new Audio(),
     scoreSound = new Audio(),
     loserSound = new Audio(),


// reset some variables values
     score    = 0,//the beginning score
     life     = 10,//the beginning num of lifes
     speed    = 2,//the beginning speed
     maxSpeed = 15,// max speed
     theGame  = 0,
     animId   = 0;


// get src of sound effects
     playSound.src = "sounds/happy chicken.mp3";
     scoreSound.src = "sounds/score.mp3";
     loserSound.src = "sounds/game over.mp3";
// make sound continue during the playing
     function enableLoop() {
          playSound.loop = true;
        }

// start lifes num
lifeSpan.text(life);


// move basket with mouse move

$(document).mousemove(function (e) {
     basket.css('left', e.pageX);
});


// moving eggs down and set it in theGame function blow
function eggDown(egg) {
     eggCurrentPosition = parseInt(egg.css('top'));
     egg.css('top', eggCurrentPosition + speed);

}

// show broken eggs when reach the floor & lost one life
function eggOnFloor(egg) {

     if (collision(egg, floor)) {
          showBrokenEgg(egg);// show broken eggs function defined blow
          lostLife();// lose life every broken egg function defined blow
          return true;
     }
     return false;
}


// reback the start position of eggs and set it in theGame function blow
function startEgg(egg) {
     egg.css('top', eggInitialPosition);

}

// show & hide broken egg function
function showBrokenEgg(egg) {
     brokenEggNum = egg.attr('data-brokenEgg');
     $('#brokenEgg' + brokenEggNum).show(1, function () {
          setTimeout(function () {
               $('#brokenEgg' + brokenEggNum).hide();// hide broken egg after 600 ms
          }, 600);
     });

}

// lost one life function

function lostLife() {
     life--;// lose life every broken egg
     lifeSpan.text(life);// updat lifes num in life span
}

// when the basket take an egg
function eggsInBasket(egg) {

     if (collision(egg, basket)) {
          eggTop = parseInt(egg.css('top'));
          if (eggTop < basketTop) {
               scoreUp();// updat the scor function defined blow
               scoreSound.play();// play scoresound function defined
               return true;
          }
     }
     return false;
}

// Update the score function
function scoreUp() {
     score++;// increment score
     if (score % 10 === 0 && speed <= maxSpeed) {
          speed++;//increment speed
     }
     scoreSpan.text(score);// update text of score span
     basketScore.text(score);// update text of score on basket

}

// stop the game when losing
function stopTheGame() {
     cancelAnimationFrame(animId);// stop the moving of eggs
     $('.brokenEgg').hide();// hide the broken eggs
     gameOverScore.text(score);// show the score in game over popup
     playSound.pause();//stop playing sound
      loserSound.play();// play game over sound
     gameOverWindow.show();// show game over popup
     content.hide();// hide all screen items
}

// reload the game when press play again
playAgain.click(function () {
     location.reload();
});



//  game animation and effects function (theGame)
var theGame = function () {

     playSound.play();// for play sound
     enableLoop();// looping play sound function defined above
     // first egg
     // reback eggs when reach the floor or catch by basket
     if (eggOnFloor(egg1) || eggsInBasket(egg1)) {
          startEgg(egg1);

     } else {

          // moving eggs down
          eggDown(egg1);// function defined above
     }

     //scond egg
     // reback eggs when reach the floor
     if (eggOnFloor(egg2) || eggsInBasket(egg2)) {
          startEgg(egg2);

     } else {

          // move eggs down
          eggDown(egg2);
     }

     // third egg
     // reback eggs when reach the floor
     if (eggOnFloor(egg3) || eggsInBasket(egg3)) {
          startEgg(egg3);

     } else {

          // move eggs down
          eggDown(egg3);
     }


     if (life > 0) {
          game_id = requestAnimationFrame(theGame);//repeat the moving

     } else

          stopTheGame();// stop when losing all lifes function defined above

};


// start game when press play btn
play.click(function(){
     gameStart.hide();//hide the popup
     game_id = requestAnimationFrame(theGame);//start game

});



