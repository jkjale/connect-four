class Game {
    constructor(row, column) {
        this.row_ = row;
        this.column_ = column;
        this.slot_ = this.createSlot();
        this.state_ = this.createState();
        this.board_ = this.createBoard();
        this.currentPlayer_ = 1;
    }
    
    static PLAYER_ID = {
        PLAYER_ONE: 1,
        PLAYER_TWO: 2
    }



    startGame() {
        let piece = document.getElementById('piece');
        let columns = document.getElementById('board').children; // [div.column1, div.column2 ....]
        for (let i = 0; i < columns.length; i++) {
            columns[i].addEventListener('mouseover', () => {
                if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_ONE) {
                    piece.style.backgroundColor = 'red';
                }
                if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_TWO) {
                    piece.style.backgroundColor = 'yellow';
                }
                piece.style.left = i * 100;
            });

            columns[i].addEventListener('mouseout', () => {
                piece.style.backgroundColor = '';
            });
            
            columns[i].addEventListener('click', () => {
                let columnClicked = i;
                this.updateState(columnClicked); 
                this.updateBoard(columns);
                let currentPlayerNumberSaved = this.currentPlayer_;
                if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_ONE) {
                    this.currentPlayer_ = Game.PLAYER_ID.PLAYER_TWO;
                    piece.style.backgroundColor = 'yellow';
                } else if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_TWO) {
                    this.currentPlayer_ = Game.PLAYER_ID.PLAYER_ONE;
                    piece.style.backgroundColor = 'red';
                }

                if (this.getWinningPlayer(this.state_) !== 0) {
                    let tileCoordinates = this.getWinningTiles(this.state_, currentPlayerNumberSaved);
                    console.log('tileCoordinates:');
                    console.log(tileCoordinates);
                    let directionToDraw = this.getDirection(tileCoordinates);
                    let strikeLineClassName = '';

                    if (directionToDraw === 'horizontal') {
                        strikeLineClassName = 'strikeRow';
                    }
                    if (directionToDraw === 'vertical') {
                        strikeLineClassName = 'strikeColumn';
                    }
                    if (directionToDraw === 'leftDiagonal') {
                        strikeLineClassName = 'strikeLeftDiagonal';
                    }
                    if (directionToDraw === 'rightDiagonal') {
                        strikeLineClassName = 'strikeRightDiagonal';
                    }

                    console.log('directiontodraw: ' + directionToDraw);
                    console.log('strikelinename: ' + strikeLineClassName);

                    for (let i = 0; i < tileCoordinates.length; i++) {
                        let column = tileCoordinates[i][0];
                        let row = tileCoordinates[i][1];
                        let innerTileId = 'innerTile-' + row + '-' + column;

                        let strikeLine = document.createElement('div');
                        let divNeedsToBeStriked = document.getElementById(innerTileId);
                        strikeLine.className = strikeLineClassName;
                        divNeedsToBeStriked.append(strikeLine);
                    }
                }

                if (this.getWinningPlayer(this.state_) === 1) {
                    console.log('Player 1 wins!');
                } else if (this.getWinningPlayer(this.state_) === 2) {
                    console.log('Player 2 wins!');
                }
            });

        } 
    }


    // takes in the state as argument
    // this returns [[x,x], [x,x], [x,x], [x,x]]
    getWinningTiles(state, playerNumber) {  
        // check row
        for (let i = 0; i < this.row_; i++){
            for (let j = 0; j < this.column_ - 3; j++) {
                if (state[i][j] === playerNumber && state[i][j+1] === playerNumber 
                    && state[i][j+2] === playerNumber && state[i][j+3] === playerNumber) {
                    return [[i, j], [i, j+1], [i, j+2], [i, j+3]]; 
                }  
            }
        }
        // check column
        for (let i = 0; i < this.row_ - 3; i++){
            for (let j = 0; j < this.column_; j++) {
                if (state[i][j] === playerNumber && state[i+1][j] === playerNumber 
                    && state[i+2][j] === playerNumber && state[i+3][j] === playerNumber) {
                    return [[i, j], [i+1, j], [i+2, j], [i+3, j]]; 
                }  
            }
        }

        // check left diagonal
        // [4,0], [5,1], [6,2], [7,3]
        for (let i = 0; i < this.row_ - 3; i++){
            for (let j = 0; j < this.column_ - 3; j++) {
                if (state[i][j] === playerNumber && state[i+1][j+1] === playerNumber 
                    && state[i+2][j+2] === playerNumber && state[i+3][j+3] === playerNumber) {
                    return [[i, j], [i+1, j+1], [i+2, j+2], [i+3, j+3]]; 
                }  
            }
        }
        
        // check right diagonal
        // [0,9], [1,8], [2,7], [3,6]
        for (let i = 0; i < this.row_ - 3; i++){
            for (let j = 0; j < this.column_ - 3; j++) {
                if (state[i][j] === playerNumber && state[i+1][j+1] === playerNumber 
                    && state[i+2][j+2] === playerNumber && state[i+3][j+3] === playerNumber) {
                    return [[i, j], [i+1, j+1], [i+2, j+2], [i+3, j+3]]; 
                }  
            }
        }

    }


    // takes in an argument of [[x,x], [x,x], [x,x], [x,x]] which is a returned value from getWinningTiles()
    // this returns 'horizontal', 'vertical', etc.
    getDirection(winningTilesArray) {
        let direction = '';
        let rowCounter = 0;
        let columnCounter = 0;
        let leftDiagonalCounter = 0;
        let rightDiagonalCounter = 0;

        for (let i = 0; i < winningTilesArray.length; i++) {
            let rowNum = winningTilesArray[0][0];
            let columnNum = winningTilesArray[0][1];
            let diffOfCoordinateNumbers = winningTilesArray[0][0] - winningTilesArray[0][1];
            let sumOfCoordinateNumbers = winningTilesArray[0][0] + winningTilesArray[0][1];

            // check row
            // [7,2], [7,3], [7,4], [7,5]
            if (winningTilesArray[i][0] === rowNum) {
                rowCounter++;
            }

            // check column
            // [4,0], [5,0], [6,0], [7,0]
            if (winningTilesArray[i][1] === columnNum) {
                columnCounter++;
            }

            // check left diagonal
            // [4,0], [5,1], [6,2], [7,3]
            if (winningTilesArray[0][0] - winningTilesArray[0][1] === diffOfCoordinateNumbers) {
                leftDiagonalCounter++;
            }

            // check right diagonal
            // [0,9], [1,8], [2,7], [3,6]
            if (winningTilesArray[0][0] + winningTilesArray[0][1] === sumOfCoordinateNumbers) {
                rightDiagonalCounter++;
            }
        }

        if(rowCounter === 4) {
            direction = 'horizontal';
        }
        else if(columnCounter === 4) {
            direction = 'vertical';
        }
        else if(leftDiagonalCounter === 4) {
            direction = 'leftDiagonal';
        }
        else if(rightDiagonalCounter === 4) {
            direction = 'rightDiagonal';
        }
        return direction;
    }




    



    // this returns a 0, 1, or 2
    checkWhichPlayerOwnsARow(state) {
        for (let i = 0; i < this.row_; i++) {
            let playerOneRowCounter = 0;
            let playerTwoRowCounter = 0;
            for (let j = 0; j < this.column_; j++) {
                if (state[i][j] === 1) {
                    playerOneRowCounter++;
                } 
                if (state[i][j] === 2) {
                    playerTwoRowCounter++;
                }
            } 
            if (playerOneRowCounter === 4) {
                return 1;
            }
            if (playerTwoRowCounter === 4) {
                return 2;
            }
        }
        return 0;
    }

    checkWhichPlayerOwnsAColumn(state) {
        for (let i = 0; i < this.column_; i++) {
            let playerOneColumnCounter = 0;
            let playerTwoColumnCounter = 0;
            for (let j = 0; j < this.row_; j++) {
                if (state[j][i] === 1) {
                    playerOneColumnCounter++;
                } 
                if (state[j][i] === 2) {
                    playerTwoColumnCounter++;
                }
            }
            if (playerOneColumnCounter === 4) {
                return 1;
            }
            if (playerTwoColumnCounter === 4) {
                return 2;
            }
        }
        return 0;
    }

    // check left diagonal
    // [4,0], [5,1], [6,2], [7,3]
    checkWhichPlayerOwnsALeftDiagonal(state) {
        let playerOneCounter = 0;
        let playerTwoCounter = 0;
        for (let i = 0; i < this.row_ - 3; i++){
            for (let j = 0; j < this.column_ - 3; j++) {
                if (state[i][j] === 1 && state[i+1][j+1] === 1 
                    && state[i+2][j+2] === 1 && state[i+3][j+3] === 1) {
                    playerOneCounter++;
                } 
                if (state[i][j] === 2 && state[i+1][j+1] === 2 
                    && state[i+2][j+2] === 2 && state[i+3][j+3] === 2) {
                    playerTwoCounter++;
                }  
            }
        }
        if (playerOneCounter === 1) {
            return 1;
        }
        if (playerTwoCounter === 1) {
            return 2;
        }
        return 0;
    }

    // check right diagonal
    // [0,9], [1,8], [2,7], [3,6]
    checkWhichPlayerOwnsARightDiagonal(state) {
        let playerOneCounter = 0;
        let playerTwoCounter = 0;
        for (let i = 0; i < this.row_ - 3; i++){
            // for (let j = 0; j < this.column_ - 3; j++) {
            //     if (state[i][j] === 1 && state[i+1][j+1] === 1 
            //         && state[i+2][j+2] === 1 && state[i+3][j+3] === 1) {
            //         playerOneCounter++; 
            //     }  
            //     if (state[i][j] === 2 && state[i+1][j+1] === 2 
            //         && state[i+2][j+2] === 2 && state[i+3][j+3] === 2) {
            //         playerOneCounter++; 
            //     }  
            // }
        }
        if (playerOneCounter === 1) {
            return 1;
        }
        if (playerTwoCounter === 1) {
            return 2;
        }
        return 0;
    }
    



    // this returns a 0, 1, or 2
    getWinningPlayer(state) {
        let rowWinner = this.checkWhichPlayerOwnsARow(state);
        let columnWinner = this.checkWhichPlayerOwnsAColumn(state);
        let leftDiagonalWinner = this.checkWhichPlayerOwnsALeftDiagonal(state);
        let rightDiagonalWinner = this.checkWhichPlayerOwnsARightDiagonal(state);
        
        if (rowWinner !== 0) {
            return rowWinner;
        }
        if (columnWinner !== 0) {
            return columnWinner;
        }
        if (leftDiagonalWinner !== 0) {
            return leftDiagonalWinner;
        }
        if (rightDiagonalWinner !== 0) {
            return rightDiagonalWinner;
        }
    }
   









    /*
        1. create a function to initialize a state when the game starts; 
            when game starts the state is empty (to create a state to represent when the game starts)
        2. write function to update state whenever a click happens
            2a. logic to modify the state assuming we know which column was clicked 
            2b. figure out which column was clicked in the event listener and pass it into updateState
        3. update the view based on the new state (create a new function or add to event listener)
        
    */

    createState() {
        const board = [];
        for (let i = 0; i < this.row_; i++) {
            const row = new Array(this.column_);
            row.fill(0);
            board.push(row);
        }
        return board;
    }

    updateState(columnNumber) {
        let row = this.state_.length - 1;
        while (this.state_[row][columnNumber] !== 0) {
            row--;
        }
        if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_ONE) {
            this.state_[row][columnNumber] = 1;
        }
        if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_TWO) {
            this.state_[row][columnNumber] = 2;
        }
    }
        
    updateBoard(col) {
        for (let i = 0; i < col.length; i++) {
            for (let j = 0; j < this.state_.length; j++) {
                if (this.state_[j][i] === 1) {
                    col[i].children[j].children[0].style.backgroundColor = 'red';
                }
                if (this.state_[j][i] === 2) {
                    col[i].children[j].children[0].style.backgroundColor = 'yellow';
                }
            }  
        } 
    }

    



    createSlot() {
        this.slot_ = document.createElement('div');
        this.slot_.id = 'slot';
        let piece = document.createElement('div');
        piece.id = 'piece';
        this.slot_.append(piece);
        return this.slot_;
    }
        
    


    createBoard() {
        this.board_ = document.createElement('div');
        this.board_.id = 'board';
        for (let i = 0; i < this.column_; i++) {
            let column = document.createElement('div');
            column.className = 'column';
            column.id = 'column-' + i;
            for (let j = 0; j < this.row_; j++) {
                let tile = document.createElement('div');
                tile.className = 'tile';
                tile.id = 'tile-' + i + '-' + j;

                let innerTile = document.createElement('div');
                innerTile.className = 'innerTile';
                innerTile.id = 'innerTile-' + i + '-' + j;

                tile.append(innerTile);
                column.append(tile);
            }
            this.board_.append(column);
        }
        return this.board_;
    }
}


module.exports = Game;