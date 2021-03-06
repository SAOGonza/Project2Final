const VideoGameController = new (require('../controllers/VideoGameController'))();
const VideoGameRouter = require('koa-router')({
    prefix: '/VideoGame'
});

console.log('VideoGame Router Initialized!');
VideoGameRouter.get('/', VideoGameController.VideoGames);
VideoGameRouter.get('/:VideoGame', VideoGameController.VideoGame);
VideoGameRouter.post('/', VideoGameController.addVideoGame, VideoGameController.VideoGames);
VideoGameRouter.put('/:VideoGame', VideoGameController.updateVideoGame, VideoGameController.VideoGame);
VideoGameRouter.delete('/:VideoGame', VideoGameController.deleteVideoGame, VideoGameController.VideoGames);

module.exports = VideoGameRouter;
