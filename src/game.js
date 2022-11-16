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
                if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_ONE) {
                    this.currentPlayer_ = Game.PLAYER_ID.PLAYER_TWO;
                    piece.style.backgroundColor = 'yellow';
                } else if (this.currentPlayer_ === Game.PLAYER_ID.PLAYER_TWO) {
                    this.currentPlayer_ = Game.PLAYER_ID.PLAYER_ONE;
                    piece.style.backgroundColor = 'red';
                }
            });

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

                let innerTile = document.createElement('div');
                innerTile.className = 'innerTile';
                innerTile.id = 'innerTile-' + i;
                tile.appendChild(innerTile);
                    
                column.append(tile);
            }
            this.board_.append(column);
        }
        return this.board_;
    }
}


module.exports = Game;