function removeOOO(arr) {
	let j1 = arr.indexOf("O-O");
  if(j1 != -1 ) { arr.splice(j1, 1); }
  let j2 = arr.indexOf("O-O-O");
   if(j2 != -1 ) { arr.splice(j1, 1); }
   
   return arr;
}

var minimaxRoot =function(depth, game, isMaximisingPlayer) {

    var newGameMoves = removeOOO(game.moves());
    console.log(newGameMoves);
    
    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i];
        console.log("1. "+newGameMove);
        game.move(newGameMove);
        var value = minimax(depth - 1, game, !isMaximisingPlayer);

        game.undo();
        
        bestMoveFound = newGameMove;
        
    }
    return bestMoveFound;
};



// STEP 5 OPTIMIZE MINMAX Algoriths 

var minimax = function (depth, game, isMaximisingPlayer) {	
    if (depth === 0) {
        return 0;
    }

    var newGameMoves = removeOOO(game.moves());
    console.log(newGameMoves);

	 for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            console.log("\t2. "+newGameMoves[i]);
            minimax(depth - 1, game, !isMaximisingPlayer);
            game.undo();
        }
    return 1;
    
};




var getBestMove = function (game) {
	/*
    if (game.game_over()) {
        alert('Game over');
    }
    */
    
    var bestMove = minimaxRoot(2, game, true);

    return bestMove;
};


