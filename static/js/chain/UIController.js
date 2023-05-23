import { ChainController } from "./chainController.js"

var Chain = ""

docReady(function(){

    Chain = new ChainController()

})

export class UIController {

    buttonAddChainBlock = document.getElementById("buttonAddChainBlock")
    chainButtonStopChain = document.getElementById("chainButtonStopChain")
    buttonRemoveChainBlock = document.getElementById("buttonRemoveChainBlock")

    addTriggers(){

        this.buttonAddChainBlock.addEventListener("click",function(){
            Chain.initNewChainBlock()
        })

        this.buttonRemoveChainBlock.addEventListener("click",function(){
            Chain.removeChainBlock()
        })

        this.chainButtonStopChain.addEventListener("click",function(){
            Chain.stopChain()
        })
    }

}

var UI = new UIController()