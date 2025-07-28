// console.log(`Hello, World!`)

const gameBoard = () => {
    console.log('GameBoard has been initialized');
    const ROW = 3;
    const COL = 3;
    let board = [];


    for(let i = 0; i < ROW; i++){
        board[i] = [];
        for(let j = 0; j < COL; j++){
            const obj = player('empty', 'x');
            board[i][j] = obj;
        }
    }

    const getBoard = () => board;

    const getIndex = (row, col) => { board[row][col]};

    function checkCell(row, col){
        if(Math.min(row, col) < 0 || row >= ROW || col >= COL){
            console.log('Your indicies are out of bounds!!!');
            return false;
        }
        
        console.log(`Checking if cell [${row}][${col}] is empyt ....`);
        if(board[row][col].getName() === 'empty'){
            console.log(`[${row}][${col}] is empty!`)
            return true;
        } else{
            console.log(`[${row}][${col}] is not empty!`)
            return false;
        }
    }


    const clearBoard = () => {
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            for(let j = 0; j < COL; j++){
                const obj = player('empty', 'x');
                board[i][j] = obj;
            }
        }
    }

    return {getIndex, clearBoard, getBoard, checkCell};
}

const player = (name = '', value = '') => {
   let pName  =  name;
   let pValue =  value;

    const getName  = () => pName;
    const getValue = () => pValue;

    return {getName, getValue};
}

const gameController = (player1 = "Player One", player2 = "Player Two") => {
    const players = [
        player(player1, 'X'), player(player2, 'O'),
    ];

    let currentPlayer = players[0];

    const getPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    }

    const playRound = (currentPlayer) => {
        console.log(`Hello ${currentPlayer.getName()}, please make your selection`);
    }

    return {getPlayer, switchPlayer, playRound};
}

const board = gameBoard();
const controller = gameController();



