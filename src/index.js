const Game = require('./game');

function initApplication() {
    const game = new Game();
    const board = game.getRootNodeForDimension();
    document.getElementById('game').append(board);
    console.log('testing ()#()#');
    
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete') {
    initApplication();
}