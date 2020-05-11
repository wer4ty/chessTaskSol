var chess, board, depth_think, turn, move_turn, possibleMoves, resString;

game = new Chess();

board = ChessBoard('board', {
  draggable: true,
  dropOffBoard: 'trash',
  sparePieces: true
});





function findSolution() {

   
	//let tmp2 = '8/3K1p2/BN3B2/b1k5/1N6/2p1P3/2P5/8';
	//let tmp2 = '5K2/5P2/3krp2/R7/3p1pQ1/8/2R1PN2/8';

	//let tmp3 = 'k7/2K5/8/5Q2/8/8/8/8';

	//board.position(tmp2);



	

	depth_think = parseInt($("#search-depth").val());
	move_turn = parseInt($("#move-turn").val());
	
	turn = (move_turn % 2 == 0) ? 'w' : 'b';
   let tmp  = board.position('fen')+' '+turn+' KQkq - 0 1';
   game.load(tmp);

   
   let res = iterativeSolution();

   if (res && res.length > 0) {

   	let prettyViewText = '';
    res.forEach(r => {

        if (Array.isArray(r)) { prettyViewText += '<ul>'+r.join('')+'</ul>'; }
        else prettyViewText += '<b>'+r+':</b><br>';

    });
   	 
	$('#res').html(prettyViewText);   
    console.log(res);
   	
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

		if (!possibleMoves || possibleMoves.length == 0)
		    return solution;

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

        if (!possibleMoves || possibleMoves.length == 0)
		    return solution;


		for(let i =0; i<firstMoves.length; i++) {
			

			// 1 first move
			solution.push("1."+firstMoves[i]);
			game.move(firstMoves[i]);


			// 2 check all opponent responses
			allMoves();
			let response, opponentsMoves = possibleMoves, possibleSolution = [];
			
			if (!opponentsMoves || opponentsMoves.length == 0) {
				solution.pop();
				game.undo;
				continue;
			}

			for (let j=0; j<opponentsMoves.length; j++) {
				response = opponentsMoves[j];
				game.move(response);



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
					allMoves();
					
					// clear solution array
					solution.pop();

					break; // break opponent moves loop
				}

				// 5 Found solution for all possible opponent moves so its a solution of task
				if (lastMoveSolution.length > 0) {
					possibleSolution.push('<li>2.'+response+' - '+lastMoveSolution[0]+'</li>');
					game.undo();


					// if checked all option so we found solution
					if (j == opponentsMoves.length-1) {
						solution.push(possibleSolution);
						possibleSolution = [];
						game.undo();
					}

				}

			}

		}

    return solution;
	}
}



function allMoves() {

    // empty board
    if (game.fen().split(' ')[0] == '8/8/8/8/8/8/8/8')
        return

	possibleMoves = removeOOO(game.moves());
	let localArray = possibleMoves;
	//console.log(JSON.parse(JSON.stringify(possibleMoves)));
	return localArray;
 }

function removeOOO(arr) {

    if (!arr || arr.length == 0)
    return arr;

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
