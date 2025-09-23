const mysql = require("mysql2/promise");

let connection = null;

async function query(sql, params){
    if(null === connection){
        console.log("Connecting to database...");
        connection = await mysql.createConnection({
            host: "student-databases.cvode4s4cwrc.us-west-2.rds.amazonaws.com",
            user: "MAE",
            password: "gs6rjkkiNTnHqJFaG6GO3ec1J3c40KG6MQ7",
            database: 'MAE',
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