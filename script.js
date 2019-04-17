var chess, board, depth_think, turn, move_turn, moveCounter, timer;

game = new Chess();

board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});

// tmp
let tmp2 = '8/3K1p2/BN3B2/b1k5/1N6/2p1P3/2P5/8';
	board.position(tmp2);
	moveCounter = 0;
  if (moveCounter % 2 == 0) turn = 'w'; else turn = 'b';
   var tmp  = board.position('fen')+' '+turn+' KQkq - 0 1';
   game.load(tmp);
	

function removeOOO(arr) {
	let j1 = arr.indexOf("O-O");
  if(j1 != -1 ) { arr.splice(j1, 1); }
  let j2 = arr.indexOf("O-O-O");
   if(j2 != -1 ) { arr.splice(j1, 1); }
   
   return arr;
}


function findSolution() {
var solve = [];
var bestMove = getBestMove(game, solve);
    game.move(bestMove);
    board.position(game.fen());
   
   
   console.log(solve);
   
    if (game.game_over()) {
        alert('Game over');
    }

}

// recurcive
/*
function findSolution(depth) {

	if (depth % 2 == 0) turn = 'w'; else turn = 'b';
   	var tmp_pos  = board.position('fen')+' '+turn+' KQkq - 0 1';
   	game.load(tmp_pos);

	// base
	if (depth == 2) {
	
		let moves = game.moves();
		moves = removeOOO(moves);
		for(let i=0; i<moves.length; i++) {
			
			game.move(moves[i]);
			if (game.game_over() === true) {
				console.log(moves[i]);
			}
			else {
			game.undo();
			}
			
		}
	
		return;
	}
	
	else {
	
		
   	
		let moves = game.moves();
		moves = removeOOO(moves);
		//console.log(moves);		
		//console.log("\n");
		for(let i=0; i<moves.length; i++) {
			let m = moves[i];
			//console.log(m);
			game.move(moves[i]);
			board.position(game.fen());
			findSolution(++depth);
			game.undo();
		}
	}
	// recusion

}
*/

/*  // iterative
function findSolution() {

	let tmp2 = '8/3K1p2/BN3B2/b1k5/1N6/2p1P3/2P5/8';
	board.position(tmp2);
	console.log(board.position('fen'));

	//depth_think = parseInt($("#search-depth").val());
	//move_turn = parseInt($("#move-turn").val());
	
	move_turn = 0;
	
  moveCounter = move_turn;
  if (moveCounter % 2 == 0) turn = 'w'; else turn = 'b';
   var tmp  = board.position('fen')+' '+turn+' KQkq - 0 1';
   game.load(tmp);
  
  
  
  // first white move
  var possibleMoves = game.moves();
  removeOOO(possibleMoves);
  
  for (let i=0; i<possibleMoves.length; i++) {
  		
  		let solution = [];
  		
  		game.move(possibleMoves[i]);
  		solution.push(possibleMoves[i]);
  		
  		// Black answer (for all black moves shoud be checkmate)
  		var possibleMovesAnswer = game.moves();
  		removeOOO(possibleMovesAnswer);
  		
  		
  		let solArr = new Array(possibleMovesAnswer.length);
  		let solVec = new Array(possibleMovesAnswer.length);
  		
  		
  		for (let k = 0; k<possibleMovesAnswer.length; k++) {
  			solVec[k]=0;
  			game.move(possibleMovesAnswer[k]);
  			
  			// White move (which should finish game)
  			var possibleCheckMates = game.moves();
  			removeOOO(possibleCheckMates);
  			
  			console.log(possibleCheckMates);
  			
  			for (let j = 0; j<possibleCheckMates.length; j++) {
  				let move = possibleCheckMates[j];
  				game.move(move);
  				//if (game.game_over() === true) {
  				if (game.in_checkmate() === true) { 
  					solVec[k] = 1; 
  					solArr.push({'B': possibleMovesAnswer[k], 'W': possibleCheckMates[j]});
  					break;
  				}
  				
  				else {
  					solVec[k] = 0; 
  					game.undo();
  				}
  				
  			}
  			
  			game.undo();
  			
  		}
  		
  		
  		
  			
  			// check if all black moves exist white checkmate move
  			result = true;
  			for (let p=0; p<solVec.length; p++) {
  				if (solVec[p] == 0) {
  					result = false; // if exist one moves which white not find checkmate false
  					break;
  				}
  			}
  			
  			// if all moves of black white succesed to make checkmate -> generate solution 
  			if (result == true) {
  				solution.push(solArr);
  				return solution;
  			}
  			else  {
  				game.undo();
  			}
  		
  	}
  
 
 return false;
}
*/

 





function clearTask() {
  board.clear();
  game.clear();

   clearTimeout(timer);
}

function stop() {
	clearTimeout(timer);
}


function start() {
//console.log(findSolution());
findSolution(0);
	//timer = setInterval(findSolution, 1000);
}

$('#solve').on('click', start);
$('#clear').on('click', clearTask);
$('#stop').on('click', stop);
