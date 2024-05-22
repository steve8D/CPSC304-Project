const database = require('../utils/database.js').connection;

class BookModel {  
  static getBooks(options) {
    let query = 'SELECT * FROM Book';
    let parameters = [];

    if (options) {
      if (options.columns) {
        query = `SELECT ${options.columns} FROM Book`;
      } else if (options.groupBy) {
        query = `SELECT ${options.groupBy}, COUNT(*) as bookCount FROM Book`;
      }

      // search mode (by book name, by bookID, by memoryID associated with that book)
      if (options.name) {
        query += ` WHERE bookName = ? OR bookName LIKE ?`;
        parameters = [options.name, `%${options.name}%`]
      } else if (options.ID) {
        query += ' WHERE bookID = ?';
        parameters = [options.ID]
      } else if (options.memoryID) {
        query += ' WHERE memoryID = ?';
        parameters = [options.memoryID]
      }

      if (options.groupBy) {
        query += ` GROUP BY ${options.groupBy}`;
      }
    }
    console.log(query, parameters)
    return parameters.length == 0? database.promise().query(query): database.promise().query(query, parameters);
  }

  static async post(input) {
    // handle id increment
    const [latestBookEntry] = await database.promise().query('SELECT bookID FROM Book ORDER BY bookID DESC LIMIT 1')
    const newID = parseInt(latestBookEntry[0].bookID.slice(2,5)) + 1
    const newBookID = `BK${String(newID).padStart(3, '0')}`

    return database.promise().query('INSERT INTO Book(bookID, bookName, language, aspectID, memoryID, elementOfTheSoulID, numenID) VALUES (?, ?, ?, ?, ?, NULL, NULL)'
    , [newBookID, input.bookName, input.language, input.aspectID, input.memoryID]);
  }

  static async update(bookID, updatedData) {
    const updateColumns = Object.keys(updatedData)
        .map(column => `${column} = ?`)
        .join(', ');
        
    const updateQuery = `UPDATE Book SET ${updateColumns} WHERE bookID = ?`;
    
    const values = [...Object.values(updatedData), bookID];
    return database.promise().query(updateQuery, values);
  }

  static async deleteBook(bookID) {
    const query = 'DELETE FROM Book WHERE bookID = ?';
    return database.promise().query(query, [bookID]);
  }
};

module.exports = BookModel