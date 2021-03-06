console.log("JS Main Linked");


// PART 1:
//JS backend

const tictactoegame = {

  gamePlayRecord: [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
  ], //end gamePlayRecord

  //onGoingScoreBoard in use if chosen 'play again'
  scoreBoard: {
    Player1: 0,
    Player2: 0,
  },

  //keep a record of which win combination won
  winCriteria: [
    false,  //top-horizontal
    false,  //middle-horizontal
    false,  //bottom-horizontal
    false,  //left-vertical
    false,  //middle-vertical
    false,  //right-vertical
    false, //topLeft-diagonal
    false,  //topRight-diagonal
  ],

  winCriteriaCalc: function() {
    for (let i =0; i < this.winCriteria.length; i++) {
      if (this.winCriteria[i] === "true") {
        $('#strike-out' + i).css({'visibility': 'visible' });//activate the red line in the right spot based
      } //end if
      else {
        $('#strike-out' + i).css({'visibility': 'hidden' });
      }
    } //end for
  }, //end winCriteriaCalc function - this includes turning on CSS

  // player1Name: '',
  // player2Name: '',
  clickCounter: 0, //record of valid squares played
  turnCounter: 'Player 1', //record of player turn currently
  drawChecker: 'false', //record of draw
  winner: 'none', //record of winner

  //check for a draw
  drawCheck: function () {
  if (tictactoegame.clickCounter === 9 &&
    tictactoegame.winner === 'none') {
    tictactoegame.drawChecker = 'true';
  }}, // end draw check

  turnNotification: function () {
    if(this.winner !== 'none') {
      this.turnCounter = 'Game Over';
    }
    else if(this.turnCounter === 'Player 1') {
      this.turnCounter = 'Player 2';
    }
    else if (this.turnCounter === 'Player 2') {
      this.turnCounter = 'Player 1';
    }
  }, //change turn counter

  //check if there is a winning combination
  gameOverCheckThree: function () {
    if((tictactoegame.gamePlayRecord[0] == tictactoegame.gamePlayRecord[1]) &&
      (tictactoegame.gamePlayRecord[2] == tictactoegame.gamePlayRecord[1]))
      {
      this.winner = tictactoegame.gamePlayRecord[0];
      this.winCriteria[0] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[3] == tictactoegame.gamePlayRecord[4]) &&
      (tictactoegame.gamePlayRecord[4] == tictactoegame.gamePlayRecord[5]))
      {
      this.winner = tictactoegame.gamePlayRecord[3];
      this.winCriteria[1] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[6] == tictactoegame.gamePlayRecord[7]) &&
      (tictactoegame.gamePlayRecord[7] == tictactoegame.gamePlayRecord[8]))
      {
      this.winner = tictactoegame.gamePlayRecord[6];
      this.winCriteria[2] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[0] == tictactoegame.gamePlayRecord[3]) &&
      (tictactoegame.gamePlayRecord[3] == tictactoegame.gamePlayRecord[6]))
      {
      this.winner = tictactoegame.gamePlayRecord[0];
      this.winCriteria[3] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[1] == tictactoegame.gamePlayRecord[4]) &&
      (tictactoegame.gamePlayRecord[1] == tictactoegame.gamePlayRecord[7]))
      {
      this.winner = tictactoegame.gamePlayRecord[1];
      this.winCriteria[4] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[2] == tictactoegame.gamePlayRecord[5]) &&
      (tictactoegame.gamePlayRecord[2] == tictactoegame.gamePlayRecord[8]))
      {
      this.winner = tictactoegame.gamePlayRecord[2];
      this.winCriteria[5] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[0] == tictactoegame.gamePlayRecord[4]) &&
      (tictactoegame.gamePlayRecord[0] == tictactoegame.gamePlayRecord[8]))
      {
      this.winner = tictactoegame.gamePlayRecord[0];
      this.winCriteria[6] ='true';
    } // end if
    if((tictactoegame.gamePlayRecord[2] == tictactoegame.gamePlayRecord[4]) &&
      (tictactoegame.gamePlayRecord[2] == tictactoegame.gamePlayRecord[6]))
      {
      this.winner = tictactoegame.gamePlayRecord[2];
      this.winCriteria[7] ='true';
    } // end if
  },

  //change the writing that indicates whose turn it is
  turnCSS:  function () {
    if (tictactoegame.turnCounter === 'Player 1') {
      $('#player1 .turnNote').html("Your Turn");
      $('#player2 .turnNote').html("");
    } //end if
    else if (tictactoegame.turnCounter === 'Player 2') {
      $('#player2 .turnNote').html("Your Turn");
      $('#player1 .turnNote').html("");
    } // end else

    else if (tictactoegame.turnCounter === 'Game Over') {
      $('.turnNote').html("");
    }
  },

  //reset the board to play again
  resetBoard: function () {
    $('.playSquare').find('img').css({'visibility': 'hidden'});
    $('.playSquare').find('.strike-out').css({'visibility': 'hidden'});
    this.winner = "none";
    this.drawChecker = "none";
    this.clickCounter = 0;
    $('#msgDisplay').html("");
    // this.turnCounter = 'Player 1';
    for (let i =0; i < this.gamePlayRecord.length; i++) {
      const number = i + 1;
      this.gamePlayRecord[i] = number;
      this.winCriteria[i] = 'false';
    } //end for
    this.winCriteriaCalc ();
  },

  //updated score board and set starting player for 'play again' button
  updateScoreAndSetLoserAsStartingPlayer: function () {
    if(this.winner === 'Player 1') {
      this.turnCounter = 'Player 2';
    }
    else {
      this.turnCounter = 'Player 1';
    }
    if (this.winner === 'Player 1') {
      this.scoreBoard.Player1 = parseInt(this.scoreBoard.Player1) + 1;
    }
    else if (this.winner === 'Player 2') {
      this.scoreBoard.Player2 = parseInt(this.scoreBoard.Player2) + 1;
    }
  },
}; //end tictactoegame

//-----------------CLICK FUNCTION ----------------------------//

$('.playSquare').on("click", function () {
  $('#msgDisplay').html(""); //clear screen message

  //check if a winner has been decided - if so display message that the game is over.
  if (tictactoegame.winner !== "none" || tictactoegame.drawChecker == 'true') {
    $('#msgDisplay').html('The game is over, click below to play again!');
  }

  else if (  //check if square has been played. if so, go to 'else' and display 'msg to pick again.'
    $(this).find('.player1TokenBoard').css('visibility') == 'hidden' &&
    $(this).find('.player2TokenBoard').css('visibility') == 'hidden' ) {
      //check who played, and make their counter appear in the square.
    tictactoegame.clickCounter += 1;

    if(tictactoegame.turnCounter === 'Player 1') {
      $(this).find('.player1TokenBoard').css({'visibility': 'visible'});
    } // end if
    else {
      $(this).find('.player2TokenBoard').css({'visibility': 'visible'});
    } //end else

    //Keep record of who played where.
    const $squareID = $(this).attr('id'); //get ID of square
    $numberFind = $squareID.charAt(5); //get number of ID from square
    tictactoegame.gamePlayRecord[$numberFind-1] = tictactoegame.turnCounter; //assign player record based on square ID number.

    //check if player has won, and display win message.
    tictactoegame.gameOverCheckThree();
    if (tictactoegame.winner !== 'none' ) {
      $('#msgDisplay').html(`Game Over! ${tictactoegame.winner} Wins!`);
      $('#playAgain').css({'visibility': 'visible'});
      $('#reset').css({'visibility': 'visible'});
    } //end winner

    //check which combination won, and activate CSS line.
    tictactoegame.winCriteriaCalc ();

    //check for a draw
    tictactoegame.drawCheck();
    if(tictactoegame.drawChecker == 'true') {
      $('#msgDisplay').html("It's a draw!");
      $('#playAgain').css({'visibility': 'visible'});
      $('#reset').css({'visibility': 'visible'});
    }

    // Change player turn & update HTML
    tictactoegame.turnNotification();
    tictactoegame.turnCSS();
  } //end if

  else
  { // message to play a different square
    $('#msgDisplay').html("Please choose another square, that one has been played");
  }
}); //.playSquare click

$('#reset').on("click", function () {
  tictactoegame.resetBoard();
  tictactoegame.turnCounter = 'Player 1';
  tictactoegame.turnCSS();
  tictactoegame.scoreBoard.Player1 = 0;
  tictactoegame.scoreBoard.Player2 = 0;
  $('#scorePlayer1').html("0");
  $('#scorePlayer2').html("0");
  // console.log(tictactoegame.scoreBoard);

});

$('#playAgain').on("click", function () {

  tictactoegame.updateScoreAndSetLoserAsStartingPlayer();
  tictactoegame.resetBoard();
  tictactoegame.turnCSS();
  // console.log(tictactoegame.scoreBoard);
  $('#scorePlayer2').html(tictactoegame.scoreBoard.Player2);
  $('#scorePlayer1').html(tictactoegame.scoreBoard.Player1);
});

//TO DO:


//Add page to entry to set player 1 vs player 2.
//Randomly select who goes first.
//Add scoring board (use bank methodology)

//make board look better - bug colors
