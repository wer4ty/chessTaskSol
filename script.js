var chess, board, depth_think, turn, moveCounter = 0, timer;

game = new Chess();

board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});


function findSolution() {

	let num_moves = $("#search-depth").val();
	
  depth_think = parseInt(num_moves);
  
  if (moveCounter % 2 == 0) turn = 'w'; else turn = 'b';
   var tmp  =board.position('fen')+' '+turn+' KQkq - 0 1';
   //var tmp  =board.position('fen')+' '+turn;
   game.load(tmp);
  
  var makeRandomMove = function() {
  var possibleMoves = game.moves();

  // exit if the game is over
  if (game.game_over() === true ||
    game.in_draw() === true ||
    possibleMoves.length === 0) return;

  var randomIndex = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIndex]);
  board.position(game.fen());

  window.setTimeout(makeRandomMove, 500);
};

window.setTimeout(makeRandomMove, 500);
  
  
  
  /*
  console.log("Board Current position: "+board.fen());
   console.log("Algorithm Current position: "+game.fen());

    console.log("in_check ["+game.in_check()+"]");
    console.log("in_checkmate ["+game.in_checkmate()+"]");
    console.log("in_draw ["+game.in_draw()+"]");

   console.log("Is game over ["+game.game_over()+"]");	
	*/

	/*
   
   if (moveCounter % 2 == 0) turn = 'w'; else turn = 'b';
   var tmp  =board.position('fen')+' '+turn+' KQkq - 0 1';
   chess.load(tmp);


     statusCall();
	var newGameMoves;
     //for (var  i =0; i<depth_think; i++) {
        newGameMoves = chess.ugly_moves();
     //}
    
     

    if (game.game_over()) { alert('Game over');}
    else {
    		var bestMove = newGameMoves
    		game.ugly_move(bestMove[Math.floor(Math.random() * bestMove.length)]);
    		board.position(game.fen());
    }

	moveCounter++;
	*/
}

 





function clearTask() {
  board.clear();
  game.clear();

  
 // clearInterval(timer);
}


function start() {
findSolution();
	//timer = setInterval(findSolution, 1000);
}

$('#solve').on('click', start);
$('#clear').on('click', clearTask);
