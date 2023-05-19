
import { ServerController } from "../serverController.js"

var Server = new ServerController()

const CHAIN = new CustomDoublyLinkedList()

export class ChainController {

    chainBox = document.getElementById("chainBox")

    addChainBlock(){
        this.chainBox.insertAdjacentHTML("beforeend",chainBlockTemplate)
    }

    addChainBlockToChain(){
        let lastChainBlock = Chain.getLastChainBlock()
        let outputOfLastChainBlock = Chain.getOutputChainBlock(lastChainBlock)
        CHAIN.add(new ChainNode(outputOfLastChainBlock))
    }

    removeChainBlock(){
        let lastChainBlock = Chain.getLastChainBlock()
        lastChainBlock.parentNode.removeChild(lastChainBlock)
    }

    getLastChainBlock(){
        return this.chainBox.childNodes[this.chainBox.childNodes.length-1]
    }

    getOutputChainBlock(chainBlock){
        return chainBlock.childNodes[3].childNodes[1]
    }

    runChain(){
        CHAIN.Chain.init()
    }

}

var Chain = new ChainController()

function ChainNode(element){

    let newNode = {
        element: element,
        send: Server.send,
        check: function(){
            return true
        },
        get: function(){return this.previous.element.value},
        init: function(){
            if(this.check()){

                this.callBack.element = this.element
                this.callBack.next = this.next

                this.send(this.get(),this.callBack)

            }
        },

        next: undefined,
        previous: undefined,

        callBack: {
            init: function(text){
                this.element.innerHTML = text
                this.next.init()
            },
            element: undefined,
            next: undefined,
        },
    
    }

    return newNode

}