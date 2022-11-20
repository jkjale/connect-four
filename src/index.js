const Game = require('./game');

function initApplication() {
    const game = new Game(8, 10);
    // const slot = game.createSlot();
    // const board = game.createBoard();
    document.getElementById('game').append(game.slot_);
    document.getElementById('game').append(game.board_);
    game.startGame();
    console.log('````@@@@123jake #11~~~~~~~111##...###==111==########test3---!!@@@!!--2423');  
    console.log(game.state_);  
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initApplication();
    }); 
} else if (document.readyState === 'complete') {
    initApplication();
}