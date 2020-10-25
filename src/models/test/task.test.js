const Task = require('../taskModel');

describe('Checks taskModel', ()=>{
    it('Check task modell fields', ()=>{
    const fields = Task.schema.obj;
    expect(fields.content = '').toBeDefined();
    expect(fields.prior).toBeDefined();
    expect(fields.deadline).toBeDefined();
    expect(fields.isDone).toBeDefined();
    expect(fields.project).toBeDefined();
    });
});
