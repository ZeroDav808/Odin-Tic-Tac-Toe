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

    const showBoard = () => {
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j <board[0].length; j++){
                let obj = board[i][j];
                console.log(obj.getValue());
            }
        }
    }

    const getBoard = () => board;

    const getIndex = (row, col) => { board[row][col]};

    const clearBoard = () => {
        setBoard();
    }

    return {showBoard ,getIndex, clearBoard, getBoard};
}

const player = (name = '', value = '') => {
   let pName  =  name;
   let pValue =  value;

    const getName  = () => pName;
    const getValue = () => pValue;

    return {getName, getValue};
}

const gameController = (player1 = "Player One", player2 = "Player Two") => {

}

