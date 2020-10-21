const Project = require('../projectModel');

describe('Projects model', () => {
  it('project models instance should contain empty tasks array ', () => {
    const emptyProject = new Project();
    expect(emptyProject.tasks).toBeDefined();
    expect(emptyProject.tasks.length).toBe(0);
  });
});
