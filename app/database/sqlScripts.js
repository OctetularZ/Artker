class SQLQueries {
  connectToServer() {
    let mysql = require('mysql')

    let con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'AregonV@@@@236'
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log('Connected!');
    });

    return con;
  }

  createDatabase() {
    let con = this.connectToServer();

    con.query("CREATE DATABASE Artker", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  }

  connectToDatabase() {
    let mysql = require('mysql')

    let con = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'AregonV@@@@236',
      database: 'Artker'
    });

    con.connect(function(err) {
      if (err) throw err;
      console.log('Connected!');
    });

    return con;
  }

  createTable(name, columns) { // No quotation marks but remember to add the data type beside column names (separated by a space)
    let con = this.connectToDatabase();

    let sqlQuery = `CREATE TABLE ${name} (id INT AUTO_INCREMENT PRIMARY KEY, ${columns})`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  }

  addRecord(table_name, columnsToAddValuesTo, values) { // Do not add quotation marks to columns, only to values (also 'columnToAddValuesTo' & 'values' must be in respective order)
    let con = this.connectToDatabase();

    let sqlQuery = `INSERT INTO ${table_name} (${columnsToAddValuesTo}) VALUES (${values})`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log("Record inserted");
    });
  }

  deleteRecord(table_name, columnsWithValue, value) { // No quotation marks or brackets (single values) - same has been repeated from single value queries
    let con = this.connectToDatabase();

    let sqlQuery = `DELETE FROM ${table_name} WHERE ${columnsWithValue} = '${value}'`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
  }

  deleteTable(name) {
    let con = this.connectToDatabase();

    let sqlQuery = `DROP TABLE ${name}`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log("Table deleted");
  });
  }

  updateTableRecords(table_name, column_name_to_change, new_value, column_name_identifier, old_value) {
    let con = this.connectToDatabase();

    let sqlQuery = `UPDATE ${table_name} SET ${column_name_to_change} = '${new_value}' WHERE ${column_name_identifier} = '${old_value}'`;
    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log(result.affectedRows + " record(s) updated");
    });
  }

  // sqlQuery select example: "SELECT * FROM table_name WHERE column_name = 'column_value' ORDER BY id"
  customQuery(sqlQuery) { // Will mainly be used to search database as a specific template cannot be made due to wide variety of search methods
    let con = this.connectToDatabase();

    con.query(sqlQuery, function (err, result) {
      if (err) throw err;
      console.log("Query Executed");
    });
  }

}

export {SQLQueries};

// I've made the functions so you only need to manually add quotation marks to queries which required multiple values such as 'addRecord()' and 'customQuery()'
// 'LIMIT 5' will limit the amount of records returned from a SELECT statement and is used in the same way as 'ORDERBY' and 'WHERE'
// 'JOIN' will join two tables, read about this for deeper understanding - can't write all information here
