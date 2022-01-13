// Importing express module
const cheerio = require('cheerio');
const rp = require('request-promise');
const express = require('express');
const fs = require('fs');
const app = express();
 
// Chess codes list from chessgames
const chess_code_url = "https://www.chessgames.com/chessecohelp.html";

rp(chess_code_url)
  .then(function(html){
    //success!
    const chessco_list = [];
    const $ = cheerio.load(html);
    //console.log($('body > font > p > table > tbody > tr:nth-child(1) > td:nth-child(1) > font').text());
    //console.log($('body > font > p > table > tbody > tr:nth-child(1) > td:nth-child(2) > font > b').text());
    //console.log($('body > font > p > table > tbody > tr:nth-child(1) > td:nth-child(2) > font > font').text());
    $('body > font > p > table > tbody > tr').each((index, element) => {
      move_code = $($(element).find("td")[0]).text();
      move_name = $($($(element).find("td")[1]).find("font > b")).text();
      move_list = $($($(element).find("td")[1]).find("font > font")).text();
      chessco_list.push({move_code, move_name, move_list});
    })

    console.log(chessco_list);
  })
  .catch(function(err){
    //handle error
  });

// Getting Request
app.get('/', (req, res) => {
 
    // Sending the response
    res.send('Hello World!')
    
    // Ending the response
    res.end()
})
 
// Establishing the port
const PORT = process.env.PORT ||5000;
 
// Executing the server on given port number
app.listen(PORT, console.log(
  `Server started on port ${PORT}`));