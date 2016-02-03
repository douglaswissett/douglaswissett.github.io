//**********************************************************************
//
//  AUTHOR    - DOUGLAS WISSETT WALKER
//  DATE      - 02/02/2016
//  VERSION   - 2.1.1
//  PREVIOUS  - 1.0.4
//
//  REFERENCES: UiTutorial to help moveSnake logic 
//
//**********************************************************************



// TODO
// 
// - implement self hit detection   - 
// - add highscore feature          - highscore not updating, buggy
// - 2 player feature               - fixed
// - difficulty level               - 
//
//





$(function(){
 
  var $container = $('#container');
  //var $gamebox = $('#gamebox');
  var running = false;
  var speed = 100;
  var highscore = 0;

  var snake = ['10_8','10_7','10_6']; // array to hold snake 
  var tail;
  var head;
  var direction = 'right';
  var score = 0;


  var snake2 = ['10_28','10_29','10_30']; // array to hold snake2 
  var tail2;
  var head2;
  var direction2 = 'left';
  var score2 = 0;



  //keydown listener
  $(document).keydown(function(e){
    var dir = e.keyCode;


    // player 1 directions
    switch(dir) {
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
    switch(dir) {
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

  function buildCells() {
    $gamebox = $('#gamebox');

    for(var i = 0; i < 30; i++) {
      for(var j = 0; j < 30; j++) {
        $gamebox.append('<div class="cell" id='+i+'_'+j+'></div>');
      }
    }
  }    

  function buildSnake() {
    // render snake 1
    $('#10_8').addClass('snake');
    $('#10_7').addClass('snake');
    $('#10_6').addClass('snake');
    // render snake 2
    $('#10_28').addClass('snake2');
    $('#10_29').addClass('snake2');
    $('#10_30').addClass('snake2');
  }

  function generateFood() {
    // generate random number between 0-29 for x & y coordinates
    var x = Math.floor(Math.random() * 29);
    var y = Math.floor(Math.random() * 29);
    // query generated position, add food css to that div
    $('#'+ x +'_'+ y).addClass('food');
    // store food's position to check for detection later
    food = x +'_'+ y;
  }

  function removeTail() {
    // removes snake tail
    tail = snake.pop();
    $('#'+tail).removeClass('snake');

    tail2 = snake2.pop();
    $('#'+tail2).removeClass('snake2');
  }

  function moveSnake() {
    // grab snake head, get x & y position
    var newHead = snake[0].split('_');
    row = +(newHead[0]);  // 10
    col = +(newHead[1]);  // 8
    // depending on current direction, calculate next movement
    switch(direction) {
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
    // add new head position to snake array
    head = row +'_'+ col;
    snake.unshift(head);
    $('#'+head).addClass('snake');

    // grab snake2 head, get x & y position
    var newHead2 = snake2[0].split('_');
    row2 = +(newHead2[0]);  // 10
    col2 = +(newHead2[1]);  // 28
    // depending on current direction, calculate next movement
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
    // add new head position to snake array
    head2 = row2 +'_'+ col2;
    snake2.unshift(head2);
    $('#'+head2).addClass('snake2');
  }

  function checkForEat() {
    if(head === food) {
      snake.push(tail);
      $('#'+tail).addClass('snake');
      $('#'+food).removeClass('food');
      generateFood();
      score++;
    }
    if(head2 === food) {
      snake2.push(tail2);
      $('#'+tail2).addClass('snake2');
      $('#'+food).removeClass('food');
      generateFood();
      score2++;
    }
  }

  function checkHit() {

    // player 1 wall collision detection
    if(row < 0) {
      clearScreen();
      clearTimeout(timerId);
      if(score > highscore) { highscore = score; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    } else if(col < 0) {
      clearScreen();
      clearTimeout(timerId);
      if(score > highscore) { highscore = score; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    } else if(row > 30) {
      clearScreen();
      clearTimeout(timerId);
      if(score > highscore) { highscore = score; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    } else if(col > 30) {
      clearScreen();
      clearTimeout(timerId);
      if(score > highscore) { highscore = score; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    }

    // player 2 wall collision detection
    if(row2 < 0) {
      clearScreen();
      clearTimeout(timerId);
      if(score2 > highscore) { highscore = score2; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    } else if(col2 < 0) {
      clearScreen();
      clearTimeout(timerId);
      if(score2 > highscore) { highscore = score2; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    } else if(row2 > 30) {
      clearScreen();
      clearTimeout(timerId);
      if(score2 > highscore) { highscore = score2; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    } else if(col2 > 30) {
      clearScreen();
      clearTimeout(timerId);
      if(score2 > highscore) { highscore = score2; }
      var $message = $gamebox.append('<div id="gameMessage">'+'Player1 scored: '+score+'</div>');
      var $message = $gamebox.append('<div id="gameMessage2">'+'Player2 scored: '+score2+'</div>');

      return true;
    }
  }

  // clear game window 
  function clearScreen() {
    for(var i = 0; i < 30; i++) {
      for(var j = 0; j < 30; j++) {
        $('#'+i+'_'+j).removeClass();
      }
    }
    $gamebox.text('Game Over!');
    running = false;


    function shrink(){
      // game over animations
      $gamebox.velocity({ height: 0 })
      .velocity({width:0});
      $()
      $('#gameMessage').remove();
      $('#gameMessage2').remove();
      $gamebox.text('');
    }
    setTimeout(shrink,1600);
    setTimeout(function(){$('#gamebox').remove()},2450);
  }







//
//
//    GAME LOGIC
//
//


  // timeout ID
  var timerId;
  // game refresh
  function refresh() {
    game.update();
  }

  var game = {

    startGame: function() {
      buildCells();
      buildSnake();
      generateFood(); 

      timerId = setTimeout(refresh, speed);
    },

    update: function() {
      removeTail();
      moveSnake();
      checkForEat();
      checkHit();

      $('#scoreboard').text('Highscore: ' + highscore);

      // if checkHit === true, stop game
      if(checkHit()) {
        
        setTimeout(function(){$container.append("<div id='gamebox'></div>")}, 4000);
        return;
      }
      
      timerId = setTimeout(refresh, speed);
    }
  };


  // init game
  function callGame() {
    if(running) return;
    running = true;
    


    // guarded
    game.startGame();
  }





callGame();

  // ***********************     TESTING      // ***********************





  $('#nextGame').on('click',function(){

    buildCells();
    buildSnake();
    generateFood();


    snake = ['10_8','10_7','10_6']; // array to hold snake 
    tail = null;
    head = null;
    direction = 'right';
    score = score;
    snake2 = ['10_28','10_29','10_30']; // array to hold snake2 
    tail2 = null;
    head2 = null;
    direction2 = 'left';
    score2 = score2;

    timerId = setTimeout(refresh, speed);

  });











  // beta
  function slide() {
    $container.velocity({
      left: "0px",
    }, {
      duration: 200, 
      easing: "linear"
    });
  }

  // $('#newGame').on('click', function() {

  //   slide();
  //   $container.velocity({ width: 540 }, [ 250, 15 ]);
  //   setTimeout(callGame, 500); 

  // });










});



