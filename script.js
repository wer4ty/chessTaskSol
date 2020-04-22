var chess, board, depth_think, turn, move_turn, possibleMoves, resString;

game = new Chess();

board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});





function findSolution() {

    resString = '';

	//let tmp2 = '8/3K1p2/BN3B2/b1k5/1N6/2p1P3/2P5/8';
	//let tmp2 = '5K2/5P2/3krp2/R7/3p1pQ1/8/2R1PN2/8';

	//let tmp3 = 'k7/2K5/8/5Q2/8/8/8/8';

	//board.position(tmp2);



	

	depth_think = parseInt($("#search-depth").val());
	move_turn = parseInt($("#move-turn").val());
	
	turn = (move_turn % 2 == 0) ? 'w' : 'b';
   let tmp  = board.position('fen')+' '+turn+' KQkq - 0 1';
   game.load(tmp);

   //let res = recursiveSolving(depth_think, 0, []);
   let res = iterativeSolution();

   if (res && res.length > 0) { 
	   
    let readible = recursivePrint(res);
    console.log(readible);
   	$('#res').html(readible);
   }

   else {
	$('#res').text('No solution.');   
   }

   $('#res').fadeIn();

  
  
 

}

// 2 moves max only solve for now
function iterativeSolution() {
	let solution = [];


	// 1 move 
	if (depth_think == 1) {
		allMoves();

		possibleMoves.forEach(move => {
			if (move.includes('#')) {
				solution.push(move);
			}
		});
		return solution;
	}

	// 2 move
	let firstMoves = [];
	if (depth_think == 2) {
		firstMoves = allMoves();
		for(let i =0; i<firstMoves.length; i++) {
			

			// 1 first move
			solution.push("1."+firstMoves[i]);
			game.move(firstMoves[i]);
			visual();


			// 2 check all opponent responses
			allMoves();
			let response, opponentsMoves = possibleMoves, possibleSolution = [];
			
			if (!opponentsMoves || opponentsMoves.length == 0) {
				solution.pop();
				game.undo;
				visual();
				continue;
			}

			for (let j=0; j<opponentsMoves.length; j++) {
				response = opponentsMoves[j];
				game.move(response);
				visual();



				// 3 check if we have a checkmate (even if only option it enough)
				allMoves();
				let lastMoveSolution = []
				possibleMoves.forEach(move => {
					if (move.includes('#')) {
						lastMoveSolution.push(move);
					}
				});

				// 4 Not found checkmates in current state => rollback
				if (lastMoveSolution.length == 0) {
					// two undo to start from begin with next solution
					game.undo();
					game.undo();
					visual();
					allMoves();
					
					// clear solution array
					solution.pop();

					break; // break opponent moves loop
				}

				// 5 Found solution for all possible opponent moves so its a solution of task
				if (lastMoveSolution.length > 0) {
					possibleSolution.push('2.'+response+' - '+lastMoveSolution[0]);
					game.undo();
					visual();


					// if checked all option so we found solution
					if (j == opponentsMoves.length-1) {
						solution.push(possibleSolution);
						return solution;
					}

				}

			}

		}

	}
}

/*
function recursiveSolving(depth, moveIndex, solutions) {
	if (depth == 0)
		return solutions;


	// get all possible moves
	allMoves();	

	// checkmate in 1 move
	if (depth == 1) {

		lastMoveSolution = []
		possibleMoves.forEach(move => {
			if (move.includes('#')) {
				lastMoveSolution.push(move);
			}
		});

		
		if (lastMoveSolution.length > 0) {
			return solutions.push(lastMoveSolution);
		}
		else {
			console.log('depth = '+depth+' moveIndex = '+moveIndex);
			moveIndex++;
			

		// rollback game state
		for (let i =0; i < (depth_think - 1) * 2; i++) {  game.undo(); }
		moveIndex++;

		}
	}

	else {

		let move;
		if (game.turn() == turn) {
			move = game.move(possibleMoves[moveIndex]);
			console.log(move);
			--depth;
			
		}

		else {
			for (let i =0; i < possibleMoves.length; i++) {
				game.move(possibleMoves[i]);
				console.log(move);
			}
		}
		recursiveSolving(depth, moveIndex, solutions);
	}

}
*/


// controls functions
async function visual() {
	//await setTimeout(() => {}, 2000);
	//board.position(game.fen().split(' ')[0]);
}

function recursivePrint(solution) {

    if (Array.isArray(solution)) {
		solution.forEach(s => {
            (Array.isArray(s)) ?  resString+='\t' : resString+='' ;
             recursivePrint(s);
		});
    }

      resString+= solution+'<br>'; 

}

function allMoves() {
	possibleMoves = removeOOO(game.moves());
	let localArray = possibleMoves;
	//console.log(JSON.parse(JSON.stringify(possibleMoves)));
	return localArray;
 }

function removeOOO(arr) {
	let j1 = arr.indexOf("O-O");
  if(j1 != -1 ) { arr.splice(j1, 1); }
  let j2 = arr.indexOf("O-O-O");
   if(j2 != -1 ) { arr.splice(j1, 1); }
   
   return arr;
}


function clearTask() {
  board.clear();
  game.clear();
  $('#res').fadeOut();

   
}

function stop() {
	$('#res').fadeOut();
}


function start() {
	findSolution()
}

$('#solve').on('click', start);
$('#clear').on('click', clearTask);
$('#stop').on('click', stop);
