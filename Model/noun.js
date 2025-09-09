const connection = require("./connection");

async function selectAllRows(parameters = {}) {
    let sqlStatement = `SELECT
                            fantasy_armaments.id,
                            fantasy_armaments.name, 
                            type,
                            materials,
                            source_material_id,
                            img_link,
                            img_is_file,
                            notes,
                            source_materials.id as sm_id,
                            source_materials.name as sm_name,
                            source_materials.abbreviated_name as sm_abbreviated_name,
                            source_materials.developer as sm_dev
                        FROM fantasy_armaments
                        INNER JOIN source_materials ON fantasy_armaments.source_material_id = source_materials.id`
    let queryParameters = [];
    whereStatements = [];
    orderByStatements = [];
    console.log(parameters.query);


    //Sorting by source material
    if (typeof parameters.query.sm_id !== 'undefined' && (parameters.query.sm_id === "ASC" || parameters.query.sm_id === "DESC")) {
        if (parameters.query.sm_id === "ASC") orderByStatements.push("sm_id ASC");
        else if (parameters.query.sm_id === "DESC") orderByStatements.push("sm_id DESC");
        else console.log("How did you get this message?");
    }

    //Sorting by ID
    if (typeof parameters.query.id !== 'undefined' && (parameters.query.id === "ASC" || parameters.query.id === "DESC")) {
        if (parameters.query.id === "ASC") orderByStatements.push("id ASC");
        else if (parameters.query.id === "DESC") orderByStatements.push("id DESC");
        else console.log("How did you get this message?");
    }

    //Filtering by type
    if (typeof parameters.query.type !== 'undefined'){
        whereStatements.push("type = ?");
        queryParameters.push(parameters.query.type);
    }

    //Filtering by materials
    if (typeof parameters.query.materials !== 'undefined'){
        whereStatements.push("materials = ?");
        queryParameters.push(parameters.query.materials);
    }

    //Filtering by source material
    if (typeof parameters.query.source_material_id !== 'undefined'){
        whereStatements.push("source_material_id = ?");
        queryParameters.push(parameters.query.source_material_id);
    }

    //Dynamically add WHERE expressions to SELECT statements if needed
    if (whereStatements.length > 0) {
        sqlStatement += ' WHERE ' + whereStatements.join(' AND ');
    }
    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (orderByStatements.length > 0) {
        sqlStatement += ' ORDER BY ' + orderByStatements.join(', ');
    }
    //Dynamically add ORDER BY expressions to SELECT statements if needed
    if (typeof parameters.query.limit !== 'undefined' && parameters.query.limit > 0) {
        sqlStatement += ' LIMIT ' + parameters.query.limit;
    }

    return await connection.query(sqlStatement, queryParameters);
}

async function selectById(parameters = {}) {
    const sqlStatement = "SELECT * FROM fantasy_armaments WHERE id = ?"
    const queryParameters = [parameters.params.id];
    return await connection.query(sqlStatement, queryParameters);
}

async function addRow(parameters = {}) {
    const sqlStatement = "INSERT INTO fantasy_armaments (name, type, materials, source_material_id, notes, img_link, img_is_file) VALUES (?, ?, ?, ?, ?, ?, ?)"
    
    //Allows users to not submit notes
    let notes = ' ';
    if (parameters.notes !== undefined) notes = parameters.notes;

    let queryParameters = [ 
        parameters.name, 
        parameters.type, 
        parameters.materials,
        parameters.source_material_id,
        notes,
        //Need to find how to get new file name from here. Right now it just uses a link
        parameters.file,
        //newfilename,
        0
    ];
    return await connection.query(sqlStatement, queryParameters);
}

async function updateRow(parameters = {}) {
    const sqlStatement = `UPDATE fantasy_armaments 
    SET name = ?, 
        type = ?, 
        materials = ?, 
        source_material_id = ?, 
        notes = ? 
    WHERE id = ?`

    //Allows users to not submit notes
    let notes = ' ';
    if (parameters.notes !== undefined) notes = parameters.notes;

    let queryParameters = [
        parameters.name, 
        parameters.type, 
        parameters.materials,
        parameters.source_material_id,
        notes,
        parameters.id
    ];

    return await connection.query(sqlStatement, queryParameters);
}

async function deleteRow(parameters = {}) {
    const sqlStatement = "DELETE FROM fantasy_armaments WHERE id = ?"
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