import connection from '../connect';
const util = require('util');

function insertQuery (sql) {
    connection.query(sql, function (err, result) {
      if (err) throw err;
    });
  }

  async function selectQuery (sql) {
    var row = null;
    const query = util.promisify(connection.query).bind(connection);
    row = await query(sql);
    return row;
  }  
  
export {
    insertQuery,
    selectQuery
}