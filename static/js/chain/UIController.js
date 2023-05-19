import { ChainController } from "./chainController.js"

var Chain = new ChainController()

export class UIController {

    buttonAddChainBlock = document.getElementById("buttonAddChainBlock")
    buttonRemoveChainBlock = document.getElementById("buttonRemoveChainBlock")

    addTriggers(){

        buttonAddChainBlock.addEventListener("click",function(){
            Chain.initNewChainBlock()
        })

        buttonRemoveChainBlock.addEventListener("click",function(){
            Chain.removeChainBlock()
        })
    }

}

var UI = new UIController()