import { ChainController } from "./chainController.js"

var Chain = ""

docReady(function(){

    Chain = new ChainController()

})

export class UIController {

    buttonAddBlockChain = document.getElementById("buttonAddBlockChain")
    chainButtonStopChain = document.getElementById("chainButtonStopChain")
    buttonRemoveBlockChain = document.getElementById("buttonRemoveBlockChain")

    addTriggers(){

        this.buttonAddBlockChain.addEventListener("click",function(){
            Chain.initNewBlockChain()
        })

        this.buttonRemoveBlockChain.addEventListener("click",function(){
            Chain.removeBlockChain()
        })

        this.chainButtonStopChain.addEventListener("click",function(){
            Chain.stopChain()
        })
    }

}

var UI = new UIController()