
var chain_callback = {}

export class ServerController {

    send(text, ID){
        socket.send({"cmd": "sendToModel", "data":{text, ID}})
    }

    setCallback(callBack, prompt = undefined, name = undefined){

        let ID = randomUniqueID()

        chain_callback[
            ID
        ] = {
            "callBack": callBack,
            "name": name
        }

        if(prompt){
            this.send(prompt, ID)
        }else{
            return ID
        }

    }

    setParam(param, value, id){
        socket.send({"cmd": "setParam", "data":{"param":param,"value":value, "id":id}})
    }

}

socket.on('from_server', function(msg) {
    if(msg.cmd == "responseOfModel"){
        chain_callback[msg.data.ID].callBack.callBackInit(
            msg.data.text,
            chain_callback[msg.data.ID].name
        )

        delete chain_callback[msg.data.ID]

    }
})



var Server = new ServerController()