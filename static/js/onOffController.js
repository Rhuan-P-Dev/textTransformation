
export class OnOffController {

    all_onOff = document.querySelectorAll(".onOff")

    activateCssClass = " on"

    addTriggers(){
        for (let index = 0; index < this.all_onOff.length; index++) {
            onOff_trigger(this.all_onOff[index])
        }
    }

    addTrigger(onOff){
        onOff_trigger(onOff)
    }

    getOnOff(onOffElement){
        return onOffElement.getAttribute("state")
    }

}

function onOff_trigger(onOff){
    onOff.addEventListener("click", function(){
        if(this.getAttribute("state") == "off"){
            this.setAttribute("state","on")
            let allClass = this.getAttribute("class")
            this.setAttribute("class",allClass+OnOff.activateCssClass)
        }else{
            this.setAttribute("state","off")
            let allClass = this.getAttribute("class").replace(OnOff.activateCssClass,"")
            this.setAttribute("class",allClass)
        }
    })
}

var OnOff = new OnOffController()