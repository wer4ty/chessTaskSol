var pos, fen;

var board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});


function clickGetPositionBtn() {
  console.log("Current position as an Object:");
  pos = board.position();
  console.log(pos);

  console.log("Current position as a FEN string:");
  fen = board.fen();
  console.log(fen);
}

$('#getPositionBtn').on('click', clickGetPositionBtn);
$('#clearBtn').on('click', board.clear);

$('#setRuyLopezBtn').on('click', function() {
  board.position(fen);
});