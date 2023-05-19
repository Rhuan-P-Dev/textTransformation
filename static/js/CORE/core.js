// CHAIN
import { UIController as UI_Chain_Controller} from "../chain/UIController.js"

var UI_Chain = ""

// MAIN
import { UIController as UI_Main_Controller} from "../main/UIController.js"

var UI_Main = ""

// CORE
import { CoreTabController } from "./coreTabController.js"

var CoreTab = ""

docReady(function(){
    // CHAIN
    UI_Chain = new UI_Chain_Controller()

    // MAIN
    UI_Main = new UI_Main_Controller()

    // CORE
    CoreTab = new CoreTabController()

    setTimeout(browseInit,1)

})

function browseInit(){
    // CHAIN
    UI_Chain.addTriggers()

    // Main
    UI_Main.addTriggers()

    // CORE
    CoreTab.addTriggers()

}