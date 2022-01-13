// Importing express module
const path = require('path');
const express = require('express');
const refresh_data = require('./utils/refresh_data');
const read_data = require('./utils/read_data');
const read_code = require('./utils/read_code');
const app = express();
 
// Chess codes list from chessgames
const chess_code_url = "https://www.chessgames.com/chessecohelp.html";
const local_store_filepath = path.join(__dirname, "1-data.json");//"./chessco_data.json";

// Getting Request
app.get('/', (req, res) => {
  read_data(chess_code_url, local_store_filepath, (error, chessco_list) => {
    if (error){
      return res.send({
          error: error
      });
    }
    data = {
      'status': 200,
      'values': chessco_list
    };
    res.send(data)
  })
})
 
app.get('/refresh', (req, res) => {
  refresh_data(chess_code_url, local_store_filepath, (error, chessco_list) => {
    if (error){
      return res.send({
          error: error
      });
    }
    data = {
      'status': 200,
      'values': chessco_list
    };
    res.send(data)
  })
})

app.get('*', (req, res) => {
  console.log(req.url);
  read_code(chess_code_url, local_store_filepath, req.url, (result) => {
    if (result.length > 0 ){
      data = {
        'status': 200,
        'values': result
      };
    } else{
      data = {
        'status': 404,
        'values': result
      };
    }

    
    res.send(data)
  })
})

// Establishing the port
const PORT = process.env.PORT ||5000;
 
// Executing the server on given port number
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));