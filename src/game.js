class Game {


    getRootNodeForDimension() {
        this.board_ = document.createElement('div');
        this.board_.id = 'board';

        for (let i = 0; i < 8; i++) {
            let row = document.createElement('div');
            row.className = 'row';
            for (let j = 0; j < 10; j++) {
                let tile = document.createElement('div');
                tile.className = 'tile';

                let innerTile = document.createElement('div');
                innerTile.className = 'innerTile';
                tile.appendChild(innerTile);
                    
                row.append(tile);
            }
            this.board_.append(row);
        }
    
        return this.board_;
    }
}


module.exports = Game;