const express = require('express');
const numenController = require('../controllers/numenController'); 

const router = express.Router();

router
  .route('/')
  .get(numenController.getAllNumen); 

router
  .route('/findByID/:id')
  .get(numenController.getNumenByID);

router
  .route('/findByName/:name')
  .get(numenController.getNumenByName);

router
  .route('/findByBookID/:bookid')
  .get(numenController.getNumenByBookID);
  
router.route('/getNumenName/:numenid').get(numenController.getNumenName);

router.route('/getBookNameFromNumen/:numenid').get(numenController.getBookNameFromNumen);

module.exports = router;