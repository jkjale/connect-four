const Game = require('./game');

function initApplication() {
    const game = new Game();
    const rootNode = game.getRootNodeForDimension();
    
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete') {
    initApplication();
}