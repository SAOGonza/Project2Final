const ProjectController = new (require('../controllers/ProjectController'))();
const ProjectRouter = require('koa-router')({
    prefix: '/Project'
});

console.log('Project Router Initialized!');
ProjectRouter.get('/', ProjectController.Projects);
ProjectRouter.get('/:Project', ProjectController.Project);
ProjectRouter.post('/', ProjectController.addProject, ProjectController.Projects);
ProjectRouter.put('/:Project', ProjectController.updateProject, ProjectController.Project);
ProjectRouter.delete('/:Project', ProjectController.deleteProject, ProjectController.Projects);

module.exports = ProjectRouter;
