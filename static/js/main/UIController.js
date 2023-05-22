import { ChainController } from "../chain/chainController.js"

var Chain = new ChainController()

export class UIController {

    buttonRunChain = document.getElementById("buttonRunChain")
    mainButtonStopChain = document.getElementById("mainButtonStopChain")

    addTriggers(){

        buttonRunChain.addEventListener("click",function(){
            Chain.runChain()
        })

        mainButtonStopChain.addEventListener("click",function(){
            Chain.stopChain()
        })
    }

}

var UI = new UIController()