/*
    DESCRIPTION: 
        Perform Google searches using Google's Custom Search API

    AUTHOR: 
        Cristian Baldi

    CONFIGURATION:
        GOOGLE_API_KEY - https://code.google.com/apis/console/

    COMMANDS:
        [google, !g, !google, /g, /google] <query>

    EXAMPLE:
        You: !g <query>
        Bot: title - link
*/

var request = require('request');

var google = function(){


    this.init = function(){
    
    };

    this.doStop = function(){

    };


    this.doMessage = function (msg, reply) {

        var re = /^(google|!g|!google|\/g|\/google)+\s+(.*)/i;
        var match = re.exec(msg.text);  
        
        if(match){ 
            reply({type:"status", status: "typing"});
            query = match[2].trim();

            if(query.length > 0){
                link = "http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=" + encodeURIComponent(query) + "&key=" + process.env.GOOGLE_API_KEY;
                
                request(link, function (error, response, data) {
                    if (!error && response.statusCode == 200) {
                        
                        data = JSON.parse(data);
                        
                        if(data["responseData"])
                        {
                            if(data["responseData"]["results"])
                            {
                                var result = data["responseData"]["results"][0];
                                
                                title = result["titleNoFormatting"];
                                link = result["url"];
                               

                                if(title && link)
                                    reply({type:"text", text: title + " - " + link})       
                            }
                        }
                    }
                });

                
            }
        }
    };

};

module.exports = google;