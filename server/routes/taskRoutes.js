const express = require('express');
const Task = require('../models/Task');
const router = express.Router();
// Create a task
router.post('/', async (req, res) => {
 try {
 const task = new Task(req.body);
 await task.save();
 res.status(201).json(task);
 } catch (err) {
 res.status(400).json({ message: err.message });
 }
});
// Get all tasks
router.get('/', async (req, res) => {
 try {
 const tasks = await Task.find();
 res.json(tasks);
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
});
// Update a task
router.put('/:id', async (req, res) => {
 try {
 const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
 res.json(task);
 } catch (err) {
 res.status(400).json({ message: err.message });
 }
});
// Delete a task
router.delete('/:id', async (req, res) => {
 try {
 await Task.findByIdAndDelete(req.params.id);
 res.json({ message: 'Task deleted' });
 } catch (err) {
 res.status(500).json({ message: err.message });
 }
});
module.exports = router;