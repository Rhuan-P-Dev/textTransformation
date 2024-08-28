
import { ServerController } from "../serverController.js"
import { ChainController } from "./chainController.js"
import { CloneController } from "../utils/clone.js"
import { PreMadeCustomChainController } from "./preMadeCustomChainController.js"

var Server
var Chain
var Clone
var PreMadeCustomChain

docReady(function(){

    Server = new ServerController()
    Chain = new ChainController()
    Clone = new CloneController()
    PreMadeCustomChain = new PreMadeCustomChainController()

})

export class ChainNodeController {

    newChainNode(element){

        return new ChainNode(undefined, element)
    
    }

}

export class ChainNode {

    constructor(typeOfTask, element = undefined, nodes = []){

        this.typeOfTask = typeOfTask

        nodes.forEach((node) => {

            node.next.push(this)
            this.previous.push(node)

        })

        if(element){

            this.element = element
            this.input_output = Chain.getOutputBlockChain(element)

            this.hiddenNode = false

        }else{
            this.hiddenNode = true
        }

    }

    send = Server.send
    setCallback = Server.setCallback

    next = []
    previous = []

    input_output = {
        value: undefined
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
            Chain.getTypeOfTask(this.element) == "Type Of Task"
        ){
            return false
        }

        return true

    }

    isRunChainTrue(){
        return runChain
    }

    get(previous = this.previous[0]){
        return previous.input_output.value
    }

    formatGetAllOutput(all){

        let result = ""

        for (let index = 0; index < all.length; index++) {

            if(all[index] === undefined){
                return ""
            }

            if(all.length === 1){
                return all[index]
            }

            result += "<input_"+(index+1)+">" + all[index] + "</input_"+(index+1)+">"

            if(all[index+1]){
                result += "\n"
            }

        }

        return result

    }

    getAll(){

        let all = []

        this.previous.forEach((previous) => {
            all.push(this.get(previous))
        })

        return all

    }

    getAllOutputs(){

        return this.formatGetAllOutput(this.getAll()) || this.previous[0]?.getAllOutputs() || ""

    }

    getAdditionalNotes(){

        let text = ""

        this.additionalNotes.forEach((note) => {

            text = "<additional_note>"+note+"</additional_note>" + "\n"

        })

        return text

    }

    getPrompt(){

        let prompt = Clone.recursiveCloneAttribute(promptsDataBase[this.typeOfTask])

        let instruction = replacer(
            prompt[0]["content"],
            "{[DATA]}",
            promptCleaner(
                this.getAllOutputs()
            )
        )

        instruction = this.getAdditionalNotes() + instruction

        return instruction

    }

    callBackInitCustomFunctionsBefore = []
    callBackInitCustomFunctionsAfter = []

    hiddenNode = undefined

    init(){

        this.styleInit()

        if(
            (
                this.hiddenNode
                ||
                this.check()
            )
            &&
            this.isRunChainTrue()
            &&
            this.checkOutputs()
        ){

            if(this.element){

                this.typeOfTask = Chain.getTypeOfTask(this.element)

                let normalFlow = PreMadeCustomChain.run(
                    this.element,
                    this.typeOfTask,
                    this
                )

                if(!normalFlow){return}

            }

            let prompt = Clone.recursiveCloneAttribute(
                promptsDataBase[
                    this.typeOfTask
               ]
            )
            
            prompt[0]["content"] = this.getPrompt()

            this.callBackInitCustomFunctionsBefore.forEach((customFunction) => {
                customFunction(this, prompt)
            })

            this.setCallback(this, prompt)

        }else{
            this.styleCheckFail()
        }
    }

    callBackInit(text){

        this.styleFinish()

        text = callBackCleaner(text)

        if(!this.isAdditionalNote){
            this.input_output.value = text
        }

        let normalFlow = true

        for (
            let index = 0;
            index < this.callBackInitCustomFunctionsAfter.length;
            index++
        ) {

            if(
                this.callBackInitCustomFunctionsAfter[index](this, text)
            ){
                normalFlow = false
                break
            }

        }

        if(!normalFlow){return}

        this.next.forEach(
            (next) => {
                if(
                    next.element
                    &&
                    !this.element
                ){

                    next.styleFinish()

                    if(!this.isAdditionalNote){
                        next.input_output.value = this.input_output.value
                    }

                    next.previous[0].next = []
                    
                    next.next.forEach(
                        (next_next) => {
                            next_next.init()
                        }
                    )

                }else{

                    if(this.isAdditionalNote){
                        next.addNote(text)
                    }

                    next.init()
                }
            }
        )

    }

    additionalNotes = []

    isAdditionalNote = false

    addNote(note){
        this.additionalNotes.push(note)
    }

    deleteadditionalNotes(){

        this.additionalNotes = []

    }

    styles = true

    isDone = false

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

        this.deleteadditionalNotes()

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

        this.deleteadditionalNotes()

        this.isDone = true

        if(!this.styles){return}

        if(this.element){
            this.element.style.border = "3px solid green"
        }

    }

}