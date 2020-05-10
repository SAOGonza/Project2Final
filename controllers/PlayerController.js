const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class PlayerController {
    constructor() {
	console.log('Player Controller Initialized!');
    }

    // Fetches all Players
    async Players(ctx) {
	console.log('Controller HIT: PlayerController::Players');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM Player';

	    chpConnection.query(query, (err, res) => {
		if(err) {
		    reject(`Error querying Player: ${err}`);
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

    // Fetches a single Player
    async Player(ctx) {
	console.log('Controller HIT: PlayerController::Player');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM Player WHERE name = ?;';
	    const pl = ctx.params.Player;

	    chpConnection.query({
		sql: query,
		values: [pl]
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

    // Add a new Player
    async addPlayer(ctx, next) {
	console.log('Controller HIT: PlayerController::addPlayer');
	return new Promise((resolve, reject) => {
	    const newPL = ctx.request.body;
	    chpConnection.query({
		sql: 'INSERT INTO Player(name, userID, DoB, age, plays) VALUES (?, ?, ?, ?, ?);',
		values: [newPL.name, newPL.userID, newPL.DoB, newPL.age, newPL.plays]
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

    // Update a Player
    async updatePlayer(ctx, next) {
	console.log('Controller HIT: PlayerController::updatePlayer');
	return new Promise((resolve, reject) => {
	    const updatePL = ctx.request.body;
	    chpConnection.query({
		sql: `
                    UPDATE Player 
                    SET 
                        userID = ?,
                        DoB = ?,
                        age = ?
                    WHERE name = ?
                    `,
		values: [updatePL.userID, updatePL.DoB, updatePL.age, ctx.params.Player]
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

    // Delete a Player
    async deletePlayer(ctx, next) {
	console.log('Controller HIT: PlayerController::deletePlayer');
	return new Promise((resolve, reject) => {
	    chpConnection.query({
		sql: `DELETE FROM Player WHERE name = ?;`,
		values: [ctx.params.Player]
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

module.exports = PlayerController;
