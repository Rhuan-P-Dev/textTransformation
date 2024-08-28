import { GetSliderValueController } from "../config/getSliderValueController.js"
import { OnOffController } from "../onOffController.js"
import { ChainController } from "./chainController.js"
import { ChainNode } from "./chainNodeController.js"

var GetSliderValue
var Chain
var OnOff

docReady(function(){

    GetSliderValue = new GetSliderValueController()
    OnOff = new OnOffController()
    Chain = new ChainController()

})

export class PreMadeCustomChainController {

    runOrder = [
        "database",
        "converge",
        "loop",
        "multiloop",
    ]

    run(element, typeOfTask, output){

        let table = {}

        let empty = true

        Chain.getOnOffs(element).forEach((currentElement) => {

            if(
                currentElement.getAttribute
                &&
                OnOff.getOnOff(currentElement) == "on"
            ){

                table[currentElement.innerText.toLowerCase()] = true
                empty = false

            }

        })

        if(empty){return true}

        let initNodes = []
        let outputNodes = []

        for (let index = 0; index < this.runOrder.length; index++) {

            if(
                table[this.runOrder[index]]
            ){

                let init_output = PreMadeCustomChain[this.runOrder[index]](
                    typeOfTask,
                )

                initNodes.push(init_output[0])
                outputNodes.push(init_output[1])

            }

        }

        let init = this.buildNodes(output, initNodes, outputNodes)

        init[0].forEach((node) => {
            node.init()
        })

        return false

    }

    buildNodes(
        output,
        init,
        outputNodes
    ){

        init[0].forEach((node) => {

            node.previous.push(
                output.previous[0]
            )

        })

        for (let index = 0; index < outputNodes.length; index++) {

            outputNodes[index].forEach((outputNode) => {

                if(outputNodes[index+1]){
                    outputNode.previous.forEach(
                        (outputNodePrevius) => {
                            outputNodePrevius.next = []
                        }
                    ) // dell?
                }

                init[index+1]?.forEach((initNode) => {

                    if(
                        (
                            outputNode.typeOfTask === "try upgrade"
                            ||
                            outputNode.typeOfTask === "better formatting"
                        )
                        &&
                        outputNode.mergeOutput === undefined
                    ){

                        outputNode.mergeOutput = initNode

                    }else{

                        outputNode.previous.forEach(// dell?
                            (outputNodePrevius) => {

                                initNode.previous.push(
                                    outputNodePrevius
                                )
                                outputNodePrevius.next.push(
                                    initNode
                                )

                            }
                        )

                    }

                })

            })

        }

        outputNodes[outputNodes.length-1].forEach((outputNode) => {

            if(
                outputNode.typeOfTask === "try upgrade"
                ||
                outputNode.typeOfTask === "better formatting"
            ){

                outputNode.mergeOutput = output

            }else{

                outputNode.next.push(
                    output
                )

            }

        })

        return init

    }

    converge(typeOfTask){

        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("converge depth")
        )

        for (let index = 0; index < rounds(MAX_NODES); index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index+=2) {

            let node1 = new ChainNode(typeOfTask)
            let node2 = new ChainNode(typeOfTask)

            let filterNode = new ChainNode("merge v1", undefined, [node1, node2])

            nodes[0].push(
                filterNode
            )

            initNodes.push(
                node1,
                node2
            )

        }

        for (let index = 0; index < nodes.length-1; index++) {

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                let filterNode = new ChainNode("merge v1", undefined, [
                    nodes[index][indey],
                    nodes[index][indey+1]
                ])

                nodes[index+1].push(filterNode)
                
            }

        }

        return [
            initNodes,
            [nodes[nodes.length-1][0]]
        ]

    }

    loopFunction(current, text){

        if(
            !current.originalTask
        ){
            current.originalTask = current.previous[0].getPrompt()
        }

        text[0]["content"] = replacer(
            text[0]["content"],
            "{[ORIGINAL_DATA]}",
            current.originalTask
        )

        if(
            !current.localOutput
        ){
            current.localOutput = current.previous[0].input_output.value
        }

        text[0]["content"] = replacer(
            text[0]["content"],
            "{[OUTPUT_DATA]}",
            current.localOutput
        )

    }

    loopCheck(current, text){

        current.loops--

        let isComplete = text.toLowerCase().includes("complete")

        if(
            text.includes("<better output>")
            &&
            text.includes("</better output>")
        ){
            text = text.split("<better output>")[1]
            text = text.split("</better output>")[0]
        }else{
            text = current.localOutput
        }

        if(
            isComplete
            ||
            current.loops <= 0
        ){

            let pops = current.next.length

            for (let index = 0; index < pops; index++) {
                current.next.pop()
            }

            current.mergeOutput.input_output.value = text
            current.input_output.value = text

            current.next = []
            current.next.push(current.mergeOutput)

            return false
        }else{

            current.input_output.value = undefined

            current.localOutput = text

            return false

        }

    }

    loop(typeOfTask){

        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("loop depth")
        )

        for (let index = 0; index < rounds(MAX_NODES)+1; index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index++) {

            let node = new ChainNode(typeOfTask)

            let think = new ChainNode("try upgrade", undefined, [node])

            think.next.push(think)

            think.loops = GetSliderValue.get("loop count")
            think.styles = false

            think.callBackInitCustomFunctionsBefore.push(
                PreMadeCustomChain.loopFunction
            )

            think.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.loopCheck
            )

            nodes[0].push(
                think
            )

            initNodes.push(
                node
            )

        }

        for (let index = 0; index < nodes.length-1; index++) {

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                let node1 = nodes[index][indey]
                let node2 = nodes[index][indey+1]

                let filterNode = new ChainNode("merge v1", undefined, [
                    node1,
                    node2
                ])

                if(node1.typeOfTask === "try upgrade"){
                    node1.next.pop()
                }
                if(node2.typeOfTask === "try upgrade"){
                    node2.next.pop()
                }

                node1.mergeOutput = filterNode
                node2.mergeOutput = filterNode

                nodes[index+1].push(filterNode)

            }

        }

        return [
            initNodes,
            [nodes[nodes.length-1][0]]
        ]

    }

    databaseQuestions = [
        "Topic extration",
        "Emotion analyzer",
        "10 things with similarity",
        "Simplify this text",
        "Invert the meaning",
        "Complex this text - HARD",
        "Explain it with gradually",
        "Extract information",
        "Some overview definition",
        "Some definition",
        "Some technology definition",
        "Some religious definition",
        "Some scientific definition",
        "Summary v2"
    ]

    database(typeOfTask){

        let initNodes = []

        //"database questions"

        for (
            let index = 0;
            index < GetSliderValue.get("database questions")
            &&
            index < this.databaseQuestions.length;
            index++){

                let node = new ChainNode(
                    this.databaseQuestions[
                        index
                    ]
                )

                node.isAdditionalNote = true

                initNodes.push(
                    node
                )

        }

        let outputNode = new ChainNode(
            typeOfTask,
            undefined,
            initNodes
        )

        return [
            initNodes,
            [outputNode]
        ]

    }

    multiloop(typeOfTask){

        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("loop depth")
        )

        for (let index = 0; index < rounds(MAX_NODES)+1; index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index++) {

            let node = new ChainNode(typeOfTask)

            let think = new ChainNode("try upgrade", undefined, [node])
            let readability = new ChainNode("better readability")
            let formatting = new ChainNode("better formatting")

            readability.previous.push(node)
            formatting.previous.push(node)

            think.next.push(think)
            readability.next.push(think)
            formatting.next.push(think)

            think.loops = GetSliderValue.get("loop count")
            readability.loops = GetSliderValue.get("loop count")
            formatting.loops = GetSliderValue.get("loop count")

            think.styles = false
            readability.styles = false
            formatting.styles = false

            think.callBackInitCustomFunctionsBefore.push(
                PreMadeCustomChain.loopFunction
            )

            readability.callBackInitCustomFunctionsBefore.push(
                PreMadeCustomChain.loopFunction
            )

            formatting.callBackInitCustomFunctionsBefore.push(
                PreMadeCustomChain.loopFunction
            )

            think.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.loopCheck
            )

            readability.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.loopCheck
            )

            formatting.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.loopCheck
            )

            think.mergeOutput = readability
            readability.mergeOutput = formatting

            nodes[0].push(
                formatting
            )

            initNodes.push(
                node
            )

        }

        for (let index = 0; index < nodes.length-1; index++) {

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                let node1 = nodes[index][indey]
                let node2 = nodes[index][indey+1]

                let filterNode = new ChainNode("merge v1", undefined, [
                    node1,
                    node2
                ])

                if(node1.typeOfTask === "better formatting"){
                    node1.next.pop()
                }
                if(node2.typeOfTask === "better formatting"){
                    node2.next.pop()
                }

                node1.mergeOutput = filterNode
                node2.mergeOutput = filterNode

                nodes[index+1].push(filterNode)

            }

        }

        return [
            initNodes,
            [nodes[nodes.length-1][0]]
        ]

    }

}

const PreMadeCustomChain = new PreMadeCustomChainController()