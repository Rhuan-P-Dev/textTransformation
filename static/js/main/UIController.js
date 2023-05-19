import { ChainController } from "../chain/chainController.js"

var Chain = new ChainController()

export class UIController {

    buttonRunChain = document.getElementById("buttonRunChain")
    buttonStopChain = document.getElementById("buttonStopChain")

    addTriggers(){

        buttonRunChain.addEventListener("click",function(){
            Chain.runChain()
        })

    }

}

var UI = new UIController()