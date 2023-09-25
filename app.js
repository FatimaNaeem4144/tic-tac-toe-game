let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));
let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');
const O_TEXT = "O";
const X_TEXT = "X";

let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);
const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}
function boxClicked(e) {
    const id = e.target.id;
    if (!spaces[id]) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;
        if (currentPlayer == X_TEXT) {
            e.target.style.color = "red";
            e.target.style.borderRight = "2px solid #f09";
            e.target.style.borderBottom = "2px solid #f09";
            e.target.style.textShadow = "0 0 5px #fff, 0 0 10px red, 0 0 15px red, 0 0 20px red"; 
            e.target.style.fontSize = "100px";
        } else {
            e.target.style.color = "blue";
            e.target.style.borderRight = "2px solid #f09";
            e.target.style.borderBottom = "2px solid #f09"; 
            e.target.style.textShadow = "0 0 5px #fff, 0 0 10px #00f, 0 0 15px #00f, 0 0 20px #00f";
            e.target.style.fontSize = "100px";
        }
        if (id % 3 === 2) {
            e.target.style.borderRight = "none";
        }

        if (id >= 6) {
            e.target.style.borderBottom = "none";
        }

        if(playerHasWon() !== false){
            playerText = `${currentPlayer} has won!`
            let winningBlocks = playerHasWon();
            winningBlocks.map(box => boxes[box].stybackgroundColor=winnerIndicator);
            return ;
        }
        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
        updatePlayerText();
    }
}


const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
function playerHasWon(){
    for (const condition of winningCombos) {
        let [a,b,c] = condition;
        if(spaces[a] && (spaces[a] == spaces[b]) && spaces[a] == spaces[c]){
            if(spaces[a] == X_TEXT && (spaces[a] == spaces[b]) && spaces[a] == spaces[c]){
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'X won!',
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
            else{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'O won!',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            return [a,b,c]
        }
}
return false
}
restartBtn.addEventListener('click', restart)
function restart() {
    spaces.fill(null);
    boxes.forEach( box => {
        box.innerHTML = '';
        box.style.backgroundColor=''
    })
    playerText = 'Tic Tac Toe'
    currentPlayer = X_TEXT;
}
startGame()