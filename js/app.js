$(function(){
 


  var $gamebox = $('#gamebox');
  var snake = ['10_8','10_7','10_6']; // array to hold snake 
  var food;

  //keydown listener
  $(document).keydown(function(e){
    
    console.log(e);


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
    food = $('#'+ x +'_'+ y);
  }

  function removeTail() {
    var tail = snake.pop();
    $('#'+tail).removeClass('cellSnake');
  }

  function animateSnake(dir) {

    snake.unshift(dir);
    $('#'+dir).addClass('cellSnake');
    removeTail();
  }






  function direction() {
    var head = snake[0];
    var newHead;                // #10_9

  }




  // clear game window 
  function clearScreen() {
    for(var i = 0; i < 30; i++) {
      for(var j = 0; j < 30; j++) {
        $('#'+i+'_'+j).removeClass();
      }
    }
  }

  // game logic
  var game = {

    startGame: function() {
      buildCells();
      buildSnake();


      generateFood(); // this should be called on init + when food is eaten
    }

  };

  
  game.startGame();  


});



