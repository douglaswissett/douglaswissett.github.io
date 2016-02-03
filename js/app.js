$(function(){
 


  var $gamebox = $('#gamebox');
  var snake = ['10_8','10_7','10_6']; // array to hold snake 
  var tail;
  var head;
  var speed = 200;
  var direction = 2;
  var score = 0;



  //keydown listener
  $(document).keydown(function(e){
    var dir = e.keyCode;

    switch(dir) {
      case 38:
        if(direction === 3) return;
          direction = 1;
          console.log('Up!');
        break;
      case 39:
        if(direction === 4) return;
        direction = 2;
        console.log('Right!');
        break;
      case 40:
        if(direction === 1) return;
        direction = 3;
        console.log('Down!');
        break;
      case 37:
        if(direction === 2) return;
        direction = 4;
        console.log('Left!');
        break;
      default:
        direction;
    }
  });

  function buildCells() {
    for(var i = 0; i < 30; i++) {
      for(var j = 0; j < 30; j++) {
        $gamebox.append('<div class="cell" id='+i+'_'+j+'></div>');
      }
    }
  }    

  function buildSnake() {
    $('#10_8').addClass('cellSnake');
    $('#10_7').addClass('cellSnake');
    $('#10_6').addClass('cellSnake');
  }

  function generateFood() {
    var x = Math.floor(Math.random() * 29);
    var y = Math.floor(Math.random() * 29);

    $('#'+ x +'_'+ y).addClass('cellFood');
    food = x +'_'+ y;
  }

  function removeTail() {
    tail = snake.pop();
    $('#'+tail).removeClass('cellSnake');
  }

  function moveSnake() {
    var oldHead = snake[0];
    var newHead = oldHead.split('_');
    row = +(newHead[0]);     // 10
    col = +(newHead[1]);     // 8

    switch(direction) {
      case 1:
          row = row-1;
        break;
      case 2:
        col = col+1;
        break;
      case 3:
        row = row+1;
        break;
      case 4:
        col = col-1;
        break;
    }
    head = row +'_'+ col;
    snake.unshift(head);
    $('#'+head).addClass('cellSnake');
  }

  function checkForEat() {
    if(head === food) {
      snake.push(tail);
      $('#'+tail).addClass('cellSnake');
      $('#'+food).removeClass('cellFood');
      generateFood();
      score++;
    }
  }

  function checkHit() {

    if(row < 0 || col < 0 || row > 30 || col > 30) {
      console.log('dead!');
      alert('You deeeeeed!');
      clearScreen();
      clearTimeout(timerId);
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
  }





// TODO
// 
// - implement self hit detection
// - add highscore feature
// - 2 player feature
// - difficulty level












  var timerId;
  function refresh() {
    game.update();
  }

  // game logic
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
      $('#scoreboard').text('Score: ' + score);
      checkHit();

      if(checkHit()) return;
      timerId = setTimeout(refresh, speed);
    }
  };

  // init game
  game.startGame();  
});



