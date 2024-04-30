
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

    addBlockChain(){
        this.chainBox.insertAdjacentHTML("beforeend",blockChainTemplate)
    }

    addBlockChainToChain(ChainNode){
        CHAIN.add(ChainNode)
    }

    removeBlockChain(){
        let lastBlockChain = Chain.getLastBlockChain()
        lastBlockChain.parentNode.removeChild(lastBlockChain)
        CHAIN.remove()
    }

    getLastBlockChain(){
        return this.chainBox.childNodes[this.chainBox.childNodes.length-1]
    }

    getOutputBlockChain(blockChain){
        return blockChain.childNodes[3].childNodes[1]
    }

    getRunBlockButton(blockChain){
        return blockChain.childNodes[1].childNodes[5]
    }

    runChain(){
        runChain = true
        CHAIN.Chain.init()
    }

    stopChain(){
        runChain = false
    }

    addBlockChainOptionsTriggers(ChainNode){
        let lastRunBlockButton = Chain.getRunBlockButton(Chain.getLastBlockChain())

        lastRunBlockButton.addEventListener("click",function(){
            runChain = true
            ChainNode.init()
        })

    }

    initNewBlockChain(){
        Chain.addBlockChain()

        OnOff.addTrigger(Chain.getOnOff(Chain.getLastBlockChain()))

        let tempChainNode = ChainNode.newChainNode(Chain.getLastBlockChain())

        Chain.addBlockChainOptionsTriggers(tempChainNode)

        Chain.addBlockChainToChain(tempChainNode)
    }

    getTypeOfTask(blockChain){
        return blockChain.childNodes[1].childNodes[1].childNodes[1].value
    }

    getOnOff(blockChain){
        return blockChain.childNodes[1].childNodes[3].childNodes[1]
    }

}

var Chain = new ChainController()