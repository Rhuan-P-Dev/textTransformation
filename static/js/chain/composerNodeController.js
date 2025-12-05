
import { ServerController } from "../serverController.js"
import { ChainController } from "./chainController.js"
import { CloneController } from "../utils/clone.js"
import { PreMadeCustomChainController } from "./preMadeCustomChainController.js"
import { ChainNode } from "./chainNodeController.js"

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

export class ComposerNodeController {

    newComposerNode(element){

        return new ComposerNode(undefined, element)
    
    }

}

export class ComposerNode {

    init(){

        this.styleInit()

        if(this.done()){
            this.styleFinish()
            return
        }

        if(
            this.check()
            &&
            this.isRunChainTrue()
            &&
            this.checkOutputs()
        ){

            if(this.element){

                this.typeOfTask = Chain.getTypeOfTask(this.element)

            }

            let core = this.getCore()

            // Only useful if the core.order exists
            let order = {
                "input": this.previous[0]
            }

            for (let index = 0; index < core.input.length; index++) {
                
                let typeOfTask = core.input[index]

                let newNode = new ChainNode(
                    typeOfTask,
                    this.element
                )

                newNode.input_output = {
                    value: ""
                }

                newNode.hiddenNode = true
                newNode.runNextNodeInit = true

                newNode.frozenTypeOfTask = typeOfTask

                newNode.callBackInitCustomFunctionsAfter.push(
                    PreMadeCustomChain.customComplete
                )

                newNode.avoidDefaultInput = core.avoidDefaultInput

                if(!core.order){

                    newNode.previous.push(this.previous[0])

                    this.previous.push(newNode)
                
                    newNode.next.push(this)

                    newNode.init()

                }else{
                    order[typeOfTask] = newNode
                }

            }

            if(!core.order){return}

            for (let index = 0; index < core.aaa.length; index++) {
                let node = order[core.aaa[index]]
                
                node.next.push(this)
                this.previous.push(node)

                node.element = undefined
            }

            for ( const key in core.order ){
                
                let nodeName = key
                let nodeDependenceArray = core.order[key]

                for ( let index = 0; index < nodeDependenceArray.length; index++ ) {
                    let nodeDependence = nodeDependenceArray[index]

                    //newNode.previous.push(this.previous[0])
                    //
                    //this.previous.push(newNode)
                    //
                    //newNode.next.push(this)
                    //
                    //newNode.init()

                    order[nodeName].previous.push(
                        order[nodeDependence]
                    )

                    order[nodeDependence].next.push(
                        order[nodeName]
                    )

                }

                order[nodeName].init()

            }

            //// detectExpe


        }else{
            this.styleCheckFail()
        }
    }

    getCore(){
        return Clone.recursiveCloneAttribute(promptsDataBaseComposer[this.typeOfTask])
    }

    deleteHiddenNodes(){

        this.previous.forEach((previousNode) => {

            if(previousNode.hiddenNode){
                previousNode.next = []
                previousNode.previous = []
            }

        })

        this.previous = this.previous.filter((previousNode) => {
            return !previousNode.hiddenNode
        })

    }

    done(){

        let allIsDone = true
        let existHiddenNode = false

        this.previous.forEach((previousNode) => {

            if(
                previousNode.hiddenNode
            ){

                if(!previousNode.isDone){
                    allIsDone = false
                }

                existHiddenNode = true

            }

        })

        return allIsDone && existHiddenNode

    }

    tryOutput(){

        this.previous.forEach(
            (previousNode) => {

                if(
                    previousNode.hiddenNode
                    &&
                    !previousNode.isDone
                ){
                    return false
                }

            }
        )

        let output = this.getCore().output

        this.previous.forEach(
            (previousNode) => {

                if(
                    previousNode.hiddenNode
                ){

                    console.log(previousNode)

                    output = replacer(
                        output,
                        "{[" + previousNode.typeOfTask + "]}",
                        previousNode.get(previousNode)
                    )

                }

            }
        )

        this.input_output.value = output

        return true

    }

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

    styleInit(){

        this.isDone = false

        if(!this.styles){return}

        if(this.element){
            this.element.style.border = "3px solid lightcoral"
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
            this.element.style.border = "3px solid gray"
        }

        this.next.forEach(
            (next) => {
                next.styleCheckFail()
            }
        )
    }

    styleFinish(){

        if(!this.tryOutput()){return}

        this.isDone = true

        this.next.forEach(
            (nextNode) => {
                nextNode.init()
            }
        )

        this.deleteHiddenNodes()

        if(!this.styles){return}

        if(this.element){
            this.element.style.border = "3px solid lightgreen"
        }
        

    }

    constructor(
        typeOfTask,
        element = undefined,
    ){

        this.typeOfTask = typeOfTask

        if(element){

            this.element = element
            this.input_output = Chain.getOutputBlockChain(element)

        }

    }

    next = []
    previous = []

    input_output = {
        value: undefined
    }

    typeOfTask = undefined

    styles = true

    isDone = false



}