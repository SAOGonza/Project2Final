const EmployeeController = new (require('../controllers/EmployeeController'))();
const EmployeeRouter = require('koa-router')({
    prefix: '/Employee'
});

console.log('Employee Router Initialized!');
EmployeeRouter.get('/', EmployeeController.Employees);
EmployeeRouter.get('/:Employee', EmployeeController.Employee);
EmployeeRouter.post('/', EmployeeController.addEmployee, EmployeeController.Employees);
EmployeeRouter.put('/:Employee', EmployeeController.updateEmployee, EmployeeController.Employee);
EmployeeRouter.delete('/:Employee', EmployeeController.deleteEmployee, EmployeeController.Employees);

module.exports = EmployeeRouter;
