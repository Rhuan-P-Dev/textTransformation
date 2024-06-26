
import { ServerController } from "../serverController.js"
import { ChainController } from "./chainController.js"
import { OnOffController } from "../onOffController.js"
import { CloneController } from "../utils/clone.js"

var OnOff = ""
var Server = ""
var Chain = ""
var Clone

docReady(function(){

    Server = new ServerController()
    Chain = new ChainController()
    OnOff = new OnOffController()
    Clone = new CloneController()

})

export class ChainNodeController {

    newChainNode(element){

        let newNode = {
            element: element,
            input_output: Chain.getOutputBlockChain(element),
    
            send: Server.send,
            setCallBack: Server.setCallBack,

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

        let prompt = Clone.recursiveCloneAttribute(promptsDataBase[typeOfTask])

        //if(OnOff.getOnOff(Chain.getOnOff(this.element)) == "on"){
            //prompt = examplesDataBase[typeOfTask] + prompt
        //}

        prompt[0]["content"] = replacer(
            prompt[0]["content"],
            "{[DATA]}",
            promptCleaner(this.get())
        )

        this.callBack.input_output = this.input_output
        this.callBack.next = this.next

        this.setCallBack(this.callBack)

        this.send(prompt)

    }else{
        this.styleCheckFail()
    }
}

function promptCleaner(prompt){
    return replacer(prompt, "\\", "")
}






function callBackInit(text){

    this.styleFinish()

    text = callBackCleaner(text)

    this.input_output.value = text
    this.next.init()

}

function callBackCleaner(text){
    text = replacer(text, "<text>", "")
    text = replacer(text, "</text>", "")
    return text
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