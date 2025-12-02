const mysql = require("mysql2/promise");

let connection = null;

async function query(sql, params){
    if(null === connection){
        console.log("Connecting to database...");
        connection = await mysql.createConnection({
            host: "HOST",
            user: "USERNAME",
            password: "PASSWORD",
            database: 'DBNAME',
            connectTimeout: 3000,
        });
        console.log("Connected to database.");
    }
    sql = mysql.format(sql, params);
    console.log(sql);
    try {
        const [results] = await connection.execute(sql, params);
        return results;
    }
    catch (error){
        console.error("Query failed: ", error);
        throw error;
    }
}

module.exports = {
    query,
}
