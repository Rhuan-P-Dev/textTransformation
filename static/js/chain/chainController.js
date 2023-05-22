
import { ServerController } from "../serverController.js"
import { OnOffController } from "../onOffController.js"

var Server = new ServerController()
var OnOff = new OnOffController()

const CHAIN = new CustomDoublyLinkedList()

var runChain = true

export class ChainController {

    chainBox = document.getElementById("chainBox")

    addChainBlock(){
        this.chainBox.insertAdjacentHTML("beforeend",chainBlockTemplate)
    }

    addChainBlockToChain(ChainNode){
        CHAIN.add(ChainNode)
    }

    removeChainBlock(){
        let lastChainBlock = Chain.getLastChainBlock()
        lastChainBlock.parentNode.removeChild(lastChainBlock)
        CHAIN.remove()
    }

    getLastChainBlock(){
        return this.chainBox.childNodes[this.chainBox.childNodes.length-1]
    }

    getOutputChainBlock(chainBlock){
        return chainBlock.childNodes[3].childNodes[1]
    }

    getRunBlockButton(chainBlock){
        return chainBlock.childNodes[1].childNodes[5]
    }

    runChain(){
        runChain = true
        CHAIN.Chain.init()
    }

    stopChain(){
        runChain = false
    }

    addChainBlockOptionsTriggers(ChainNode){
        let lastRunBlockButton = Chain.getRunBlockButton(Chain.getLastChainBlock())

        lastRunBlockButton.addEventListener("click",function(){
            runChain = true
            ChainNode.init()
        })

    }

    initNewChainBlock(){
        Chain.addChainBlock()

        OnOff.addTrigger(Chain.getOnOff(Chain.getLastChainBlock()))

        let tempChainNode = ChainNode(Chain.getLastChainBlock())

        Chain.addChainBlockOptionsTriggers(tempChainNode)

        Chain.addChainBlockToChain(tempChainNode)
    }

    getTypeOfTask(chainBlock){
        return chainBlock.childNodes[1].childNodes[1].childNodes[1].value
    }

    getOnOff(chainBlock){
        return chainBlock.childNodes[1].childNodes[3].childNodes[1]
    }

}

var Chain = new ChainController()

function ChainNode(element){

    let newNode = {
        element: element,
        input_output: Chain.getOutputChainBlock(element),

        send: Server.send,
        check: function(){

            if(this.previous.input_output.value == "" ||
            Chain.getTypeOfTask(this.element) == "Type Of Task" ||
            !runChain){
                return false
            }

            return true
        },
        get: function(){return this.previous.input_output.value},
        init: function(){
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

            }
        },

        next: undefined,
        previous: undefined,

        callBack: {
            init: function(text){
                this.input_output.value = text
                this.next.init()
            },
            input_output: undefined,
            next: undefined,
        },
    
    }

    return newNode

}