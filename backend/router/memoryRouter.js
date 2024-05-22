const express = require('express');
const memoryController = require('../controllers/memoryController'); 

const router = express.Router();

router
  .route('/')
  .get(memoryController.getAllMemories) 
  .post(memoryController.createMemory); 

router
  .route('/findByName/:name')
  .get(memoryController.getMemoryByName);

router
  .route('/findByID/:id')
  .get(memoryController.getMemoryByID)
  
module.exports = router;