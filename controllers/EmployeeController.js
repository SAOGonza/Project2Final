const chpConnection = require('../database/CHPConnection');

// Controller that interacts with Employee to retrieve data.
class EmployeeController {
    constructor() {
	console.log('Employee Controller Initialized!');
    }

    // Fetches all Employees
    async Employees(ctx) {
	console.log('Controller HIT: EmployeeController::Employees');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM Employee';

	    chpConnection.query(query, (err, res) => {
		if(err) {
		    reject(`Error querying CHP.Employee: ${err}`);
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

    // Fetches a single Employee
    async Employee(ctx) {
	console.log('Controller HIT: EmployeeController::Employee');
	return new Promise((resolve, reject) => {
	    const query = 'SELECT * FROM Employee WHERE name = ?;';
	    const em = ctx.params.Employee;

	    chpConnection.query({
		sql: query,
		values: [em]
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

    // Add a new Employee
    async addEmployee(ctx, next) {
	console.log('Controller HIT: EmployeeController::addEmployee');
	return new Promise((resolve, reject) => {
	    const newEM = ctx.request.body;
	    chpConnection.query({
		sql: 'INSERT INTO Employee(emp_id, name, DoB, Salary, worksFor) VALUES (?, ?, ?, ?, ?);',
		values: [newEM.emp_id, newEM.name, newEM.DoB, newEM.Salary, newEM.worksFor]
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

    // Update a Employee
    async updateEmployee(ctx, next) {
	console.log('Controller HIT: EmployeeController::updateEmployee');
	return new Promise((resolve, reject) => {
	    const updateEM = ctx.request.body;
	    chpConnection.query({
		sql: `
                    UPDATE Employee 
                    SET 
                        name = ?,
                        DoB = ?,
                        Salary = ?
                    WHERE emp_id = ?
                    `,
		values: [updateEM.name, updateEM.DoB, updateEM.Salary, ctx.params.Employee]
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

    // Delete an Employee
    async deleteEmployee(ctx, next) {
	console.log('Controller HIT: EmployeeController::deleteEmployee');
	return new Promise((resolve, reject) => {
	    chpConnection.query({
		sql: `DELETE FROM Employee WHERE name = ?;`,
		values: [ctx.params.Employee]
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

module.exports = EmployeeController;
