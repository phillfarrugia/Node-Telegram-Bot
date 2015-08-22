/*
    DESCRIPTION: 
        Get a specific reddit post from r/frontpage

    AUTHOR: 
        Phill Farrugia

    COMMANDS:
        [reddit, !reddit, /reddit] <1-25>

    EXAMPLE:
        You: reddit 1
        Bot: r/pics - An Amazonian girl and her pet sloth 
        http://reddit.com/r/pics/comments/3hxg1e/an_amazonian_girl_and_her_pet_sloth/
*/

var request = require('request');

var image = function() {
    
    this.init = function() {
        console.log("STARTING REDDIT");
    };

    this.doStop = function(done) {
        done();
    };

    this.doMessage = function(msg, reply) {
        var re = /^(reddit|\/reddit|\reddit|!reddit)+\s*(\d+)?/;
        var match = re.exec(msg.text);

        if (match) {
            reply({ type: "status", status: "typing" });
            query = match[2].trim();
            query--; // subtract 1 due to 0 indexed data

            if (query > -1) {
                console.log(query);
                url = "https://www.reddit.com/.json";
                request(url, function(error, response, data) {
                    if (!error && response.statusCode == 200) {
                        data = JSON.parse(data);
                        var results = data["data"]["children"];
                        if (results.length > query) {
                            var post = results[query]["data"];
                            console.log("POST: " + post);
                            var permalink = post["permalink"];
                            console.log("permalink: " + permalink);
                            var title = post["title"];
                            console.log("title: " + title);
                            var subreddit = post["subreddit"];
                            console.log("subreddit: " + subreddit);
                            var msg = "r/" + subreddit + " - " + title + " http://reddit.com" + permalink;
                            console.log("msg: " + msg);
                            reply({ type: "text", text: msg });
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
