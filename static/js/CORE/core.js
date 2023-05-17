// CHAIN
import { UIController } from "../chain/UIController.js"

var UI_Chain = ""

// CORE
import { CoreTabController } from "./coreTabController.js"

var CoreTab = ""

docReady(function(){
    // CHAIN
    UI_Chain = new UIController()

    // CORE
    CoreTab = new CoreTabController()

    setTimeout(browseInit,1)

})

function browseInit(){
    //CHAIN
    UI_Chain.addTriggers()

    // CORE
    CoreTab.addTriggers()

}