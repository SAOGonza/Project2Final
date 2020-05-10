const chpConnection = require('../database/CHPConnection');

class queryViewController {
    constructor() {
	console.log('Query VIEW FINALLY Initialized!');
    }

    async viewQuery(ct){
	console.log('Calls a view for the Query')
	return new Promise((resolve, reject) => {
	    const sqlQuery = 'SELECT * From queryView;';

	    mySQLConnection.query(sqlQuery, (err, queryRes) => {
		if(err){
		    console.log("ERRRORRR");
		    reject(err);
		}
		console.log("Successfuly worked: Query View");

		ctx.status = 200;
		ctx.body = queryRes;

		resolve();
	    });
	})
	    .catch(err => {
		ctx.status = 500;
		ctx.body = {
		    error: `Internal Server Error: ${err}`,
		    status: 500
		}
	    });
    }
}

module.exports = queryViewController;
