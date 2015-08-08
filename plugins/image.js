/*
    DESCRIPTION: 
        Search for images with a query using Google's Custom Search API

    AUTHOR: 
        Phill Farrugia

    CONFIGURATION:
        GOOGLE_API_KEY - https://code.google.com/apis/console/

    COMMANDS:
        [img, image, !img, !image, \img, \image] <query>

    EXAMPLE:
        You: img <query>
        Bot: Url
*/

var request = require('request');

var image = function() {
    
    this.init = function() {

    };

    this.doStop = function() {

    };

    this.doMessage = function(msg, reply) {
        var re = /(img|image|\\img|\\image|!img|!image)+\s+(.*)/i;
        var match = re.exec(msg.text);

        if (match) {
            reply({ type: "status", status: "typing" });
            query = match[2].trim();

            if (query.length > 0) {
                url = "https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=" + encodeURIComponent(query) + "&key=" + process.env.GOOGLE_API_KEY;
                request(url, function(error, response, data) {
                    if (!error && response.statusCode == 200) {
                        data = JSON.parse(data);
                        var results = data["responseData"]["results"];
                        if (results.length > 0) {
                            var randomResult = results[Math.floor(Math.random()*results.length)];
                            reply({ type: "text", text: randomResult.url });
                        }
                    } else {
                        reply({ type: "text", text: "Oops! Try again later" });
                    }
                })
            }
        }
    };
}

module.exports = image;
