$(function(){
 
  var $gamebox = $('#gamebox');



  function buildCells() {

    for(var i = 0; i < 40; i++) {
      for(var j = 0; j < 40; j++) {
        $gamebox.append('<div class="cell" id= i + "_" + j ></div>');
      }
    }
  }    







  buildCells();

});



