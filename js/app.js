//**********************************************************************
//
//  AUTHOR    - DOUGLAS WISSETT WALKER
//  DATE      - 02/02/2016
//  VERSION   - 2.8.5
//  PREVIOUS  - 2.7.1
//
//  REFERENCES: UiTutorial to help moveSnake logic 
//
//**********************************************************************



// TODO
// 
//  - implement self hit detection   - fixed, glitchy        // might have a fix, delay next game
//  - add highscore feature          - fixed 
//  - 2 player feature               - fixed
//  - single player mode             - fixed
//  - speed controls                 - added basic feature   -- removed
//  - disable multi btn on play      - fixed
//  - add delay on new game btn      - fixed         // this will hopefully fix hit detection bug 
//  - add current score              - added
//  - fix highscoring not resetting  - fixed
//  - Bug fixing & refactoring       - in progress
//  - styling                        - in progress
//



console.log('demo app');

$(function(){
 
  var $container = $('#container');
  var speed = 200;                            // set game speed to input value
  var highscore = 0;
  var running = false;

  function reset() {                         // reset game variables to default
    speed = 200; 
    snake = ['10_28','10_29','10_30'];
    tail = null;
    head = null;
    direction = 'left';
    score = 0;
    snake2 = ['10_2','10_1','10_0'];
    tail2 = null;
    head2 = null;
    direction2 = 'right';
    score2 = 0;  
  }


  // make container div draggable
  $(function(){
    $container.draggable();
  });

  //  http://stackoverflow.com/questions/8916620/disable-arrow-key-scrolling-in-users-browser
  $(window).keydown(function(e){
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
      }
  });

  $(document).keydown(function(e){            // keydown listener
    var keycode = e.keyCode;                  // check keycode, set direction

    // player 1 directions
    switch(keycode) {
      case 38:
        if(direction === 'down') return;
          direction = 'up';
        break;
      case 39:
        if(direction === 'left') return;
        direction = 'right';
        break;
      case 40:
        if(direction === 'up') return;
        direction = 'down';
        break;
      case 37:
        if(direction === 'right') return;
        direction = 'left';
        break;
      default:
        //direction;
    }
    // player 2 directions
    switch(keycode) {
      case 87:
        if(direction2 === 'down') return;
          direction2 = 'up';
        break;
      case 68:
        if(direction2 === 'left') return;
        direction2 = 'right';
        break;
      case 83:
        if(direction2 === 'up') return;
        direction2 = 'down';
        break;
      case 65:
        if(direction2 === 'right') return;
        direction2 = 'left';
        break;
      default:
        //direction2;
    }
  });

  function buildCells() {                     // create rows and columns divs
    $gamebox = $('#gamebox');                
    for(var i = 0; i < 30; i++) {
      for(var j = 0; j < 30; j++) {
        $gamebox.append('<div class="cell" id='+i+'_'+j+'></div>');
      }
    }
  }

  function buildSnake() {                    // render snake 1 & 2 at starting position
    $('#10_28').addClass('snake');
    $('#10_29').addClass('snake');
    $('#10_30').addClass('snake');
  }

  function buildSnake2() {                     
    $('#10_2').addClass('snake2');
    $('#10_1').addClass('snake2');
    $('#10_0').addClass('snake2');
  }

  function generateFood() {                   // generate random number between 0-29 for x & y coordinates
    var x = Math.floor(Math.random() * 29);
    var y = Math.floor(Math.random() * 29);
    $('#'+ x +'_'+ y).addClass('food');       // query generated position, add food css to that div
    food = x +'_'+ y;                         // store food's position to check for detection later
  }

  function removeTail() {
    tail = snake.pop();                       // remove player1 tail
    $('#'+tail).removeClass('snake');
  }
  function removeTail2() {
    tail2 = snake2.pop();                     // remove player2 tail
    $('#'+tail2).removeClass('snake2');
  }

  function moveSnake() {
    var newHead = snake[0].split('_');         // grab snake head, get x & y position
    row = +(newHead[0]);  // 10
    col = +(newHead[1]);  // 8
    switch(direction) {                        // depending on current direction, calculate new head position
      case 'up':
        row = row-1;
        break;
      case 'right':
        col = col+1;
        break;
      case 'down':
        row = row+1;
        break;
      case 'left':
        col = col-1;
        break;
    }
    head = row +'_'+ col;                     // join x and y  
    snake.unshift(head);                      // add new head position to front snake array
    $('#'+head).addClass('snake');
  }

  function moveSnake2() {                     // player 2 movement control
    var newHead2 = snake2[0].split('_');
    row2 = +(newHead2[0]);  // 10
    col2 = +(newHead2[1]);  // 28
    switch(direction2) {
      case 'up':
        row2 = row2-1;
        break;
      case 'right':
        col2 = col2+1;
        break;
      case 'down':
        row2 = row2+1;
        break;
      case 'left':
        col2 = col2-1;
        break;
    }
    head2 = row2 +'_'+ col2;
    snake2.unshift(head2);
    $('#'+head2).addClass('snake2');    
  }

  function checkForEat() {                  // check if snake head position matches food position
    if(head === food) {                     // increase snake length by 1
      snake.push(tail);                     // remove food from grid
      $('#'+tail).addClass('snake');        // increase snake speed
      $('#'+food).removeClass('food');      // generate a new food piece
      speed -= 10;                          // increase player score by 10
      generateFood();
      score+=10;
    }
    if(head2 === food) {
      snake2.push(tail2);
      $('#'+tail2).addClass('snake2');
      $('#'+food).removeClass('food');
      speed -= 10;
      generateFood();
      score2+=10;
    }
  }

  function checkHit() {        // player 1 wall collision detection
    if(row < 0 || col < 0 || row > 30 || col > 30) {  
      gameOver();
      clearTimeout(timerId);
      timerId = null;
      $gamebox.append('<div id="gameMessage">'+'Player one scored: '+score+'</div>');
      if(numPlayer === 2) {
        $gamebox.append('<div id="gameMessage2">'+'Player two scored: '+score2+'</div>');
      }
      return true; // return true to end game
    }                         
  }

  function checkHit2() { // player 2 wall collision detection
    if(row2 < 0 || col2 < 0 || row2 > 30 || col2 > 30) {
      gameOver();
      clearTimeout(timerId);
      timerId = null;
      $gamebox.append('<div id="gameMessage">'+'Player one scored: '+score+'</div>');
      $gamebox.append('<div id="gameMessage2">'+'Player two scored: '+score2+'</div>');
      return true;
    }    
  }

  $('#scoreboard').text('Highscore: ' + highscore);
  function addScore() {               // check score, set highscore
    if(score > score2) {              
      if(score > highscore){ highscore = score; }
    } else if(score2 > score) {
      if(score2 > highscore){ highscore = score2; }
    }
  }

  function setScore() {
    $('#score').text('Current score: ' + score);
  }

  function setScore2() {
    $('#score').text('Current score P1: ' + score + '     P2: ' + score2);
  }


  function gameOver() {                   // clear game window 
    for(var i = 0; i < 30; i++) {         // running status: false
      for(var j = 0; j < 30; j++) { 
        $('#'+i+'_'+j).removeClass();
      }
    }
    $gamebox.text('Game Over!');
    running = false;

    // game over animations
    function shrink(){
      $gamebox.velocity({ height: 0 })
      .velocity({width:0});
      $()
      $('#gameMessage').remove();     // remove score messages
      $('#gameMessage2').remove();
      $gamebox.text('');    // clear game window text
    }
    //setTimeout(shrink,3000);              // animate container after 2500ms
    //setTimeout(function(){$('#gamebox').remove()},3340); // remove container after 3340ms     ( Game finish )
    setTimeout(function(){ $('#newGame').on('click', newGameEvent)}, 5000);
    $('#single').on('click', singleEvent);
    $('#multi').on('click', multiEvent);
  }

//
//
//    GAME LOGIC
//
//

  var timerId;                  // game refresh on timer
  function refresh() {
    game.update();
  }

  var game = {                  // function to build game
    startGame: function() {
      buildCells();
      buildSnake();

      if(numPlayer === 2) {
        buildSnake2();
      }

      generateFood(); 
      timerId = setTimeout(refresh, speed);
    },                          
    update: function() {        // function to update game 

      if(numPlayer === 1) {
        removeTail();
        moveSnake();
        selfHit();    
        checkForEat();
        checkHit();
        addScore();
        setScore();
        $('#scoreboard').text('Highscore: ' + highscore);
        if(checkHit()) return;  // if checkHit === true, stop game
      } else {
        removeTail();
        removeTail2();
        moveSnake();
        moveSnake2();
        selfHit2();
        checkForEat();
        checkHit();
        checkHit2();
        addScore();
        setScore2();

        $('#scoreboard').text('Highscore: ' + highscore);
        if(checkHit() || checkHit2()) return;        
      }
      timerId = setTimeout(refresh, speed);
    }
  };




    //        START GAME BUTTON
  $('#newGame').on('click', newGameEvent); 

  function newGameEvent() {                             // start game on button click
    if(running) return;                               // ignore if game already running
    $('#gamebox').remove();
    if($('#gamebox').length === 0 ) {                 // create another gamebox 
      $container.append("<div id='gamebox'></div>");  // reset game objects to default
    }
    reset();
    console.log('reseting')

    // start count down
    startCountDown();

    setTimeout(callGame, 2500);
  }
  
  function callGame() {       // Initialise function
    if(running) return;
    running = true;           // if game still running, don't startGame()

    $('#newGame').off();
    $('.multiBtn').off();
    game.startGame();
  }




  // Multiplayer functionality
  var gameMode = 'Single Player';
  var numPlayer = 1;
  $('#single').on('click', singleEvent);
  $('#multi').on('click', multiEvent);
  $('#gameMode').text(gameMode).css('color', 'aqua');

  function singleEvent() {
    if(numPlayer === 2) {
      highscore = 0;
    }
    numPlayer = 1; console.log('Single Player Mode',numPlayer);
    gameMode = 'Single player';
    $('#gameMode').text(gameMode).css('color','aqua');
  }

  function multiEvent() {
    if(numPlayer === 1) {
      highscore = 0;
    }
    numPlayer = 2; console.log('Two Player Mode',numPlayer);
    gameMode = 'Two player';
    $('#gameMode').text(gameMode).css('color','yellow');
  }

  $('#start').on('click', function(){
    slide();
  });

  $('#back').on('click', function(){
      $container.velocity({ top: "-1000px"},
      { duration: 200, easing: "linear"});    
  });




  /***********************        Animations        ***********************/


  function slide() {                          // animates container down into viewport
    $container.velocity({ top: "0px"},
    { duration: 200, easing: "linear"});
  }


  // ***********************     TESTING      // ***********************


  function selfHit() {                                    // single player self hit detection
    for(var i = 0; i < snake.length; i++) {
      if(snake[i+1] === head) {
        gameOver();
        clearTimeout(timerId);
        timerId = null;
        $gamebox.append('<div id="gameMessage">'+'Player one scored: '+score+'</div>');
        if(numPlayer === 2) {
          $gamebox.append('<div id="gameMessage2">'+'Player two scored: '+score2+'</div>');
        }
        return true; 
      }
    }
  }

  function selfHit2() {                                   // two player self hit detection
    for(var i = 0; i < snake.length; i++) {
      for(var j = 0; j < snake2.length; j++) {
        if((snake[i+1] === head) || (snake2[j] === head)) {
          gameOver();
          clearTimeout(timerId);
          timerId = null;
          $gamebox.append('<div id="gameMessage">'+'Player one scored: '+score+'</div>');
          $gamebox.append('<div id="gameMessage2">'+'Player two scored: '+score2+'</div>');
          return true; 
        }
        if((snake2[j+1] === head2) || (snake[i] === head2)) {
          gameOver();
          clearTimeout(timerId);
          timerId = null;
          $gamebox.append('<div id="gameMessage">'+'Player one scored: '+score+'</div>');
          $gamebox.append('<div id="gameMessage2">'+'Player two scored: '+score2+'</div>');
          return true; 
        }
      }
    }
  } 

  // new game countdown timer
  function startCountDown() {
    var intervalID = window.setInterval(countDown, 500);
    var tick = 3;
    function countDown() {
        $('#timer').text(tick).css('color', 'aqua');
        tick -=1;

      if(tick === 0) {
        clearInterval(intervalID);
        setTimeout(function(){ $('#timer').text('Start!').css('color', 'lime'); },500);
        setTimeout(function(){ $('#timer').text('') }, 1200);
      }
    }
  }


  // instruction box
  $('#howToBtn').on('click', instruction);
  function instruction() {
    $('#howToBtn').off();
    $('body').append('<div id="wrapper"></div>');
    var $wrapper = $('#wrapper');
    $wrapper.draggable();                   // instruction box draggable

    $wrapper.velocity({ left: "320px"},     // how to play btn animation
      { duration: 200, easing: "linear"});

    $wrapper.append('<button id="wrapperBack" class="hvr-shrink">Back</button>');
    $wrapper.append('<h3>Instructions:</h3>');
    $wrapper.append('<p id="p1">Avoid hitting the wall and yourself! Each time you eat food your snakes length and speed increases. Try to score 200 points!</p>');
    $wrapper.append('<p id="p3">Player 2 direction keys:</p>');
    $wrapper.append('<p id="p4">Player 1 direction keys:</p>');
    $wrapper.append('<div id="arrows"></div>');


    // back btn animation
    $('#wrapperBack').on('click', function() {
      $('#howToBtn').on('click', instruction);
      $wrapper.velocity({ left: "2000px"},
      { duration: 200, easing: "linear"});
      setTimeout(function(){ $wrapper.remove(); },500);
    });

  }




});