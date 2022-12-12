import SQLite from "expo-sqlite";


class SQLiteQueries {
  createTable(name, columns) { // No quotation marks but remember to add the data type beside column names (separated by a space)
    let sqlQuery = `CREATE TABLE IF NOT EXISTS ${name} (id INT AUTO_INCREMENT PRIMARY KEY, ${columns})`;
    this.db.transaction((tx) => {
      tx.executeSql(sqlQuery)
    })
  }

  addRecord(table_name, columnsToAddValuesTo, values) { // Do not add quotation marks to columns, only to values (also 'columnToAddValuesTo' & 'values' must be in respective order)
    let sqlQuery = `INSERT INTO ${table_name} (${columnsToAddValuesTo}) VALUES (${values})`;
    this.db.transaction((tx) => {
      tx.executeSql(sqlQuery)
    })
  }

  deleteRecord(table_name, columnsWithValue, value) { // No quotation marks or brackets (single values) - same has been repeated from single value queries
    let sqlQuery = `DELETE FROM ${table_name} WHERE ${columnsWithValue} = '${value}'`;
    this.db.transaction((tx) => {
      tx.executeSql(sqlQuery)
    })
  }

  deleteTable(name) {
    let sqlQuery = `DROP TABLE ${name}`;
    this.db.transaction((tx) => {
      tx.executeSql(sqlQuery)
    })
  }

  updateTableRecords(table_name, column_name_to_change, new_value, column_name_identifier, old_value) {
    let sqlQuery = `UPDATE ${table_name} SET ${column_name_to_change} = '${new_value}' WHERE ${column_name_identifier} = '${old_value}'`;
    this.db.transaction((tx) => {
      tx.executeSql(sqlQuery)
    })
  }

  // sqlQuery select example: "SELECT * FROM table_name WHERE column_name = 'column_value' ORDER BY id"
  selectQuery(sqlQuery) { // Will mainly be used to search database as a specific template cannot be made due to wide variety of search methods
    this.db.transaction((tx) => {
      tx.executeSql(
        sqlQuery,
        [],
        (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            return results
          }
          else {
            console.log('No data')
          }
        }
        )
    })
  }

}

export {SQLiteQueries};

// I've made the functions so you only need to manually add quotation marks to queries which required multiple values such as 'addRecord()' and 'customQuery()'
// 'LIMIT 5' will limit the amount of records returned from a SELECT statement and is used in the same way as 'ORDERBY' and 'WHERE'
// 'JOIN' will join two tables, read about this for deeper understanding - can't write all information here
