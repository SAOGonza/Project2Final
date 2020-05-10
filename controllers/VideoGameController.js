const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class VideoGameController {
    constructor() {
	console.log('VideoGame Controller Initialized!');
    }

    // Fetches all Video Games
    async VideoGames(ctx) {
	console.log('Controller HIT: VideoGameController::VideoGames');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM VideoGame';

	    chpConnection.query(query, (err, res) => {
		if(err) {
		    reject(`Error querying CHP.VideoGame: ${err}`);
		}

		ctx.body = res;
		ctx.status = 200;

		resolve();
	    });
	})
	    .catch(err => {
		ctx.status = 500;
		ctx.body = err;
	    });
    }
    // Fetches a single Video Game
    async VideoGame(ctx) {
	console.log('Controller HIT: VideoGameController::VideoGame');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM VideoGame WHERE title = ?;';
	    const dc = ctx.params.dataCenter;

	    chpConnection.query({
		sql: query,
		values: [dc]
	    }, (err, res) => {
		if(err) {
		    reject(err);
		}

		ctx.body = res;
		ctx.status = 200;
		resolve();
	    });
	})
	    .catch(err => {
		ctx.status = 500;
		ctx.body = {
		    error: `Internal Server Error: ${err}`,
		    status: 500
		};
	    });
    }
    
    // Add a new VideoGame
    async addVideoGame(ctx, next) {
	console.log('Controller HIT: VideoGameController::VideoGame');
	return new Promise((resolve, reject) => {
	    const newVG = ctx.request.body;
	    chpConnection.query({
		sql: 'INSERT INTO VideoGame(game_id, title, rating) VALUES (?, ?, ?);',
		values: [newVG.game_id, newVG.title, newVG.rating]
	    }, (err, res) => {
		if(err) {
		    reject(err);
		}

		resolve();
	    });

	})
	    .then(await next)
	    .catch(err => {
		ctx.status = 500;
		ctx.body = {
		    error: `Internal Server Error: ${err}`,
		    status: 500
		};
	    });
    }

    // Update a VideoGame
    async updateVideoGame(ctx, next) {
	console.log('Controller HIT: VideoGameController::updateVideoGame');
	return new Promise((resolve, reject) => {
	    const vg = ctx.request.body;
	    chpConnection.query({
		sql: `
                    UPDATE VideoGame 
                    SET 
                        rating = ?
                    WHERE title = ?
                    `,
		values: [vg.rating, ctx.params.VideoGame]
	    }, (err, res) => {
		if(err) {
		    reject(err);
		}

		resolve();
	    });
	})
	    .then(await next)
	    .catch(err => {
		ctx.status = 500;
		ctx.body = {
		    error: `Internal Server Error: ${err}`,
		    status: 500
		};
	    });
    }

    // Delete a Video Game
    async deleteVideoGame(ctx, next) {
	console.log('Controller HIT: VideoGameController::deleteVideoGame');
	return new Promise((resolve, reject) => {
	    chpConnection.query({
		sql: `DELETE FROM VideoGame WHERE title = ?;`,
		values: [ctx.params.VideoGame]
	    }, (err, res) => {
		if(err) {
		    reject(err);
		}
		resolve();
	    });
	})
	    .then(await next)
	    .catch(err => {
		ctx.status = 500;
		ctx.body = {
		    error: `Internal Server Error: ${err}`,
		    status: 500
		};
	    });
    }
}

module.exports = VideoGameController;
