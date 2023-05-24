// GLOBAL
import { OnOffController } from "../onOffController.js"

var OnOff = ""

// CHAIN
import { UIController as UI_Chain_Controller} from "../chain/UIController.js"

var UI_Chain = ""

// CONFIG
import { ConfigBoxController } from "../config/configBoxController.js"
import { ParamBoxSliderController } from "../config/paramBoxSliderController.js"

var ConfigBox = ""
var ParamBoxSlider = ""

// MAIN
import { UIController as UI_Main_Controller} from "../main/UIController.js"

var UI_Main = ""

// CORE
import { CoreTabController } from "./coreTabController.js"

var CoreTab = ""

docReady(function(){
    // GLOBAL
    OnOff = new OnOffController()

    // CHAIN
    UI_Chain = new UI_Chain_Controller()

    // CONFIG
    ConfigBox = new ConfigBoxController()
    ParamBoxSlider = new ParamBoxSliderController()

    // MAIN
    UI_Main = new UI_Main_Controller()

    // CORE
    CoreTab = new CoreTabController()

    setTimeout(browseInit,1)

})

function browseInit(){
    // GLOBA
    OnOff.addTriggers()

    // CHAIN
    UI_Chain.addTriggers()

    // CONFIG
    ConfigBox.addTriggers()
    ParamBoxSlider.addTriggers()

    // Main
    UI_Main.addTriggers()

    // CORE
    CoreTab.addTriggers()

}