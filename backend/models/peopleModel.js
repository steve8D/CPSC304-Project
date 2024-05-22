const database = require('../utils/database.js').connection;

class PeopleModel {  
    static getAllPeople() {
      return database.promise().query('SELECT * FROM People ORDER BY peopleID ASC');
    }

    static getPersonByName(name) {
      return database.promise().query("SELECT * FROM People WHERE peopleName = ? OR peopleName LIKE ? ORDER BY peopleID ASC", [name, `%${name}%`]);
    }

    static getPersonByID(ID) {
      return database.promise().query("SELECT * FROM People WHERE peopleID = ? OR peopleID LIKE ? ORDER BY peopleID ASC", [ID, `%${ID}%`]);
    }

    static getAllVisitors() {
      return database.promise().query(
      `SELECT p.peopleID, p.peopleName, s.skillName as language
      FROM Visitor v, Language l, Skill s, People p
      WHERE v.languageID = l.languageID
      AND v.visitorID = p.peopleID
      AND s.skillID = l.languageID;`
      )
    }

    static getVisitorByName(name) {
      return database.promise().query(
        `SELECT p.peopleName, s.skillName as language
        FROM Visitor v, Language l, Skill s, People p
        WHERE v.languageID = l.languageID
        AND v.visitorID = p.peopleID
        AND s.skillID = l.languageID
        AND p.peopleName LIKE ?;`, [`%${name}%`]
        )
    }

    static getVisitorByLanguage(languageName) {
      return database.promise().query(
      `SELECT p.peopleName, s.skillName as language
       FROM Visitor v, Language l, Skill s, People p
       WHERE v.languageID = l.languageID
       AND v.visitorID = p.peopleID
       AND s.skillID = l.languageID
       AND s.skillName LIKE ?;`, [`%${languageName}%`]
      )
    }

    static getNonLanguageTeachingVisitors() {
      return database.promise().query(
      `SELECT p.peopleName
      FROM Visitor v, People p
      WHERE NOT EXISTS (
          SELECT 1
          FROM Language l
          WHERE l.languageID != v.languageID
      ) AND v.visitorID = p.peopleID;`
      )
    }

    static getUniqueLanguageVisitor() {
      return database.promise().query(
      `SELECT v.languageID, COUNT(p.peopleName) as numberOfPeople
      FROM Visitor v, People p
      WHERE v.visitorID = p.peopleID AND v.languageID IS NOT NULL
      GROUP BY v.languageID
      HAVING COUNT(*) < 2;`
      )
    }

    static getAllAssistants() {
      return database.promise().query(
        `SELECT a.assistantID, p.peopleName as assistantName, a.assistantSpecialty, a.assistantCost, a.assistantLocation
         FROM Assistant a, People p
         WHERE a.assistantID = p.peopleID
        `
      )
    }

    // Return the location of the assistants ingame where their cost is higher than the average cost 
    // to all assistants from all locations in the game (too long to put in function name)
    static getAllAssistantsNestedAggregationWithGroupBy() {
      return database.promise().query(
        `SELECT a.assistantLocation, AVG(a.assistantCost) as averageAssistantCost
        FROM Assistant a
        WHERE a.assistantCost > (SELECT AVG(assistantCost) FROM Assistant)
        GROUP BY a.assistantLocation;    
        `
      )
    }
  
    static create(newPerson) {
      const { personID, personName} = newPerson;
  
      // Perform the database insert
      return database
        .promise()
        .query(
          'INSERT IGNORE INTO Person(personID, personName) VALUES (?, ?)',
          [personID, personName]
        );
    }
};

module.exports = PeopleModel