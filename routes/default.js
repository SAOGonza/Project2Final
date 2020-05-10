const VideoGameRouter = require('./VideoGame');
const EmployeeRouter = require('./Employee');
const CompanyRouter = require('./Company');
const PlayerRouter = require('./Player');
const ProjectRouter = require('./Project');
const queryViewRouter = require('./queryView');

const defaultRouter = require('koa-router')({
    prefix: '/api'
});

defaultRouter.get('/', ctx => {
    ctx.status = 200;
    ctx.body = "Default Route Found!";
});

defaultRouter.use(
    VideoGameRouter.routes(),
    EmployeeRouter.routes(),
    CompanyRouter.routes(),
    PlayerRouter.routes(),
    ProjectRouter.routes(),
    queryViewRouter.routes()
);

module.exports = api => {
    api.use(defaultRouter.routes());
};
