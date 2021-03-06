const PlayerController = new (require('../controllers/PlayerController'))();
const PlayerRouter = require('koa-router')({
    prefix: '/Player'
});

console.log('Player Router Initialized!');
PlayerRouter.get('/', PlayerController.Players);
PlayerRouter.get('/:Player', PlayerController.Player);
PlayerRouter.post('/', PlayerController.addPlayer, PlayerController.Players);
PlayerRouter.put('/:Player', PlayerController.updatePlayer, PlayerController.Player);
PlayerRouter.delete('/:Player', PlayerController.deletePlayer, PlayerController.Players);

module.exports = PlayerRouter;
