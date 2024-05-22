const People = require("../models/peopleModel");


exports.getAllPeople = (async (req, res, next) => {
  try {
    const [allPeople] = await People.getAllPeople();
    res.status(200).json(allPeople);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});

exports.getAllVisitors = (async (req, res, next) => {
  try {
    let allVisitors = [];
    if (req.query.nonLanguageTeaching) {
      [allVisitors] = await People.getNonLanguageTeachingVisitors();
    } else if (req.query.uniqueLanguageVisitor) {
      [allVisitors] = await People.getUniqueLanguageVisitor();
    } else {
      [allVisitors] = await People.getAllVisitors();
    }
    res.status(200).json(allVisitors);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});

exports.getVisitorByName = (async (req, res, next) => {
  try {
    const [person] = await People.getVisitorByName(req.params.name);
    res.status(200).json(person);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

exports.getVisitorByLanguage = (async (req, res, next) => {
  console.log(req.params);
  try {
    const [person] = await People.getVisitorByLanguage(req.params.languageName);
    res.status(200).json(person);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

exports.getAllAssistants = (async (req, res, next) => {
  try {
    const [allAssistants] = await People.getAllAssistants();
    res.status(200).json(allAssistants);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});

exports.getAllAssistantsNestedAggregationWithGroupBy = (async (req, res, next) => {
  try {
    const [location] = await People.getAllAssistantsNestedAggregationWithGroupBy();
    res.status(200).json(location);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
  }
});
  
exports.getPersonByName = (async (req, res, next) => {
  try {
    const [person] = await People.getPersonByName(req.params.name);
    res.status(200).json(person);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});

exports.getPersonByID = (async (req, res, next) => {
  try {
    const [person] = await People.getPersonByID(req.params.id);
    res.status(200).json(person);
} catch (err) {
  if (!err.statusCode) {
    err.statusCode = 500;
  }
}
});
  
exports.createPerson = async (req, res, next) => {
  try {
    const {personID, personName} = req.body;

    // Validate the incoming data as needed

    // Create an object with the user input
    const newPerson = {
      personID,
      personName,
    };

    // Call the create method in the PeopleModel
    await People.create(newPerson);

    res.status(200).json({ message: 'Person created successfully' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
  exports.updatePerson = (async (req, res, next) => {
    // const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    //   new: true,
    //   runValidators: true
    // });
  
    // if (!tour) {
    //   return next(new AppError('No tour found with that ID', 404));
    // }
  
    // res.status(200).json({
    //   status: 'success',
    //   data: {
    //     tour
    //   }
    // });
  });
  
  exports.deletePerson = (async (req, res, next) => {
    // const tour = await Tour.findByIdAndDelete(req.params.id);
  
    // if (!tour) {
    //   return next(new AppError('No tour found with that ID', 404));
    // }
  
    // res.status(204).json({
    //   status: 'success',
    //   data: null
    // });
  });