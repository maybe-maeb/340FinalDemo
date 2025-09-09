const connection = require("./connection");

async function selectAllRows(parameters = {}) {
    let sqlStatement = `SELECT * FROM 340demo`

    return await connection.query(sqlStatement, queryParameters);
}

async function selectById(parameters = {}) {
    const sqlStatement = "SELECT * FROM 340demo WHERE id = ?"
    const queryParameters = [parameters.params.id];
    return await connection.query(sqlStatement, queryParameters);
}

async function addRow(parameters = {}) {
    const sqlStatement = "INSERT INTO 340demo (info) VALUES (?)"
    
    let queryParameters = [ 
        parameters.info
    ];

    return await connection.query(sqlStatement, queryParameters);
}

async function updateRow(parameters = {}) {
    const sqlStatement = `UPDATE 340demo 
    SET info = ?
    WHERE id = ?`

    let queryParameters = [
        parameters.info,
        parameters.id
    ];

    return await connection.query(sqlStatement, queryParameters);
}

async function deleteRow(parameters = {}) {
    const sqlStatement = "DELETE FROM 340demo WHERE id = ?"
    const queryParameters = [parameters.params.id];
    return await connection.query(sqlStatement, queryParameters);
}

module.exports = {
    selectAllRows,
    selectById,
    addRow,
    updateRow,
    deleteRow
}