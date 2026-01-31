import { ChainController } from "../chain/chainController.js"

var Chain = ""

docReady(function(){

    Chain = new ChainController()

})

export class UIController {

    buttonRunChain = document.getElementById("buttonRunChain")
    mainButtonStopChain = document.getElementById("mainButtonStopChain")
    buttonClean = document.getElementById("buttonClean")

    addTriggers(){

        this.buttonRunChain.addEventListener("click",function(){
            Chain.runChain()
        })

        this.mainButtonStopChain.addEventListener("click",function(){
            Chain.stopChain()
        })

        this.buttonClean.addEventListener("click", function() {
            document.getElementById("chainInput").value = ""
            document.getElementById("chainOutput").value = ""
        })

    }

}

var UI = new UIController()