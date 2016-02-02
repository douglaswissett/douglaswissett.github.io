$(function(){
 
  var $gamebox = $('#gamebox');



  function buildCells() {

    for(var i = 0; i < 30; i++) {
      for(var j = 0; j < 30; j++) {
        $gamebox.append('<div class="cell" id= i + "_" + j ></div>');
      }
    }
  }    















  var game = {

    startGame: function() {
      buildCells();
    }

  };

  
  game.startGame();  

});



