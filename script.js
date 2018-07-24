var chess, board, depth_think, turn, moveCounter = 0;

board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});


function findSolution() {
  depth_think = 2;

   chess = new Chess();
   if (moveCounter % 2 == 0) turn = 'w'; else turn = 'b';
   var tmp  =board.position('fen')+' '+turn+' KQkq - 0 1';
   chess.load(tmp);


     statusCall();

     for (var  i =0; i<depth_think; i++) {

        var newGameMoves = chess.ugly_moves();

     }

}

// var minimaxRoot =function(depth, game, isMaximisingPlayer) {

//     var newGameMoves = game.ugly_moves();
//     var bestMove = -9999;
//     var bestMoveFound;

//     for(var i = 0; i < newGameMoves.length; i++) {
//         var newGameMove = newGameMoves[i];
//         game.ugly_move(newGameMove);
//         var value = minimax(depth - 1, game, !isMaximisingPlayer);

//         game.undo();
        
//         if(value >= bestMove) {
//             bestMove = value;
//             bestMoveFound = newGameMove;
//         }
//     }
//     return bestMoveFound;
// };


// var minimax = function (depth, game, isMaximisingPlayer) {
//     if (depth === 0) {
//         return -evaluateBoard(game.board());
//     }

//     var newGameMoves = game.ugly_moves();

//     if (isMaximisingPlayer) {
//         var bestMove = -9999;
//         for (var i = 0; i < newGameMoves.length; i++) {
//             game.ugly_move(newGameMoves[i]);
//             bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
//             game.undo();
//         }
//         return bestMove;
//     } else {
//         var bestMove = 9999;
//         for (var i = 0; i < newGameMoves.length; i++) {
//             game.ugly_move(newGameMoves[i]);
//             bestMove = Math.min(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
//             game.undo();
//         }
//         return bestMove;
//     }
// };


function clearTask() {
  board.clear();
  chess.clear();

  statusCall();
}

function statusCall() {

  console.log("Board Current position: "+board.fen());
   console.log("Algorithm Current position: "+chess.fen());

   // console.log("in_check ["+chess.in_check()+"]");
   // console.log("in_checkmate ["+chess.in_checkmate()+"]");
   // console.log("in_draw ["+chess.in_draw()+"]");

   //console.log("Is game over ["+chess.game_over()+"]");


}

$('#solve').on('click', findSolution);
$('#clear').on('click', clearTask);