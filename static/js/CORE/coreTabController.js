import { ContainerController } from "./containerController.js"

var Container = new ContainerController()

export class CoreTabController {

    mainTab = document.getElementById("mainTab")
    configTab = document.getElementById("configTab")
    chainTab = document.getElementById("chainTab")

    activateCssClass = " coreTabActive"

    addTriggers(){

        this.mainTab.addEventListener("click", function(){
            Container.switchTab(this.innerText.toLowerCase())
            CoreTab.deactivateAll()
            CoreTab.activeMainTab()
        })

        this.configTab.addEventListener("click", function(){
            Container.switchTab(this.innerText.toLowerCase())
            CoreTab.deactivateAll()
            CoreTab.activeConfigTab()
        })

        this.chainTab.addEventListener("click", function(){
            Container.switchTab(this.innerText.toLowerCase())
            CoreTab.deactivateAll()
            CoreTab.activeChainTab()
        })

    }

    activeMainTab(){
        let allClass = this.mainTab.getAttribute("class")
        this.mainTab.setAttribute("class",allClass+this.activateCssClass)
    }

    activeConfigTab(){
        let allClass = this.configTab.getAttribute("class")
        this.configTab.setAttribute("class",allClass+this.activateCssClass)
    }

    activeChainTab(){
        let allClass = this.chainTab.getAttribute("class")
        this.chainTab.setAttribute("class",allClass+this.activateCssClass)
    }

    deactivateMainTab(){
        let allClass = this.mainTab.getAttribute("class").replace(this.activateCssClass,"")
        this.mainTab.setAttribute("class",allClass)
    }

    deactivateConfigTab(){
        let allClass = this.configTab.getAttribute("class").replace(this.activateCssClass,"")
        this.configTab.setAttribute("class",allClass)
    }

    deactivateChainTab() {
        let allClass = this.chainTab.getAttribute("class").replace(this.activateCssClass,"")
        this.chainTab.setAttribute("class",allClass)
    }

    deactivateAll(){
        CoreTab.deactivateMainTab()
        CoreTab.deactivateConfigTab()
        CoreTab.deactivateChainTab()
    }
}

var CoreTab = new CoreTabController()