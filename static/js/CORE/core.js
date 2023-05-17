import { CoreTabController } from "./coreTabController.js"

var CoreTab = ""

docReady(function(){

    CoreTab = new CoreTabController()

    setTimeout(browseInit,1)

})

function browseInit(){

    CoreTab.addTriggers()

}