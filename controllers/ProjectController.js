const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class ProjectController {
    constructor() {
	console.log('Project Controller Initialized!');
    }

    // Fetches all Projects
    async Projects(ctx) {
	console.log('Controller HIT: ProjectController::Projects');
	return new Promise((resolve, reject) => {
	                const query = 'SELECT * FROM Project';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Project: ${err}`);
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

    // Fetches a single Project
    async Project(ctx) {
        console.log('Controller HIT: ProjectController::Project');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Project WHERE pName = ?;';
            const PR = ctx.params.Project;
            
            chpConnection.query({
                sql: query,
                values: [PR]
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

    // Add a new Project
    async addProject(ctx, next) {
        console.log('Controller HIT: ProjectController::addProject');
       return new Promise((resolve, reject) => {
           const newPR = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Project(pName, pNum, pLocation) VALUES (?, ?, ?);',
               values: [newPR.pName, newPR.pNum, newPR.pLocation]
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

    // Update a Project
    async updateProject(ctx, next) {
        console.log('Controller HIT: ProjectController::updateProject');
        return new Promise((resolve, reject) => {
            const pr = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Project 
                    SET 
                        pNum = ?,
                        pLocation = ?
                    WHERE pName = ?
                    `,
                values: [pr.pNum, pr.pLocation, ctx.params.Project]
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

    // Delete a Project
    async deleteProject(ctx, next) {
        console.log('Controller HIT: ProjectController::deleteProject');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Project WHERE pName = ?;`,
                values: [ctx.params.Project]
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

module.exports = ProjectController;
