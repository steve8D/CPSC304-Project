const Numen = require("../models/numenModel");

exports.getAllNumen = (async (req, res, next) => {
    try {
      const [allNumen] = await Numen.getAllNumen();
      res.status(200).json(allNumen);
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
    }
  });
    
  exports.getNumenByID = (async (req, res, next) => {
    try {
      const [numen] = await Numen.getNumenByID(req.params.name);
      res.status(200).json(numen);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
  });

  exports.getNumenByName = (async (req, res, next) => {
    try {
      const [numen] = await Numen.getNumenByName(req.params.name);
      res.status(200).json(numen);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
  });
  
  exports.getNumenByBookID = (async (req, res, next) => {
    try {
      const [numen] = await Numen.getNumenByBookID(req.params.id);
      res.status(200).json(numen);
    } catch (err) {
        if (!err.statusCode) {
        err.statusCode = 500;
        }
    }});

exports.getNumenName = (async (req, res, next) => {
    try {
        const [numen] = await Numen.getNumenName(req.params.id);
        res.status(200).json(numen);
    } catch (err) {
        if (!err.statusCode) {
        err.statusCode = 500;
        }}});

exports.getBookNameFromNumen = (async (req, res, next) => {
    try {
        const [numen] = await Numen.getBookNameFromNumen(req.params.id);
        res.status(200).json(numen);
    } catch (err) {
        if (!err.statusCode) {
        err.statusCode = 500;
        }}});