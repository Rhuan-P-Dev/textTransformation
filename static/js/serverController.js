
var chain_callback = {}

export class ServerController {

    send(text,callBack){
        socket.send({"cmd": "sendToModel", "data":text})
        chain_callback = callBack
    }

}

socket.on('from_server', function(msg) {
    if(msg.cmd == "responseOfModel"){
        chain_callback.init(msg.data)
    }
})



var Server = new ServerController()