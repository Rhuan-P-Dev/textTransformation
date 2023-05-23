
import { ChainNodeController } from "./chainNodeController.js"
import { OnOffController } from "../onOffController.js"

var ChainNode = ""
var OnOff = ""

docReady(function(){

    ChainNode = new ChainNodeController()
    OnOff = new OnOffController()

})

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

        let tempChainNode = ChainNode.newChainNode(Chain.getLastChainBlock())

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