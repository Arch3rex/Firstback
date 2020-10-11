const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	username:{type:String,required:true},
	password:{type:String,required:true},
	projects:[{type:mongoose.Schema.Types.ObjectId,ref:"Project"}]
});
const projectSchema = new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	name:{type:String,required:true},
	tasks:[{type:mongoose.Schema.Types.ObjectId,ref:"Task"}],
	user:{type:mongoose.Schema.Types.ObjectId,ref:"User"}
});
const taskSchema = new mongoose.Schema({
	_id:mongoose.Schema.Types.ObjectId,
	content:{type:String,required:true},
	prior:{type:Number,required:true},
	deadline:String, 
	isdone:String,
	project:{type:mongoose.Schema.Types.ObjectId,ref:"Project"}
});
const User = new mongoose.model("User",userSchema);
const Project = new mongoose.model("Project",projectSchema);
const Task = new mongoose.model("Task",taskSchema);
exports.User = User;
exports.Project = Project;
exports.Task = Task;