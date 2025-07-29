// console.log(`Hello, World!`)

const gameBoard = () => {
    const ROW = 3;
    const COL = 3;
    let board = [];


    for(let i = 0; i < ROW; i++){
        board[i] = [];
        for(let j = 0; j < COL; j++){
            const obj = player('empty', '');
            board[i][j] = obj;
        }
    }

    const getBoard = () => board;

    const showBoard = () => {
        console.log('--- Current Board ---');
        for(let i = 0; i < board.length; i++){
            let rowString = ''; // Initialize an empty string for each row
            for(let j = 0; j <board[0].length; j++){
                let obj = board[i][j];
                rowString += ` ${obj.getValue()} |`; // Append the value and a separator
            }
            // Remove the last '|' and log the row
            console.log(rowString.slice(0, -1));
            if (i < board.length - 1) {
                console.log('---|---|---'); // Separator between rows
            }
        }
        console.log('---------------------');
    }

    function checkCell(row, col){
        if(Math.min(row, col) < 0 || row >= ROW || col >= COL){
            console.log('Your indicies are out of bounds!!!');
            return false;
        }
        
        console.log(`Checking if cell [${row}][${col}] is empty ....`);
        if(board[row][col].getName() === 'empty'){
            console.log(`[${row}][${col}] is empty! Making selection!`)
            return true;
        } else if(board[row][col].getValue() === 'X' || board[row][col].getValue() === 'O'){
            console.log(`[${row}][${col}] is already taken!`)
            return false;
        } else{
            console.log(`[${row}][${col}] is not empty!`)
            return false;
        }
    }

    const updateCell = (row, col, player) => {
        board[row][col].setName(player.getName());
        board[row][col].setValue(player.getValue());
    }


    const clearBoard = () => {
        for(let i = 0; i < ROW; i++){
            board[i] = [];
            for(let j = 0; j < COL; j++){
                const obj = player('empty', '');
                board[i][j] = obj;
            }
        }
    }

    return {clearBoard, getBoard, checkCell, updateCell, showBoard};
}

const player = (name = '', value = '') => {
   let pName  =  name;
   let pValue =  value;

    const setName  = (name)   => pName = name;
    const setValue = (value)  => pValue = value;
    const getName  = () => pName;
    const getValue = () => pValue;

    return {getName, getValue, setName, setValue};
}

const gameController = (player1 = "Player One", player2 = "Player Two") => {
    const players = [
        player(player1, 'X'), player(player2, 'O'),
    ];
    const winner = {
        player: player(),
        hasWon: false,
    };
    let currentPlayer = players[0];
    const board = gameBoard();

    const getPlayer = () => currentPlayer;

    const switchPlayer = () => {
        currentPlayer = (currentPlayer === players[0]) ? players[1] : players[0];
    }

    const checkHorizontal = () => {
        let x = new Array(3).fill('X');
        let o = new Array(3).fill('O');
    
        for(let i = 0; i < board.getBoard().length; i++){
            let arr = board.getBoard()[i];
    
            let filterX = arr.filter(value => value.getValue() === 'X');
            let filterO = arr.filter(value => value.getValue() === 'O');
    
            if(filterO.length === o.length){
                winner.player = players[1];
                winner.hasWon = true;
                return true;
            } else if(filterX.length === x.length){
                winner.player = players[0];
                winner.hasWon = true;
                return true;
            }
        }
        return false;
    }

    const checkVertical = () => {
        let x = new Array(3).fill('X');
        let o = new Array(3).fill('O');
        let arr = [];

        for(let i = 0; i < board.getBoard().length; i++){
            let inner = [];
            for(let j = 0; j < board.getBoard().length; j++){
                inner.push(board.getBoard()[j][i]);
            }
            arr.push(inner);

            let first = arr[i];
            let sec   = arr[i];

            let filterX = first.filter(value => value.getValue() === 'X');
            let filterO = sec.filter(value => value.getValue() === 'O');

            if(filterO.length === o.length){
                winner.player = players[1];
                winner.hasWon = true;
                return true;
            } else if(filterX.length === x.length){
                winner.player = players[0];
                winner.hasWon = true;
                return true;
            }
        }
        return false;
    }

    const checkDiagonal = () => {
        let x = new Array(3).fill('X');
        let o = new Array(3).fill('O');

        let mainDiag = [];
        let antiDiag = [];

        for(let i = 0; i < board.getBoard().length; i++){
            mainDiag.push(board.getBoard()[i][i]);
            antiDiag.push(board.getBoard()[i][board.getBoard().length - 1 - i]);
        }

        
        const arraysAreEqual = (arr1, arr2) => {
            if(arr1.length !== arr2.length){
                return false;
            }

            for(let i = 0; i < arr1.length; i++){
                // Compare the 'value' of the player object with the string in arr2
                if(arr1[i].getValue() !== arr2[i]){
                    return false;
                }
            }

            return true;
        }

        // Check for 'X' win on diagonals
        if(arraysAreEqual(mainDiag, x) || arraysAreEqual(antiDiag, x)){
            winner.player = players[0];
            winner.hasWon = true;
            return true; // Return true if 'X' wins
        } 
        // Check for 'O' win on diagonals
        else if(arraysAreEqual(mainDiag, o) || arraysAreEqual(antiDiag, o)){ 
            winner.player = players[1];
            winner.hasWon = true;
            return true; // Return true if 'O' wins
        }
        
        return false; // No diagonal win
    }

    const checkTie = () => {
        let length = board.getBoard().length;
        let currentBoard = board.getBoard();
        let empty = false;
        for(let i = 0; i < length; i++){
            for(let j = 0; j < length; j++){
                if(currentBoard[i][j].getName() === 'empty'){
                    empty = true;
                    break;
                }
            }
        }

        if(empty){
            return;
        } else{
            console.log(`It's a tie!`);
            board.clearBoard();
        }
    }

    const resetWinner = () => {
        winner.player = player();
        winner.hasWon = false;
    }

    const checkWinner = () => {
        
        if(checkDiagonal() || checkHorizontal() || checkVertical()){
            console.log(`${winner.player.getName()} has Won!!`);
            console.log('The game will now be restarted!');
            board.clearBoard();
            resetWinner();
        }
    }

    const playRound = (row, col) => {
        console.log(`${getPlayer().getName()} is making their selection`);
        
        let empty = board.checkCell(row, col);
        if(!empty){
            console.log(`Index [${row}][${col}] is not empty! Please try again`);
            return;
        } 
        
        // const selection = board.getIndex(row, col);
        console.log(`${currentPlayer.getName()} selected board cell [${row}][${col}]`);
        board.updateCell(row, col, currentPlayer);
        checkTie();
        checkWinner();
        console.log(board.getBoard()[row][col].getName() + ' ' + board.getBoard()[row][col].getValue());
        board.showBoard();
        switchPlayer();
    }

    // const playGame = () => {
    //     const NUM_OF_ROUNDS = 9;

    //     for(let round = 0; round < NUM_OF_ROUNDS; round++){
    //         playRound(currentPlayer);
    //         switchPlayer();
    //         if(round >= 2){
    //             checkWinner();
    //         }
    //     }
    // }

    return {getPlayer, switchPlayer, playRound, getBoard: board.getBoard, };
}

const displayController = () => {
    const scoreBoard = document.querySelector('#score-board');
    const gameContainer = document.querySelector('#game-board');
    const game = gameController();
    


    const updateScreen = () => {
        scoreBoard.textContent = "";
        gameContainer.textContent = "";
        const board = game.getBoard();
        const currentPlayer = game.getPlayer();
        

        scoreBoard.textContent = `${currentPlayer.getName()}'s turn ...`;

        board.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
                const square = document.createElement('div');
                square.classList.add("square");

                square.dataset.column = colIndex;
                square.dataset.row = rowIndex;
                square.textContent = cell.getValue();
                gameContainer.appendChild(square);
            })
        })
    }

    function clickHandler(e) {
        const col = e.target.dataset.column;
        const row = e.target.dataset.row;
        if(!col && !row) return;

        game.playRound(row, col);
        updateScreen();
    }
    updateScreen();
    gameContainer.addEventListener('click', clickHandler);
    
}

displayController();

