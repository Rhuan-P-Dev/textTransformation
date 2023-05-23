
import { ServerController } from "../serverController.js"
import { ChainController } from "./chainController.js"
import { OnOffController } from "../onOffController.js"

var OnOff = ""
var Server = ""
var Chain = ""

docReady(function(){

    Server = new ServerController()
    Chain = new ChainController()
    OnOff = new OnOffController()

})

export class ChainNodeController {

    newChainNode(element){

        let newNode = {
            element: element,
            input_output: Chain.getOutputChainBlock(element),
    
            send: Server.send,
            check: check,
            get: get,
            init: init,
    
            next: undefined,
            previous: undefined,
    
            callBack: {
                element: element,
                input_output: undefined,
                
                init: callBackInit,

                next: undefined,

                styleFinish: styleFinish,
            },

            styleInit: styleInit,
            styleCheckFail: styleCheckFail,
        
        }
    
        return newNode
    
    }

}

function check(){

    if(this.previous.input_output.value == "" ||
    Chain.getTypeOfTask(this.element) == "Type Of Task" ||
    !runChain){
        return false
    }

    return true

}

function get(){
    return this.previous.input_output.value
}

function init(){

    this.styleInit()

    if(this.check()){
        
        let typeOfTask = Chain.getTypeOfTask(this.element)

        let prompt = promptsDataBase[typeOfTask]

        if(OnOff.getOnOff(Chain.getOnOff(this.element)) == "on"){
            prompt = examplesDataBase[typeOfTask] + prompt
        }

        prompt = replacer(prompt, "{[DATA]}", this.get())

        console.log(prompt)

        this.callBack.input_output = this.input_output
        this.callBack.next = this.next

        this.send(prompt,this.callBack)

    }else{
        this.styleCheckFail()
    }
}






function callBackInit(text){

    this.styleFinish()

    this.input_output.value = text
    this.next.init()

}










function styleInit(){
    this.element.style.border = "3px solid red"
    this.next.styleInit()
}

function styleCheckFail(){
    this.element.style.border = "3px solid black"
    this.next.styleCheckFail()
}

function styleFinish(){
    this.element.style.border = "3px solid green"
}




var ChainNode = new ChainNodeController()