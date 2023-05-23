import { ChainController } from "../chain/chainController.js"

var Chain = ""

docReady(function(){

    Chain = new ChainController()

})

export class UIController {

    buttonRunChain = document.getElementById("buttonRunChain")
    mainButtonStopChain = document.getElementById("mainButtonStopChain")

    addTriggers(){

        this.buttonRunChain.addEventListener("click",function(){
            Chain.runChain()
        })

        this.mainButtonStopChain.addEventListener("click",function(){
            Chain.stopChain()
        })
    }

}

var UI = new UIController()