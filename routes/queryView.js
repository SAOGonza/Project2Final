const queryViewController = new (require('../controllers/queryViewController'));
const queryViewRouter = require('koa-router')({
    prefix: '/queryView'
});

console.log('queryViewRouter FINALLY Initalized!');

queryViewRouter.get('/:queryView', queryViewController.viewQuery);

module.exports = queryViewRouter;

