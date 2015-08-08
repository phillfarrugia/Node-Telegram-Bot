/*
    DESCRIPTION: 
        Perform YouTube searches using Youtube's Data API

    AUTHOR: 
        Cristian Baldi

    CONFIGURATION:
        GOOGLE_API_KEY - https://code.google.com/apis/console/

    COMMANDS:
        [yt, youtube, \yt, \youtube, !yt, !youtube] <query>

    EXAMPLE:
        You: !yt test
        Bot: title - link
*/

var request = require('request');

var yt = function(){


    this.init = function(){

    };

    this.doStop = function(){

    };


    this.doMessage = function (msg, reply) {
        var re = /^(yt|youtube|\\yt|\\youtube|!yt|!youtube)+\s+(.*)/i;
        var match = re.exec(msg.text);  
        
        if(match){ 
            reply({type:"status", status: "typing"});
            query = match[2].trim();

            if(query.length > 0){
                link = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + encodeURIComponent(query) + "&key=" + process.env.GOOGLE_API_KEY;
                
                request(link, function (error, response, data) {
                    if (!error && response.statusCode == 200) {
                        
                        data = JSON.parse(data);
                        
                        if(data["items"])
                        {
                            var videos = data["items"];
                            
                            for (i=0,len=videos.length;i<len;i++)
                            {
                                if(videos[i]["id"]["kind"] == "youtube#video")
                                {
                                    videoId = videos[i]["id"]["videoId"];
                                    videoTitle = videos[i]["snippet"]["title"];
                                    break;
                                }
                            }
                            if(videoId && videoTitle)
                                reply({type:"text", text: videoTitle + " - " + "http://www.youtube.com/watch?v=" + videoId})       
                        }
                    }
                });

                
            }
        }
    };

};

module.exports = yt;