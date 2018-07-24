var chess, board, randMove, gameMoves, turn, moveCounter = 0;

board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});


function findSolution() {  
   chess = new Chess();
   if (moveCounter % 2 == 0) turn = 'w'; else turn = 'b';
   var tmp  =board.position('fen')+' '+turn+' KQkq - 0 1';
   //console.log(chess.validate_fen(tmp));
   chess.load(tmp);
   gameMoves = chess.ugly_moves();
   randMove = gameMoves[Math.floor(Math.random() * gameMoves.length)]

     statusCall();

    chess.ugly_move(randMove);
    board.position(chess.fen());

    moveCounter++;


   
}



function clearTask() {
  board.clear();
  chess.clear();

  statusCall();
}

function statusCall() {

  console.log("Board Current position: "+board.fen());
   console.log("Algorithm Current position: "+chess.fen());

   console.log("in_check ["+chess.in_check()+"]");
   console.log("in_checkmate ["+chess.in_checkmate()+"]");
   console.log("in_draw ["+chess.in_draw()+"]");
   console.log("=======================\nAll MOVES: \n");
   console.log(gameMoves);
   console.log("----------------------------\nSelect Move: \n");
   console.log(randMove);
   //console.log("Is game over ["+chess.game_over()+"]");

    console.log("----------------------------\nDone !: \n");

}

$('#solve').on('click', findSolution);
$('#clear').on('click', clearTask);