
import { ChainNodeController } from "./chainNodeController.js"
import { OnOffController } from "../onOffController.js"
import { ComposerNodeController } from "./composerNodeController.js"

var ChainNode = ""
var ComposerNode = ""
var OnOff = ""

docReady(function(){

    ChainNode = new ChainNodeController()
    ComposerNode = new ComposerNodeController()
    OnOff = new OnOffController()

})

export class ChainController {

    chainBox = document.getElementById("chainBox")

    addBlockChain(){
        this.chainBox.insertAdjacentHTML("beforeend",blockChainTemplate)
    }

    addComposerBlock(){
        this.chainBox.insertAdjacentHTML("beforeend",composerBlockTemplate)
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

        Chain.getOnOffs(Chain.getLastBlockChain()).forEach(element => {
            if(
                element.getAttribute
            ){
                OnOff.addTrigger(
                    element
                )
            }
        })

        let tempChainNode = ChainNode.newChainNode(Chain.getLastBlockChain())

        Chain.addBlockChainOptionsTriggers(tempChainNode)

        Chain.addBlockChainToChain(tempChainNode)
    }

    initNewComposerBlock(){
        Chain.addComposerBlock()

        Chain.getOnOffs(Chain.getLastBlockChain()).forEach(element => {
            if(
                element.getAttribute
            ){
                OnOff.addTrigger(
                    element
                )
            }
        })

        let tempChainNode = ComposerNode.newComposerNode(Chain.getLastBlockChain())

        Chain.addBlockChainOptionsTriggers(tempChainNode)

        Chain.addBlockChainToChain(tempChainNode)
    }

    getTypeOfTask(blockChain){
        return blockChain.childNodes[1].childNodes[1].childNodes[1].value
    }

    getOnOffs(blockChain){

        return blockChain.childNodes[1].childNodes[3].childNodes

    }

    getOns(blockChain) {

        if(!blockChain){
            console.warn("blockChain is undefined")
            console.warn(blockChain)
            return []
        }

        const rawNodes = this.getOnOffs(blockChain);
        return Array.from(rawNodes).filter(node =>
            node.nodeType === Node.ELEMENT_NODE &&
            node.getAttribute('state') === 'on'
        );
    }

    getOnOffsText(elements){

        return elements.map(element => element.innerText)

    }

    getOnsText(blockChain){

        return  this.getOnOffsText(this.getOns(blockChain))

    }

}

var Chain = new ChainController()




class CustomDoublyLinkedList{

    Chain = ""

    constructor(){

        this.firstNode = new ChainNodeController().newChainNode()
        this.firstNode.input_output = document.getElementById("chainInput")
        this.firstNode.isDone = true

        this.firstNode.protected = true,
        this.firstNode.init = function(){
            this.next.forEach(
                (next) => {
                    next.init()
                }
            )
            
        }

        this.lastNode = new ChainNodeController().newChainNode()

        this.lastNode.input_output = document.getElementById("chainOutput")
        this.lastNode.protected = true
        this.lastNode.lastNode = true
        this.lastNode.init = function(){
            this.callBackInit(
                this.getCleanOutputs()
            )
        }

        //this.lastNode.get = function(){
        //    let output = ""
        //    this.previous.forEach(
        //        (previous) => {
        //            output = output + previous.input_output.value
        //        }
        //    )
        //    return output
        //}
        //this.lastNode.init = function(){
        //    this.input_output.value = this.get()
        //}

        //styleInit:() => {},
        //styleCheckFail:() => {},

        this.firstNode.next.push(this.lastNode)
        this.lastNode.previous.push(this.firstNode)
        this.Chain = this.firstNode
    }

    add(ChainNode){
        let node = this.Chain
        while(1){
            if(node.next[0].lastNode == true){
                let oldNext = node.next.pop()
                oldNext.previous.pop()

                node.next.push(ChainNode)
                oldNext.previous.push(ChainNode)

                ChainNode.next.push(oldNext)
                ChainNode.previous.push(node)

                return
            }else{
                node = node.next[0]
            }
        }
    }
    
    remove(){
        let node = this.Chain
        while(1){
            if(node.next[0].lastNode){

                if(node.protected){return}

                node.previous[0].next.pop()
                node.previous[0].next.push(node.next[0])
                node.next[0].previous.pop()
                node.next[0].previous.push(node.previous[0])

                return
            }else{
                node = node.next[0]
            }
        }
    }

}

const CHAIN = new CustomDoublyLinkedList()