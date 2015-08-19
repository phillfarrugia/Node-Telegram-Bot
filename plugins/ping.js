/*
    DESCRIPTION: 
        Ping - pong

    AUTHOR: 
        Cristian Baldi

    COMMANDS:
        ping

    EXAMPLE:
        You: ping
        Bot: pong
*/

var ping = function(){

    this.init = function(){

    };

    this.doStop = function(done){
        done();
    };


    this.doMessage = function (msg, reply){
        if (msg.text.toLowerCase() == "ping")
            reply({type: 'text', text: 'pong'}); 

        if (msg.text.toLowerCase() == "pong")
            reply({type: 'text', text: 'ping'}); 
    };

};

module.exports = ping;