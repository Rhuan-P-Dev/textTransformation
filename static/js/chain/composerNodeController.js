import { CloneController } from "../utils/clone.js"
import { ChainNode } from "./chainNodeController.js"

export class ComposerNodeController {

    newComposerNode(element){

        return new ComposerNode({
            element
        })
    
    }

}

export class ComposerNode extends ChainNode{

    constructor({
        typeOfTask,
        element,
    } = {}){
        super({
            typeOfTask,
            element
        })
    }

    init(){

        const AFTER_BEFORE_STATS = {
            previous: this.previous[0],
            next: this.next[0],
            previousNext: [this.next[0]],
            nextPrevious: [this.previous[0]]
        }

        this.styleInit()

        this.defineTask()

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

            let core = this.getCore()

            // Only useful if the core.order exists
            let order = {
                "input": this.previous[0]
            }

            for (let index = 0; index < core.input.length; index++) {
                
                let typeOfTask = core.input[index]

                //if it don't have element, special don't work
                let newNode = new ChainNode({
                    typeOfTask,
                })

                newNode.set("")

                newNode.hiddenNode = true
                //newNode.runNextNodeInit = true

                //newNode.frozenTypeOfTask = typeOfTask

                //newNode.callBackInitCustomFunctionsAfter.push(
                    //PreMadeCustomChain.customComplete
                //)

                //newNode.avoidDefaultInput = core.avoidDefaultInput

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

            for (let index = 0; index < core.outputTask.length; index++) {

                console.log("================= outputtask ======================")

                let node = order[core.outputTask[index]]

                console.log(node)
                
                node.next.push(this)
                this.previous.push(node)

                node.element = undefined

                //const AFTER_BEFORE_STATS = {
                //    previous: this.previous,
                //    next: this.next,
                //    previousNext: this.previous.next,
                //    nextPrevious: this.next.previous
                //}

                this.next[0].onOutput(
                    () => {

                        console.log("========== DIRT FIX ===============")

                        console.log(node)

                        console.log(AFTER_BEFORE_STATS)

                        console.log(AFTER_BEFORE_STATS.previous.next)

                        AFTER_BEFORE_STATS.previous.next = AFTER_BEFORE_STATS.previousNext
                        AFTER_BEFORE_STATS.next.previous = AFTER_BEFORE_STATS.nextPrevious

                        console.log(AFTER_BEFORE_STATS.previous.next)
                        console.log("=============  DONE!!! ======================")
                    }
                )
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
        // TODO - fix it!
        return new CloneController().recursiveCloneAttribute(promptsDataBaseComposer[this.typeOfTask])
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

}