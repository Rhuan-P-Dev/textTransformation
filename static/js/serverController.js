
var chain_callback = {}

export class ServerController {

    send(text,callBack){
        socket.send({"cmd": "sendToModel", "data":text})
        chain_callback = callBack
    }

    setParam(param, value){
        socket.send({"cmd": "setParam", "data":{"param":param,"value":value}})
    }

}

socket.on('from_server', function(msg) {
    if(msg.cmd == "responseOfModel"){
        chain_callback.init(msg.data)
    }
})



var Server = new ServerController()