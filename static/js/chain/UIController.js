import { ChainController } from "./chainController.js"

var Chain = new ChainController()

export class UIController {

    buttonAddChainBlock = document.getElementById("buttonAddChainBlock")
    chainButtonStopChain = document.getElementById("chainButtonStopChain")
    buttonRemoveChainBlock = document.getElementById("buttonRemoveChainBlock")

    addTriggers(){

        buttonAddChainBlock.addEventListener("click",function(){
            Chain.initNewChainBlock()
        })

        buttonRemoveChainBlock.addEventListener("click",function(){
            Chain.removeChainBlock()
        })

        chainButtonStopChain.addEventListener("click",function(){
            Chain.stopChain()
        })
    }

}

var UI = new UIController()