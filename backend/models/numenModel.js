const database = require('../utils/database.js').connection;

class NumenModel {  
    static getAllNumen() {
      return database.promise().query('SELECT m.MemoryID, m.memoryName, m.memorySources, m.memoryIsSound, m.memoryIsOmen, m.memoryIsPersistent, m.memoryIsWeather, n.bookID FROM Memory m, Numen n WHERE n.numenID = m.memoryID ORDER BY m.memoryID ASC;');
    }

    static getNumenByID(ID) {
      return database.promise().query("SELECT * FROM Memory INNER JOIN Numen ON Numen.numenID = Memory.memoryID AND numenID = ?", [ID]);
    }

    static getNumenByName(name) {
        return database.promise().query("SELECT * FROM Memory m WHERE m.memoryName LIKE ? AND m.memoryName IN (SELECT m.memoryName FROM Memory m INNER JOIN Numen ON m.memoryID = Numen.numenID)", [`%${name}%`]);
      }
  
    static getNumenByBookID(bookID) {
        return database.promise().query("SELECT * FROM Memory INNER JOIN Numen ON Numen.numenID = Memory.memoryID AND Numen.bookID = ?", [bookID]);
      }
    
    static getNumenName(numenID) {
        return database.promise().query("SELECT Memory.memoryName FROM Memory INNER JOIN Numen ON Numen.numenID = Memory.memoryID AND Numen.numenID = ?", [numenID]);
    }

    static getBookNameFromNumen(numenID) {
        return database.promise().query("SELECT b.bookName FROM Book b, Numen n WHERE WHERE b.numenID = n.numenID AND n.numenID = ?", [numenID])
    }
};

module.exports = NumenModel