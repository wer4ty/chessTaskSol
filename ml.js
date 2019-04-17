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
    let best = 0;
    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i];
        console.log("1. "+newGameMove);
        game.move(newGameMove);
        var value = Math.max(best, minimax(depth - 1, game, !isMaximisingPlayer));

        game.undo();
        
        if (value >= best) {
        best = value;
        bestMoveFound = newGameMove;
        }
        
    }
    return bestMoveFound;
};



// STEP 5 OPTIMIZE MINMAX Algoriths 

var minimax = function (depth, game, isMaximisingPlayer) {	
    if (depth === 0) {
    
        var c = 0;
        
        var newGameMoves = removeOOO(game.moves());
         for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            
            if (game.game_over()) {
            console.log("\t2. "+newGameMoves[i]);
            c++;
         	}
         	
            game.undo();
        }
        return c;
    }

    var newGameMoves = removeOOO(game.moves());
    
	 for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            minimax(depth - 1, game, !isMaximisingPlayer);
            game.undo();
        }
    return 0;
    
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


