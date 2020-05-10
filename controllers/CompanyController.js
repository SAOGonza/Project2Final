const chpConnection = require('../database/CHPConnection');

// Controller that interacts with database to retrieve data.
class CompanyController {
    constructor() {
	console.log('Company Controller Initialized!');
    }

    // Fetches all Companys
    async Companys(ctx) {
	console.log('Controller HIT: CompanyController::Companys');
	return new Promise((resolve, reject) => {
	                const query = 'SELECT * FROM Company';
            
            chpConnection.query(query, (err, res) => {
                if(err) {
                    reject(`Error querying Company: ${err}`);
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

    // Fetches a single Company
    async Company(ctx) {
        console.log('Controller HIT: CompanyController::Company');
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Company WHERE comp_name = ?;';
            const cp = ctx.params.Company;
            
            chpConnection.query({
                sql: query,
                values: [cp]
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

    // Add a new Company
    async addCompany(ctx, next) {
        console.log('Controller HIT: CompanyController::addCompany');
       return new Promise((resolve, reject) => {
           const newCP = ctx.request.body;
           chpConnection.query({
               sql: 'INSERT INTO Company(comp_name, budget, location) VALUES (?, ?, ?);',
               values: [newCP.comp_name, newCP.budget, newCP.location]
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

    // Update a Company
    async updateCompany(ctx, next) {
        console.log('Controller HIT: CompanyController::updateCompany');
        return new Promise((resolve, reject) => {
            const updateCP = ctx.request.body;
            chpConnection.query({
                sql: `
                    UPDATE Company 
                    SET 
                        budget = ?,
                        location = ?
                    WHERE comp_name = ?
                    `,
                values: [updateCP.budget, updateCP.location, ctx.params.Company]
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
    
    // Delete a Company
    async deleteCompany(ctx, next) {
        console.log('Controller HIT: CompanyController::deleteCompany');
        return new Promise((resolve, reject) => {
            chpConnection.query({
                sql: `DELETE FROM Company WHERE comp_name = ?;`,
                values: [ctx.params.Company]
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

module.exports = CompanyController;
