import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  showResult: boolean = false;
  board: any;
  game: any;
  move_turn: number;
  result: string = '';
  depth_think: number;
  possibleMoves: any;

  @ViewChild('searchDepth') depth_think_selector;
  @ViewChild('moveTurn') move_turn_selector;

  constructor() {}

  ngOnInit() {


    this.game = new Chess();
    this.board = ChessBoard('board', {
      draggable: true,
      dropOffBoard: 'trash',
      sparePieces: true
    });

  }

  start() {
    this.findSolution();
  }

  stop() {
    this.result = '';
    this.showResult = false;
  }

  clear() {
    this.board.clear();
    this.game.clear();
    this.result = '';
    this.showResult = false;
  }



  findSolution() {
    let  turn, move_turn;
   
    this.depth_think = parseInt(this.depth_think_selector.nativeElement.value);
    move_turn = parseInt(this.move_turn_selector.nativeElement.value);
    
    turn = (move_turn % 2 == 0) ? 'w' : 'b';
     let tmp  = this.board.position('fen')+' '+turn+' KQkq - 0 1';
     this.game.load(tmp);
  
     
     let res = this.iterativeSolution();
  
     if (res && res.length > 0) {
  
       let prettyViewText = '';
      res.forEach(r => {
  
          if (Array.isArray(r)) {
              r.forEach(r2 => {
                r2 = (Array.isArray(r2)) ? r2.join('') : r2;
              })
  
  
              prettyViewText += '<ul>'+r.join('')+'</ul>'; 
          }
          else prettyViewText += '<b>'+r+'</b><br>';
  
      });
  
      console.log(res);   	 
      this.result = prettyViewText;   
   
     }
  
     else {
      this.result = 'No solution.';   
     }
  
     this.showResult = true;
  
    
    
   
  
  }
  

  iterativeSolution() {
    let solution = [];
  
  
    // 1 move 
    if (this.depth_think == 1) {
      this.allMoves();
  
      if (!this.possibleMoves || this.possibleMoves.length == 0)
          return solution;
  
          this.possibleMoves.forEach(move => {
        if (move.includes('#')) {
          solution.push(move);
        }
      });
      return solution;
    }
  
    // 2 move
    let firstMoves = [];
    if (this.depth_think == 2) {
      firstMoves = this.allMoves();
  
          if (!this.possibleMoves || this.possibleMoves.length == 0)
          return solution;
  
  
      for(let i =0; i<firstMoves.length; i++) {
        
  
        // 1 first move
  
              // skip checkmate at first move
              if (firstMoves[i].includes('#')) 
                  continue;
  
        solution.push("1."+firstMoves[i]);
        this.game.move(firstMoves[i]);
  
  
        // 2 check all opponent responses
        this.allMoves();
        let response, opponentsMoves = this.possibleMoves, possibleSolution = [];
        
        if (!opponentsMoves || opponentsMoves.length == 0) {
          solution.pop();
          this.game.undo;
          continue;
        }
  
        for (let j=0; j<opponentsMoves.length; j++) {
          response = opponentsMoves[j];
          this.game.move(response);
  
  
  
          // 3 check if we have a checkmate (even if only option it enough)
          this.allMoves();
          let lastMoveSolution = []
          this.possibleMoves.forEach(move => {
            if (move.includes('#')) {
              lastMoveSolution.push(move);
            }
          });
  
          // 4 Not found checkmates in current state => rollback
          if (lastMoveSolution.length == 0) {
            // two undo to start from begin with next solution
            this.game.undo();
            this.game.undo();
            this.allMoves();
            
            // clear solution array
            solution.pop();
  
            break; // break opponent moves loop
          }
  
          // 5 Found solution for all possible opponent moves so its a solution of task
          if (lastMoveSolution.length > 0) {
            possibleSolution.push('<li>2.'+response+' - '+lastMoveSolution[0]+'</li>');
            this.game.undo();
  
  
            // if checked all option so we found solution
            if (j == opponentsMoves.length-1) {
              solution.push(possibleSolution);
              possibleSolution = [];
              this.game.undo();
            }
  
          }
  
        }
  
      }
  
      return solution;
    }
  
    if (this.depth_think == 3) {
    
  
  
              firstMoves = this.allMoves();
  
          if (!this.possibleMoves || this.possibleMoves.length == 0)
          return solution;
  
  
          let initialState = this.game.fen();
      for(let i =0; i<firstMoves.length; i++) {
        
  
        // 1 first move
  
              // skip checkmate at first move
              if (firstMoves[i].includes('#')) 
                  continue;
  
        solution.push("1."+firstMoves[i]);
        this.game.move(firstMoves[i]);
  
  
        // 2 check all opponent responses
        this.allMoves();
        let response, opponentsMoves = this.possibleMoves, possibleSolution = [];
        
        if (!opponentsMoves || opponentsMoves.length == 0) {
          solution.pop();
          this.game.undo;
          continue;
        }
  
              // save current state
              let stateBeforeOppenentReact = this.game.fen();
  
        for (let j=0; j<opponentsMoves.length; j++) {
          response = opponentsMoves[j];
          solution.push("<li> >> "+response+"</li>");
          this.game.move(response);
  
                  
  
                  // reduction to simpler problem 
                  this.depth_think > 2 ? this.depth_think-- : this.depth_think; // 2 steps instead 3
                  possibleSolution = this.iterativeSolution();
  
                  // there is solution
                  if (possibleSolution.length > 0) {
                      solution.push(possibleSolution);
                      this.game.load(stateBeforeOppenentReact);
                  }
  
                  // there is no solution
                  else {
                    solution.pop();
                    solution.pop();
                    this.game.load(initialState);
  
                  }
  
        }
  
      }
  
  
  
  
  
  
          return solution;
    }
  }
  
  
  
  allMoves() {
  
      // empty board
      if (this.game.fen().split(' ')[0] == '8/8/8/8/8/8/8/8')
          return
  
          this.possibleMoves = this.removeOOO(this.game.moves());
    let localArray = this.possibleMoves;
    //console.log(JSON.parse(JSON.stringify(possibleMoves)));
    return localArray;
   }
  
  removeOOO(arr) {
  
      if (!arr || arr.length == 0)
      return arr;
  
    let j1 = arr.indexOf("O-O");
    if(j1 != -1 ) { arr.splice(j1, 1); }
    let j2 = arr.indexOf("O-O-O");
     if(j2 != -1 ) { arr.splice(j1, 1); }
     
     return arr;
  }






}
