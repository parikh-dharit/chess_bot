const cheerio = require('cheerio');
const rp = require('request-promise');
const fs = require('fs');

const refresh_data = (url, callback) => {
    //const url_response = request.get(url);
    //const url_response = await fetch(url); -- requires node 12.20 or up
    console.log("Refresh data called");

    rp(url)
    .then(function(url_response){
        const chessco_list = [];
        const $ = cheerio.load(url_response);
            
        //console.log($('body > font > p > table > tbody > tr:nth-child(1) > td:nth-child(1) > font').text()); -- move code
        //console.log($('body > font > p > table > tbody > tr:nth-child(1) > td:nth-child(2) > font > b').text()); -- move name
        //console.log($('body > font > p > table > tbody > tr:nth-child(1) > td:nth-child(2) > font > font').text()); -- list of moves
        $('body > font > p > table > tbody > tr').each((index, element) => {
            move_code = $($(element).find("td")[0]).text();
            move_name = $($($(element).find("td")[1]).find("font > b")).text();
            move_list = $($($(element).find("td")[1]).find("font > font")).text();
            const move_seq_list = [];
            let move_num = null;
            let move_white = null;
            let move_black = null;
            move_seq = move_list.split(' ');
            for (let index = 0, len = move_seq.length; index < len; ++index) {
                const element = move_seq[index];
                // 1st element is the move number, 2nd is move by white and 3rd is move by black
                if (index%3==0){
                    move_num = element;
                    move_white = null;
                    move_black = null;
                } else if(index%3==1){
                    move_white = element;
                } else {
                    move_black = element;
                    move_seq_list.push({move_num, move_white, move_black});
                }

                if ( (index==move_seq.length-1) && (index%3!=2)){//if last move is not a complete set (move #, white move, black move)
                    move_seq_list.push({move_num, move_white, move_black});
                }

            }
            //console.log({move_code, move_name, move_list, move_seq_list})
            chessco_list.push({move_code, move_name, move_list, move_seq_list});
        });

        // Save the parsed data to a file
        fs.writeFile("1-data.json", JSON.stringify(chessco_list), err => {
        
            // Checking for errors
            if (err) throw err; 
        
            console.log("Done writing"); // Success
        });

        // Callback function -- sends list as a response 
        callback(undefined, chessco_list);
    })
    .catch(function(err){
        //handle error
        callback(err)
      });
}

  module.exports = refresh_data