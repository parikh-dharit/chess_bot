// Importing express module
const express = require('express');
const refresh_data = require('./utils/refresh_data')
const { strictEqual } = require('assert');
const app = express();
 
// Chess codes list from chessgames
const chess_code_url = "https://www.chessgames.com/chessecohelp.html";

// Getting Request
app.get('/', (req, res) => {
 
    // Sending the response
    res.send('Hello World!')
    
    // Ending the response
    res.end()
})
 
app.get('/refresh', (req, res) => {
  refresh_data(chess_code_url, (error, chessco_list) => {
    if (error){
      return res.send({
          error: error
      });
    }
    data = {
      'status': 200,
      'values': chessco_list//.map(eachElem => { eachElem.move_code, eachElem.move_name, eachElem.move_list })
    };
    res.send(data)
  })
})

// Establishing the port
const PORT = process.env.PORT ||5000;
 
// Executing the server on given port number
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));