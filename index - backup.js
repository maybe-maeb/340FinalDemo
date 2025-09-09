//Make sure to run the following commands in the amazon console where this file is located
//npm install mysql2

let http = require('http');

const noun = require("./Model/noun.js");

function ping(){
  console.log("Pinged!");
}

async function DatabaseTest() {
    try {
        // Example 1: Add a row
        const addResult = await noun.addRow({ info: 'Test info from script' });
        console.log('Add Result:', addResult);

        // Example 2: Get all rows
        const allRows = await noun.selectAllRows();
        console.log('All Rows:', allRows);

        // Example 3: Select specific row (replace ID with a real one)
        const selectedRow = await noun.selectById({ params: { id: 1 } });
        console.log('Selected Row:', selectedRow);

        // Example 4: Update a row
        const updateResult = await noun.updateRow({ id: 1, info: 'Updated info' });
        console.log('Update Result:', updateResult);

        // Example 5: Delete a row
        const deleteResult = await noun.deleteRow({ id: 1 });
        console.log('Delete Result:', deleteResult);

    } catch (error) {
        console.error('Error running DB test:', error);
    }
}

DatabaseTest();

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World!');
}).listen(3000);

console.log("Server running!");