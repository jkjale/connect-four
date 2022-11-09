const Game = require('./game');

function initApplication() {
    const game = new Game();
    const rootNode = game.getRootNodeForDimension();
    console.log('jaketest#@#@#------33333');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete') {
    initApplication();
}