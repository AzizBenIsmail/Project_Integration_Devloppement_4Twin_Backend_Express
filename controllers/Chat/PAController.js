// Import necessary modules
const express = require('express');
const PA = require("../../models/PA");
const userModel = require('../../models/userSchema');

// Controller for handling PA model requests
const PAController = {
  // GET all PAs for a specific user
  getAll: async (req, res) => {
    try {
      const userId = req.params.userId;
     const PAs = await PA.find({ userId });
      res.json(PAs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },



  

  // GET a specific PA by ID
  getById: async (req, res) => {
    try {
      const username = req.params.id;
      const user = await userModel.findOne({ username });
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      const PAs = await PA.find({ userId: user._id });
      if (!PAs) {
        return res.status(404).json({ msg: 'PAs not found' });
      }
      res.json(PAs);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },


  // POST a new PA for a specific user
  create: async (req, res) => {
    try {
      const { userId, message, answer } = req.body;
      const newPA = new PA({ userId, message, answer });
      await newPA.save();
      res.json(newPA);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  // PUT/update an existing PA by ID
  update: async (req, res) => {
    try {
      const PAId = req.params.id;
      const { message, answer } = req.body;
      const PA = await PA.findById(PAId);
      if (!PA) {
        return res.status(404).json({ msg: 'PA not found' });
      }
      PA.message = message;
      PA.answer = answer;
      await PA.save();
      res.json(PA);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },

  // DELETE an existing PA by ID
  delete: async (req, res) => {
    try {
      const PAId = req.params.id;
      const PA = await PA.findById(PAId);
      if (!PA) {
        return res.status(404).json({ msg: 'PA not found' });
      }
      await PA.remove();
      res.json({ msg: 'PA deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  },
};

module.exports = PAController;