const CompanyController = new (require('../controllers/CompanyController'))();
const CompanyRouter = require('koa-router')({
    prefix: '/Company'
});

console.log('Company Router Initialized!');
CompanyRouter.get('/', CompanyController.Companys);
CompanyRouter.get('/:Company', CompanyController.Company);
CompanyRouter.post('/', CompanyController.addCompany, CompanyController.Companys);
CompanyRouter.put('/:Company', CompanyController.updateCompany, CompanyController.Company);
CompanyRouter.delete('/:Company', CompanyController.deleteCompany, CompanyController.Companys);

module.exports = CompanyRouter;
