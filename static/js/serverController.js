
var chain_callback = {}

export class ServerController {

    send(text, ID){
        socket.send({"cmd": "sendToModel", "data":{text, ID}})
    }

    setCallback(callBack, prompt = undefined){

        let ID = randomUniqueID()

        chain_callback[
            ID
        ] = callBack

        if(prompt){
            this.send(prompt, ID)
        }else{
            return ID
        }

    }

    setParam(param, value){
        socket.send({"cmd": "setParam", "data":{"param":param,"value":value}})
    }

}

socket.on('from_server', function(msg) {
    if(msg.cmd == "responseOfModel"){
        chain_callback[msg.data.ID].callBackInit(msg.data.text)

        delete chain_callback[msg.data.ID]

    }
})



var Server = new ServerController()