//**********************************************************************
//
//  AUTHOR    - DOUGLAS WISSETT WALKER
//  DATE      - 02/02/2016
//  VERSION   - 2.6.8
//  PREVIOUS  - 2.4.1
//
//  REFERENCES: UiTutorial to help moveSnake logic 
//
//**********************************************************************



// TODO
// 
// - implement self hit detection   - 
// - add highscore feature          - fixed 
// - 2 player feature               - fixed
// - difficulty level               - change speed settings
// - single player mode             - 
// - speed controls                 - added basic feature
//





$(function(){
 
  var $container = $('#container');
  var speed = $('#range').val();              // set game speed to input value
  var highscore = 0;
  var running = false;
        // Player 1 objects
  var snake = ['10_8','10_7','10_6'];         // array to hold snake 
  var tail;
  var head;
  var direction = 'right';
  var score = 0;
        // player 2 objects
  var snake2 = ['10_28','10_29','10_30'];     // array to hold snake2 
  var tail2;
  var head2;
  var direction2 = 'left';
  var score2 = 0;

  function reset() {                         // reset game variables to default
    snake = ['10_8','10_7','10_6'];
    tail = null;
    head = null;
    direction = 'right';
    score = score;
    snake2 = ['10_28','10_29','10_30'];
    tail2 = null;
    head2 = null;
    direction2 = 'left';
    score2 = score2;  
  }


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
        direction;
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
        direction2;
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

  function buildSnake() {                     // render snake 1 & 2 at starting position
    $('#10_8').addClass('snake');
    $('#10_7').addClass('snake');
    $('#10_6').addClass('snake');
    $('#10_28').addClass('snake2');
    $('#10_29').addClass('snake2');
    $('#10_30').addClass('snake2');
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

    // Player 2 moveSnake code block
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
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');
      return true; // return true to end game
    }                         // player 2 wall collision detection
    if(row2 < 0 || col2 < 0 || row2 > 30 || col2 > 30) {
      gameOver();
      clearTimeout(timerId);
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');
      return true;
    }

    // self hit detection       TODO

  }

  function addScore() {               // check score, set highscore
    if(score > score2) {              
      if(score > highscore){ highscore = score; }
    } else if(score2 > score) {
      if(score2 > highscore){ highscore = score2; }
    }
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
    setTimeout(shrink,2500);              // animate container after 2500ms
    setTimeout(function(){$('#gamebox').remove()},3340); // remove container after 3340ms     ( Game finish )
    setTimeout(function(){    
      $container.velocity({ top: "-1000px"},
      { duration: 200, easing: "linear"});
    }, 3600);
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
      generateFood(); 
      timerId = setTimeout(refresh, speed);
    },                          // function to update game 
    update: function() {
      removeTail();
      moveSnake();
      checkForEat();
      checkHit();
      addScore();
      $('#scoreboard').text('Highscore: ' + highscore);

      if(checkHit()) return;  // if checkHit === true, stop game
      timerId = setTimeout(refresh, speed);
    }
  };
  
  function callGame() {       // Initialise function
    if(running) return;
    running = true;  // if game still running, don't startGame()
    game.startGame();
  }

  //        START GAME BUTTON
  $('#newGame').on('click', function() {              // start game on button click
    if(running) return;                               // ignore if game already running
    if($('#gamebox').length === 0 ) {                 // create another gamebox 
      $container.append("<div id='gamebox'></div>");  // reset game objects to default
    }
    reset();
    // test animation below
    slide();
    $container.velocity({ width: 540 }, [ 250, 15 ]);
    setTimeout(callGame, 500); 
  });












  // ***********************     TESTING      // ***********************


  // speed controls
  var $range = $('#range');
  $('#range').on('change', function(e){
    speed = $range.val();
  });





  // beta animations

  function slide() {
    $container.velocity({ top: "0px"},
    { duration: 200, easing: "linear"});
  }


//$container.velocity({ opacity: 0,top: "-50%" }, 
  //{ display: "none" });

    // setTimeout(function(){    
    //   $container.velocity({ top: "-1000px"},
    //   { duration: 200, easing: "linear"});
    // }, 3600);





});