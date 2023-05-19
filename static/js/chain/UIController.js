import { ChainController } from "./chainController.js"

var Chain = new ChainController()

export class UIController {

    buttonAddChainBlock = document.getElementById("buttonAddChainBlock")
    buttonRemoveChainBlock = document.getElementById("buttonRemoveChainBlock")

    addTriggers(){

        buttonAddChainBlock.addEventListener("click",function(){
            Chain.addChainBlock()
            Chain.addChainBlockToChain()
        })

        buttonRemoveChainBlock.addEventListener("click",function(){
            Chain.removeChainBlock()
        })
    }

}

var UI = new UIController()