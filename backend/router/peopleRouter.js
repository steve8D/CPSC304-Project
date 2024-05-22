const express = require('express');
const peopleController = require('../controllers/peopleController'); 
const { route } = require('./peopleRouter');

const router = express.Router();

router
  .route('/')
  .get(peopleController.getAllPeople) 
  .post(peopleController.createPerson); 

router
  .route('/visitors')
  .get(peopleController.getAllVisitors);

router
  .route('/visitors/findByName/:name')
  .get(peopleController.getVisitorByName);

router
  .route('/findByName/:name')
  .get(peopleController.getPersonByName);

router
  .route('/findByID/:id')
  .get(peopleController.getPersonByID);

router
  .route('/visitors/findByLanguage/:languageName')
  .get(peopleController.getVisitorByLanguage);

router
  .route('/assistants')
  .get(peopleController.getAllAssistants);

router
  .route('/assistants/aggregated')
  .get(peopleController.getAllAssistantsNestedAggregationWithGroupBy);
  
module.exports = router; 