import { ServerController } from "../serverController.js"
import { ChainController } from "./chainController.js"
import { PromptsDataBaseController } from "../taskPromptDataBase.js"
import { UtilsController } from "./utilsController.js"
import { AdvancedChainController } from "./advancedChainController.js"
import { PromptController } from "./promptController.js"
import { MinimalChainNode } from "./minimalChainNode.js"

export class ChainNodeController {

    newChainNode(element){

        return new ChainNode({
            typeOfTask: undefined,
            element
        })

    }

}

export class ChainNode extends MinimalChainNode{

    constructor({
        typeOfTask = undefined,
        element = undefined,
        previousNodes = [],
        nextNodes = [],

        outputObserver = new Observer(),
        afterGetPromptObserver = new Observer(),
        beforeInitsChecksObserver = new Observer(),

        UtilsC = UtilsController,
        ChainC = new ChainController(),
        PromptsDataBaseC = new PromptsDataBaseController(),
        ServerC = new ServerController(),

        ChainNodeModC = new ChainNodeModController(),
        PromptC = new PromptController(),
    } = {} ){

        super({
            nextNodes,
            previousNodes,
        })

        this.UtilsC = UtilsC
        this.ChainC = ChainC
        this.PromptsDataBaseC = PromptsDataBaseC
        this.ServerC = ServerC
        this.ChainNodeModC = ChainNodeModC
        this.PromptC = PromptC

        this.send = this.ServerC.send
        this.setCallback = this.ServerC.setCallback

        this.typeOfTask = typeOfTask

        if(element){

            this.element = element
            this.input_output = this.ChainC.getOutputBlockChain(element)

        }

        this.outputObserver = outputObserver
        this.afterGetPromptObserver = afterGetPromptObserver
        this.beforeInitsChecksObserver = beforeInitsChecksObserver

    }

    listOfDefaultSpecialFlags = {
        "repeatPrompt": 0 // INT only
    }

    listOfSpecialFlags = {
        "repeatPrompt": 0 // INT only
    }

    setSpecialFlags({
        flags: {}
    } = {}){

        for (key in flags){
            
            if(this.listOfSpecialFlags[key] == undefined){
                console.warn("Special flag not found: " + key)
            }else{
                this.listOfSpecialFlags[key] = flags[key]
            }
        }

    }

    getSpecialFlags(){
        return this.listOfSpecialFlags
    }

    cleanSpecialFlags(){
        this.listOfSpecialFlags = this.listOfDefaultSpecialFlags
    }

    /**
     * Register a listener that will be called whenever the node receives
     * output from the server.
     *
     * @param {function(string):void} fn - callback receiving the output text
     */
    onOutput(
        fn,
        {
            selfDelete = false
        } = {}
    ) {
        this.outputObserver.subscribe(fn);
    }

    onInitGetPrompt(fn) {
        this.afterGetPromptObserver.subscribe(fn);
    }

    onBeforeInitsChecks(
        fn,
        {
            selfDelete = false
        } = {}
    ) {
        this.beforeInitsChecksObserver.subscribe(fn);
    }

    typeOfTask = undefined

    checkOutputs(){

        for (let index = 0; index < this.previous.length; index++) {

            let previous = this.previous[index]

            if(!previous.isDone){
                return false
            }

        }

        return true

    }

    check(){

        if(
            (
                this.element
                &&
                this.ChainC.getTypeOfTask(this.element) == "Type Of Task"
            )
            ||
            this.typeOfTask == "Type Of Task"
            ||
            this.typeOfTask == undefined
        ){
            return false
        }

        return true

    }

    isRunChainTrue(){
        return runChain
    }

    getTask(){
        return this.typeOfTask
    }

    getPrompt(){

        return this.PromptC.getPrompt({
            prompt: this.typeOfTask,
            data: this.getCleanOutputs(),
            node: this,
            specialFlags: this.getSpecialFlags()
        })

    }

    defineTask(){
        if(this.element){
            this.typeOfTask = this.ChainC.getTypeOfTask(this.element)
        }
    }

    init(){

        this.styleInit()

        this.defineTask()

        this.set(this.getCleanOutputs())

        if(this.ChainNodeModC.existOnOff(this.element)){
            this.ChainNodeModC.init(this)
            return
        }

        this.beforeInitsChecksObserver.notify(this.getCleanOutputs())

        console.error(
            this.beforeInitsChecksObserver
        )

        if(
            this.check()
            &&
            this.isRunChainTrue()
            &&
            this.checkOutputs()
        ){

            if(this.protected){
                console.error("FOUND PROTECTED")
            }

            const prompt = this.getPrompt()

            this.afterGetPromptObserver.notify(prompt)

            console.log(prompt)

            this.setCallback(this, prompt)

        }else{
            this.styleCheckFail()
        }
    }

    callBackInit(text){

        console.log("callback init")
        console.log("node output: " + text)

        this.styleFinish()

        text = this.UtilsC.callBackCleaner(text)

        this.outputObserver.notify(text);

        this.set(text)

        this.next.forEach(
            (next) => {
                next.init()
            }
        )

    }

    styles = true

    styleInit(){

        this.isDone = false

        if(!this.styles){return}

        if(this.element){
            this.element.style.border = "3px solid red"
        }

        this.next.forEach(
            (next) => {
                next.styleInit()
            }
        )
    }

    styleCheckFail(){

        if(!this.styles){return}

        if(this.element){
            this.element.style.border = "3px solid black"
        }

        this.next.forEach(
            (next) => {
                next.styleCheckFail()
            }
        )
    }

    styleFinish(){

        this.isDone = true

        if(!this.styles){return}

        if(this.element){
            this.element.style.border = "3px solid green"
        }

    }

}

export class ChainNodeModController{

    constructor({
        ChainC = new ChainController(),
        AdvancedChainC = new AdvancedChainController(),
    } = {}){
        this.ChainC = ChainC
        this.AdvancedChainC = AdvancedChainC
    }

    existOnOff(element){
        console.log("========= existOnOff ==========")
        //console.log(this.ChainC.getOns(element)[0].innerText)
        console.log(this.ChainC.getOns(element))
        return this.ChainC.getOns(element).length >= 1
    }

    init(node){
        console.log("hey!")
        this.AdvancedChainC.run(node)
    }

}
