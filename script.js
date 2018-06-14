var pos, fen, chess;

var board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});


function findSolution() {
   pos = board.position();
   fen = board.fen();
   
   tmp_fen = '8/8/6Q1/4K3/8/8/3k4/8';
   chess = new Chess(tmp_fen);
   board.fen(tmp_fen);
   
   console.log(chess.ugly_moves());
   console.log(chess.game_over());
   console.log(chess.fen());

}

$('#solve').on('click', findSolution);