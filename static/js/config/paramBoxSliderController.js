
import { ServerController } from "../serverController.js"

var Server = ""

docReady(function(){

    Server = new ServerController()

})

export class ParamBoxSliderController{

    allParamBoxSlider = document.querySelectorAll(".paramBoxSlider")
    allParamBoxText = document.querySelectorAll(".paramBoxText")

    addTriggers(){
        
        for (let index = 0; index < this.allParamBoxSlider.length; index++) {

            this.allParamBoxSlider[index].childNodes[5].childNodes[1].addEventListener("input", function(){
                updateCurrentValue(this)
                Server.setParam(
                    this.getAttribute("typeOfParam"),
                    parseFloat(this.value)
                )
            })

        }

        for (let index = 0; index < this.allParamBoxText.length; index++) {

            this.allParamBoxText[index].childNodes[3].childNodes[1].addEventListener("keyup", function(){
                Server.setParam(
                    this.getAttribute("typeOfParam"),
                    this.value
                )
            })

        }

    }


}

function updateCurrentValue(slider){
    slider.parentNode.parentNode.childNodes[3].childNodes[1].innerText = slider.value
}





var ParamBoxSlider = new ParamBoxSliderController()