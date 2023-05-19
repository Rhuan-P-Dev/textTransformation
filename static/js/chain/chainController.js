
import { ServerController } from "../serverController.js"

var Server = new ServerController()

const CHAIN = new CustomDoublyLinkedList()

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
        CHAIN.Chain.init()
    }

    addChainBlockOptionsTriggers(ChainNode){
        let lastRunBlockButton = Chain.getRunBlockButton(Chain.getLastChainBlock())

        lastRunBlockButton.addEventListener("click",function(){
            ChainNode.init()
        })

    }

    initNewChainBlock(){
        Chain.addChainBlock()

        let tempChainNode = ChainNode(Chain.getLastChainBlock())

        Chain.addChainBlockOptionsTriggers(tempChainNode)
        Chain.addChainBlockToChain(tempChainNode)
    }

}

var Chain = new ChainController()

function ChainNode(element){

    let newNode = {
        element: element,
        input_output: Chain.getOutputChainBlock(element),

        send: Server.send,
        check: function(){
            
            if(this.previous.input_output.value == ""){
                return false
            }

            return true
        },
        get: function(){return this.previous.input_output.value},
        init: function(){
            if(this.check()){

                this.callBack.input_output = this.input_output
                this.callBack.next = this.next

                this.send(this.get(),this.callBack)

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