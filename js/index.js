const sqr1 = document.getElementById(1)
const sqr2 = document.getElementById(2)
const sqr3 = document.getElementById(3)
const sqr4 = document.getElementById(4)
const sqr5 = document.getElementById(5)
const sqr6 = document.getElementById(6)
const sqr7 = document.getElementById(7)
const sqr8 = document.getElementById(8)
const sqr9 = document.getElementById(9)

const resultText = document.querySelector('.result')

const restartBtn = document.querySelector('.restart')

const players = document.querySelector('.players')

const player1Score = document.querySelector('.player1Wins')
const player1Display = document.querySelector('.player1')
const player2Score = document.querySelector('.player2Wins')
const player2Display = document.querySelector('.player2')

const setNamesBtn = document.querySelector('.setNames')
const chooseNameP1 = document.getElementById('chooseNameP1')
const chooseNameP2 = document.getElementById('chooseNameP2')


//player factory
const playerFactory = (name, symbol) => {
    function move(square){
        square.innerHTML = symbol
    }
    function setName(input) {
        this.name = input
    }
    let moves = []
    let wins = 0

    function addWin(){
        wins ++
        return wins
    }

    return{name, symbol, move, setName, moves, addWin, wins}
}

//players
const player1 = playerFactory('Player 1', `X`)
const player2 = playerFactory('Player 2', `O`)


setNamesBtn.addEventListener('click', (event) => {

    event.preventDefault()

    const name1 = chooseNameP1.value
    const name2 = chooseNameP2.value

    if (name1 && name2) {
        player1.setName(name1)
        player2.setName(name2)
    }

            // Update player names displayed on the page
            player1Display.innerHTML = player1.name + ' - ' + player1.symbol
            player2Display.innerHTML = player2.name + ' - ' + player2.symbol
            players.innerHTML = `<strong> ${player1.name} V ${player2.name} </strong>`
            
            // Reset the input fields
            chooseNameP1.value = ''
            chooseNameP2.value = ''
})



players.innerHTML = `<strong> ${player1.name} V ${player2.name} </strong>`
player1Display.innerHTML = player1.name + ' - ' + player1.symbol
player2Display.innerHTML = player2.name + ' - ' + player2.symbol
player1Score.innerHTML = player1.wins
player2Score.innerHTML = player2.wins

//start game info
let currentPlayer = player1

//gameboard
let gameBoard = {
    gameMoves: 0,
    squares: [ 
        sqr1, sqr2, sqr3,
        sqr4, sqr5, sqr6,
        sqr7, sqr8, sqr9
        ],
    winSequences: [
        [sqr1, sqr2, sqr3],
        [sqr4, sqr5, sqr6], 
        [sqr7, sqr8, sqr9], 
        [sqr1, sqr4, sqr7], 
        [sqr2, sqr5, sqr8], 
        [sqr3, sqr6, sqr9], 
        [sqr1, sqr5, sqr9], 
        [sqr3, sqr5, sqr7] 
        ]
    
}

//handle player moving 
gameBoard.squares.forEach(square => {
    square.addEventListener('click', () => handleSquareClick(square))
})

//handle click/move
function handleSquareClick(square) {
    if(resultText.innerHTML == ''){
    if (square.innerHTML === '') {
      if (currentPlayer === player1) {
        player1.move(square)
        player1.moves.push(square)
        gameBoard.gameMoves++
        checkWin()
        currentPlayer = player2
      } else {
        player2.move(square)
        player2.moves.push(square)
        gameBoard.gameMoves++
        checkWin()
        currentPlayer = player1
      }
    }
    }
  }

function checkWin() {
    let win = false;
    for (const sequence of gameBoard.winSequences) {
      if (sequence.every(square => player1.moves.includes(square))) {
        resultText.innerHTML = `${player1.name} wins!`;
        player1Score.innerHTML = player1.addWin()
        win = true;
      } else if (sequence.every(square => player2.moves.includes(square))) {
        resultText.innerHTML = `${player2.name} wins!`;
        player2Score.innerHTML = player2.addWin()
        win = true;
      }
    }
    if (gameBoard.gameMoves == 9 && !win) {
      resultText.innerHTML = `${player1.name} and ${player2.name} draw`;
    }
  }
  
function restartGame() {
    gameBoard.squares.forEach(square => {
        square.innerHTML = ''
    })
    resultText.innerHTML = ''
    gameBoard.gameMoves = 0
    player1.moves = []; 
    player2.moves = []; 
}

restartBtn.addEventListener('click', restartGame)