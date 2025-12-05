import { GetSliderValueController } from "../config/getSliderValueController.js"
import { OnOffController } from "../onOffController.js"
import { PromptsDataBaseController } from "../taskPromptDataBase.js"
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
        "rereadmoredividebyblob",
        "rereadmoredivideby",
        "rereadmoreconverge",
        "rereadmoretryfix",
        "rereadmoreblob",

        "converge",
        "rereadmore",
        "tryfix",
        "blob",
        "goldeninsights",
        "moi",
        
        "database",
        "divideby",
        "bestof",
        
        "loop",
        "multiloop",

        "factoryjudges"
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

            output.previous.forEach((outputNodePrevius) => {
                node.previous.push(
                    outputNodePrevius
                )
            })

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
                            outputNode.typeOfTask === "try be best"
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
                outputNode.typeOfTask === "try be best"
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

    findpick(typeOfTask){
        
    }

    rereadmore(typeOfTask){
        let initNodes = []
        let readTimes = GetSliderValue.get("rereadmore")
        let reReadNode = new ChainNode(typeOfTask)
        reReadNode.callBackInitCustomFunctionsBefore.push(
            (currentNode, text) => {
                let tempText = ""
                for (let index = 0; index < readTimes; index++) {
                    
                    tempText += "\nRead my instruction again:" + text[1]["content"]
                    
                }
                text[1]["content"] += tempText
                console.log(text[1]["content"])
            }
        )
        reReadNode.callBackInitCustomFunctionsAfter.push(
            PreMadeCustomChain.customComplete
        )
        initNodes.push(
            reReadNode
        )
        return [
            initNodes,
            [reReadNode]
        ]

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

    blob(typeOfTask){

        let initNodes = []

        let max_runs = GetSliderValue.get("blob")

        for (let index = 0; index < max_runs; index++) {

            let node = new ChainNode(typeOfTask)

            initNodes.push(
                node,
            )

        }

        let filterNode = new ChainNode("merge v1", undefined, initNodes)

        return [
            initNodes,
            [filterNode]
        ]

    }

    bestof(typeOfTask){

        let initNodes = []

        let filterNodes = []

        let MAX_NODES = GetSliderValue.get("best of")

        for (let index = 0; index < MAX_NODES; index++) {

            let node = new ChainNode(typeOfTask)

            let filterNode = new ChainNode("best of judge", undefined, [node])

            filterNode.callBackInitCustomFunctionsBefore.push(
                PreMadeCustomChain.loopFunction
            )

            filterNodes.push(
                filterNode
            )

            initNodes.push(
                node
            )

        }

        let judgeNode = new ChainNode("$script$", undefined, filterNodes, (thisNode) => {

            console.log(thisNode)

            for (let index = 0; index < thisNode.previous.length; index++) {
                if(!thisNode.previous[index].isDone){return}
            }

            let bestNode = null
            let bestScore = -Infinity

            for (let index = 0; index < thisNode.previous.length; index++) {
                if(!thisNode.previous[index].isDone){
                    console.error("erro!!!!! isso não deveria ser possivel")
                    console.log(
                        thisNode.previous[index]
                    )
                    continue
                }

                let score = thisNode.previous[index].input_output.value.replace("<score></score>","").match(/<score>(.*?)<\/score>/)
                console.log(score)
                if (score && score[1]) {
                    let currentScore = parseFloat(score[1])
                    if (currentScore > bestScore) {
                        bestScore = currentScore
                        bestNode = thisNode.previous[index]
                    }
                }
            }
            
            if (bestNode) {
                thisNode.callBackInit(bestNode.previous[0].input_output.value)
            }else{
                console.error("erro!!!!!!!")
            }

        })

        return [
            initNodes,
            [judgeNode]
        ]

    }

    factoryjudges(typeOfTask){

        let initNodes = []

        let filterNodes = []

        let MAX_NODES = GetSliderValue.get("factory judges")

        let node = new ChainNode(typeOfTask)

        initNodes.push(
            node
        )

        for (let index = 0; index < MAX_NODES; index++) {

            let filterNode = new ChainNode("factory judges", undefined, [node])

            filterNode.callBackInitCustomFunctionsBefore.push(
                PreMadeCustomChain.loopFunction
            )

            filterNodes.push(
                filterNode
            )

        }

        let judgeNode = new ChainNode("$script$", undefined, filterNodes, (thisNode) => {

            for (let index = 0; index < thisNode.previous.length; index++) {
                if(!thisNode.previous[index].isDone){return}
            }

            let yes_no = 0
            let additional_instruction = ""

            for (let index = 0; index < thisNode.previous.length; index++) {
                if(!thisNode.previous[index].isDone){
                    console.error("erro!!!!! isso não deveria ser possivel")
                    console.log(
                        thisNode.previous[index]
                    )
                    continue
                }

                console.log(
                    thisNode.previous[index]
                )

                console.log(
                    thisNode.previous[index].input_output.value
                )

                console.log(
                    thisNode
                )

                console.log(
                    thisNode.input_output.value
                )

                //let answer = thisNode.previous[index].input_output.value.replace("<answer>no</answer>","").replace("<answer>yes</answer>","").match(/<answer>(.*?)<\/answer>/)
                let answer = thisNode.previous[index].input_output.value.match(/<answer>(.*?)<\/answer>/)[1]

                if(answer == "yes"){
                    yes_no+=1
                }else{
                    yes_no-=1
                    additional_instruction += thisNode.previous[index].input_output.value.match(/<additional_instruction>((?:.|\n)*?)<\/additional_instruction>/)[1] + "\n\n"
                }

                console.log(answer)

            }
            
            console.log(yes_no)

            if (yes_no > 0) {
                thisNode.callBackInit(thisNode.previous[0].previous[0].input_output.value)
            }else{
                // ...
                console.log(
                    additional_instruction
                )

                thisNode.previous[0].previous[0].addInstruction(
                    additional_instruction
                )

                thisNode.previous[0].previous[0].init()
            }

        })

        return [
            initNodes,
            [judgeNode]
        ]
    }

    tryfix(typeOfTask){

        let initNodes = []

        let baseNode = new ChainNode(typeOfTask)

        initNodes.push(baseNode)

        let tryFixNode = new ChainNode(
            "try fix the unknown mistake",
            undefined,
            [
                baseNode
            ]
        )

        tryFixNode.callBackInitCustomFunctionsBefore.push(
            PreMadeCustomChain.loopFunction
        )

        tryFixNode.callBackInitCustomFunctionsAfter.push(
            PreMadeCustomChain.customComplete
        )

        return [
            initNodes,
            [tryFixNode]
        ]

    }

    dividebyFunction(textPrompt, thisNode){

        let subIndex = thisNode.dividebyIndex

        let length = textPrompt.length
                
        let indexPlus = subIndex + 1

        let splitedTextPrompt = textPrompt.substring(
            (
                subIndex
                /
                thisNode.dividebyMaxNodes
            ) * length,
            (
                indexPlus
                /
                thisNode.dividebyMaxNodes
            ) * length,
        )

        return "...\n" + splitedTextPrompt + "\n..."

    }

    divideby(typeOfTask){

        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("divide by")
        )

        for (let index = 0; index < rounds(MAX_NODES); index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index+=2) {

            let node1 = new ChainNode(typeOfTask, undefined, [], undefined, [this.dividebyFunction])

            node1.isAdditionalNoiseContext = true
            node1.dividebyIndex = index
            node1.dividebyMaxNodes = MAX_NODES

            let node2 = new ChainNode(typeOfTask, undefined, [], undefined, [this.dividebyFunction])

            node2.isAdditionalNoiseContext = true
            node2.dividebyIndex = index + 1
            node2.dividebyMaxNodes = MAX_NODES

            let highVisionNode = new ChainNode(typeOfTask, undefined, [node1, node2], undefined, [this.dividebyFunction])

            if(MAX_NODES > 2){
                highVisionNode.isAdditionalNoiseContext = true
            }
            
            highVisionNode.dividebyIndex = index
            highVisionNode.dividebyMaxNodes = MAX_NODES / Math.pow(
                2,
                1
            )

            nodes[0].push(
                highVisionNode
            )

            initNodes.push(
                node1,
                node2
            )

        }

        for (let index = 0; index < nodes.length-1; index++) {

            let sss = 0

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                let highVisionNode = new ChainNode(typeOfTask, undefined, [
                    nodes[index][indey],
                    nodes[index][indey+1]
                ], undefined, [this.dividebyFunction])

                highVisionNode.isAdditionalNoiseContext = true
                highVisionNode.dividebyIndex = sss
                highVisionNode.dividebyMaxNodes = MAX_NODES / Math.pow(
                    2,
                    index + 1 + 1
                )

                nodes[index+1].push(highVisionNode)

                sss += 1
                
            }

        }

        nodes[nodes.length-1][0].isAdditionalNoiseContext = false

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

            let think = new ChainNode("try be best", undefined, [node])

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

                if(node1.typeOfTask === "try be best"){
                    node1.next.pop()
                }
                if(node2.typeOfTask === "try be best"){
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

                if(
                    !new PromptsDataBaseController().get(this.databaseQuestions[index])
                ){
                    console.warn(
                        "'"+
                        this.databaseQuestions[index]
                        + "' don't exist"
                    )
                }

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

    dataBaseInsights = [
        "golden insight: accuracy"
    ]

    goldeninsights(typeOfTask){

        let initNodes = []

        let insightNodes = []

        for (
            let index = 0;
            index < GetSliderValue.get("golden insights")
            &&
            index < this.dataBaseInsights.length;
            index++
        ){

                if(
                    !new PromptsDataBaseController().get(this.dataBaseInsights[index])
                ){
                    console.warn(
                        "'"+
                        this.dataBaseInsights[index]
                        + "' don't exist"
                    )
                }

                //let node = new ChainNode(typeOfTask) // isso não deveria ser existir

                let insight = new ChainNode(
                    this.dataBaseInsights[
                        index
                    ],
                    undefined,
                )

                insight.callBackInitCustomFunctionsBefore.push(
                    PreMadeCustomChain.loopFunction
                )

                insight.isAdditionalNote = true

                initNodes.push(
                    insight
                )

        }

        let outputNode = new ChainNode(
            typeOfTask,
            undefined,
            initNodes
        )

        console.log(initNodes)

        return [
            initNodes,
            [outputNode]
        ]

    }

    dataBaseMoi = [
        "moi: accuracy",
        "moi: errors",
    ]

    moi(typeOfTask){

        let initNodes = []

        let moiNodes = []

        let node = new ChainNode(typeOfTask)

        console.log(
            GetSliderValue.get("moi")
        )

        console.log(
            this.dataBaseMoi.length
        )

        for (
            let index = 0;
            index < GetSliderValue.get("moi")
            &&
            index < this.dataBaseMoi.length;
            index++
        ){

                if(
                    !new PromptsDataBaseController().get(this.dataBaseMoi[index])
                ){
                    console.warn(
                        "'"+
                        this.dataBaseMoi[index]
                        + "' don't exist"
                    )
                }

                let moi = new ChainNode(
                    this.dataBaseMoi[
                        index
                    ],
                    undefined,
                    [node]
                )

                //moi.runNextNodeInit = true

                moi.callBackInitCustomFunctionsBefore.push(
                    PreMadeCustomChain.loopFunction
                )

                moi.callBackInitCustomFunctionsAfter.push(
                    (currentNode, text) => {
                        console.log(text)
                        console.log(text.match(/<complete>((?:.|\n)*?)<\/complete>/)[1])
                        if(currentNode.isAdditionalNote){
                            currentNode.next.forEach((nextNode) => {
                                nextNode.addNote(
                                    text.match(/<complete>((?:.|\n)*?)<\/complete>/)[1]
                                )
                                nextNode.init()
                            })
                            return true
                        }
                    }
                )

                moi.isAdditionalNote = true

                moiNodes.push(
                    moi
                )
        }

        let outputNode = new ChainNode(
            "re-write",
            undefined,
            moiNodes
        )

        initNodes.push(
            node
        )

        console.log(initNodes)

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

            let think = new ChainNode("try be best", undefined, [node])
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

    rereadmoreconverge(typeOfTask){


        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("converge depth")
        )

        let readTimes = GetSliderValue.get("rereadmore")

        for (let index = 0; index < rounds(MAX_NODES); index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index+=2) {

            let node1 = new ChainNode(typeOfTask)
            let node2 = new ChainNode(typeOfTask)

            node1.callBackInitCustomFunctionsBefore.push(
                (currentNode, text) => {

                    let tempText = ""

                    for (let index = 0; index < readTimes; index++) {
                        
                        tempText += "\nRead my instruction again:" + text[0]["content"]
                        
                    }

                    text[1]["content"] += tempText

                    console.log(text[0]["content"])

                }
            )

            node2.callBackInitCustomFunctionsBefore.push(
                (currentNode, text) => {

                    let tempText = ""

                    for (let index = 0; index < readTimes; index++) {
                        
                        tempText += "\nRead my instruction again:" + text[0]["content"]
                        
                    }

                    text[1]["content"] += tempText

                    console.log(text[0]["content"])

                }
            )

            node1.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.customComplete
            )

            node2.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.customComplete
            )

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

    rereadmoretryfix(typeOfTask){

        let initNodes = []

        let readTimes = GetSliderValue.get("rereadmore")

        let baseNode = new ChainNode(typeOfTask)

        baseNode.callBackInitCustomFunctionsBefore.push(
            (currentNode, text) => {

                let tempText = ""

                for (let index = 0; index < readTimes; index++) {
                    
                    tempText += "\nRead my instruction again:" + text[0]["content"]
                    
                }

                text[1]["content"] += tempText

                console.log(text[0]["content"])

            }
        )

        initNodes.push(baseNode)

        let tryFixNode = new ChainNode(
            "try fix the unknown mistake",
            undefined,
            [
                baseNode
            ]
        )

        tryFixNode.callBackInitCustomFunctionsBefore.push(
            (currentNode, text) => {

                let tempText = ""

                for (let index = 0; index < readTimes; index++) {
                    
                    tempText += "\nRead my instruction again:" + text[0]["content"]
                    
                }

                text[1]["content"] += tempText

                console.log(text[0]["content"])

            }
        )

        tryFixNode.callBackInitCustomFunctionsBefore.push(
            PreMadeCustomChain.loopFunction
        )

        tryFixNode.callBackInitCustomFunctionsAfter.push(
            PreMadeCustomChain.customComplete
        )

        return [
            initNodes,
            [tryFixNode]
        ]

    }

    rereadmoredivideby(typeOfTask){

        let readTimes = GetSliderValue.get("rereadmore")

        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("divide by")
        )

        for (let index = 0; index < rounds(MAX_NODES); index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index+=2) {

            let node1 = new ChainNode(typeOfTask, undefined, [], undefined, [this.dividebyFunction])

            node1.isAdditionalNoiseContext = true
            node1.dividebyIndex = index
            node1.dividebyMaxNodes = MAX_NODES

            let node2 = new ChainNode(typeOfTask, undefined, [], undefined, [this.dividebyFunction])

            node2.isAdditionalNoiseContext = true
            node2.dividebyIndex = index + 1
            node2.dividebyMaxNodes = MAX_NODES

            let highVisionNode = new ChainNode(typeOfTask, undefined, [node1, node2], undefined, [this.dividebyFunction])

            if(MAX_NODES > 2){
                highVisionNode.isAdditionalNoiseContext = true
            }
            
            highVisionNode.dividebyIndex = index
            highVisionNode.dividebyMaxNodes = MAX_NODES / Math.pow(
                2,
                1
            )

            nodes[0].push(
                highVisionNode
            )

            initNodes.push(
                node1,
                node2
            )

            node1.callBackInitCustomFunctionsBefore.push(
                (currentNode, text) => {

                    let tempText = ""

                    for (let index = 0; index < readTimes; index++) {
                        
                        tempText += "\nRead my instruction again:" + text[0]["content"]
                        
                    }

                    text[1]["content"] += tempText

                    console.log(text[0]["content"])

                }
            )


            node1.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.customComplete
            )

            node2.callBackInitCustomFunctionsBefore.push(
                (currentNode, text) => {

                    let tempText = ""

                    for (let index = 0; index < readTimes; index++) {
                        
                        tempText += "\nRead my instruction again:" + text[0]["content"]
                        
                    }

                    text[1]["content"] += tempText

                    console.log(text[0]["content"])

                }
            )


            node2.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.customComplete
            )

            highVisionNode.callBackInitCustomFunctionsBefore.push(
                (currentNode, text) => {

                    let tempText = ""

                    for (let index = 0; index < readTimes; index++) {
                        
                        tempText += "\nRead my instruction again:" + text[0]["content"]
                        
                    }

                    text[1]["content"] += tempText

                    console.log(text[0]["content"])

                }
            )


            highVisionNode.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.customComplete
            )

        }

        for (let index = 0; index < nodes.length-1; index++) {

            let dividebyIndex = 0

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                let highVisionNode = new ChainNode(typeOfTask, undefined, [
                    nodes[index][indey],
                    nodes[index][indey+1]
                ], undefined, [this.dividebyFunction])

                highVisionNode.isAdditionalNoiseContext = true
                highVisionNode.dividebyIndex = dividebyIndex
                highVisionNode.dividebyMaxNodes = MAX_NODES / Math.pow(
                    2,
                    index + 1 + 1
                )

                nodes[index+1].push(highVisionNode)

                dividebyIndex += 1

                highVisionNode.callBackInitCustomFunctionsBefore.push(
                    (currentNode, text) => {

                        let tempText = ""

                        for (let index = 0; index < readTimes; index++) {
                            
                            tempText += "\nRead my instruction again:" + text[0]["content"]
                            
                        }

                        text[1]["content"] += tempText

                        console.log(text[0]["content"])

                    }
                )


                highVisionNode.callBackInitCustomFunctionsAfter.push(
                    PreMadeCustomChain.customComplete
                )
                
            }

        }

        nodes[nodes.length-1][0].isAdditionalNoiseContext = false

        return [
            initNodes,
            [nodes[nodes.length-1][0]]
        ]

    }

    rereadmoreblob(typeOfTask){

        let initNodes = []

        let max_runs = GetSliderValue.get("blob")
        let readTimes = GetSliderValue.get("rereadmore")

        for (let index = 0; index < max_runs; index++) {

            let node = new ChainNode(typeOfTask)

            node.callBackInitCustomFunctionsBefore.push(
            (currentNode, text) => {
                let tempText = ""
                for (let index = 0; index < readTimes; index++) {
                    
                    tempText += "\nRead my instruction again:" + text[0]["content"]
                    
                }
                text[1]["content"] += tempText
                console.log(text[0]["content"])
            })

            node.callBackInitCustomFunctionsAfter.push(
                PreMadeCustomChain.customComplete
            )

            initNodes.push(
                node,
            )

        }

        let filterNode = new ChainNode("merge v1", undefined, initNodes)

        filterNode.callBackInitCustomFunctionsBefore.push(
        (currentNode, text) => {
            let tempText = ""
            for (let index = 0; index < readTimes; index++) {
                
                tempText += "\nRead my instruction again:" + text[0]["content"]
                
            }
            text[1]["content"] += tempText
            console.log(text[0]["content"])
        })
        
        filterNode.callBackInitCustomFunctionsAfter.push(
            PreMadeCustomChain.customComplete
        )

        return [
            initNodes,
            [filterNode]
        ]

    }

    rereadmoredividebyblob(typeOfTask){

        let max_runs = GetSliderValue.get("blob")

        let readTimes = GetSliderValue.get("rereadmore")

        let initNodes = []

        let nodes = []

        let MAX_NODES = Math.pow(
            2,
            GetSliderValue.get("divide by")
        )

        for (let index = 0; index < rounds(MAX_NODES); index++) {

            nodes.push([])

        }

        for (let index = 0; index < MAX_NODES; index+=2) {

            let blobInitNodes = []

            for (let indey = 0; indey < max_runs; indey++) {

                let node1 = new ChainNode(typeOfTask, undefined, [], undefined, [this.dividebyFunction])

                node1.dividebyIndex = index
                node1.dividebyMaxNodes = MAX_NODES

                let node2 = new ChainNode(typeOfTask, undefined, [], undefined, [this.dividebyFunction])

                node2.dividebyIndex = index + 1
                node2.dividebyMaxNodes = MAX_NODES

                blobInitNodes.push(
                    node1,
                    node2
                )

                initNodes.push(
                    node1,
                    node2
                )

                node1.callBackInitCustomFunctionsBefore.push(
                    (currentNode, text) => {

                        let tempText = ""

                        for (let index = 0; index < readTimes; index++) {
                            
                            tempText += "\nRead my instruction again:" + text[0]["content"]
                            
                        }

                        text[1]["content"] += tempText

                    }
                )


                node1.callBackInitCustomFunctionsAfter.push(
                    PreMadeCustomChain.customComplete
                )

                node2.callBackInitCustomFunctionsBefore.push(
                    (currentNode, text) => {

                        let tempText = ""

                        for (let index = 0; index < readTimes; index++) {
                            
                            tempText += "\nRead my instruction again:" + text[0]["content"]
                            
                        }

                        text[1]["content"] += tempText

                    }
                )


                node2.callBackInitCustomFunctionsAfter.push(
                    PreMadeCustomChain.customComplete
                )

                node1.isAdditionalNoiseContext = true
                node2.isAdditionalNoiseContext = true

            }

            //let filterNode = new ChainNode("merge v1", undefined, blobInitNodes)
            //filterNode.isAdditionalNoiseContext = true

            let highVisionNode = new ChainNode(typeOfTask, undefined, blobInitNodes, undefined, [this.dividebyFunction])

            if(MAX_NODES > 2){
                highVisionNode.isAdditionalNoiseContext = true
            }

            highVisionNode.dividebyIndex = index
            highVisionNode.dividebyMaxNodes = MAX_NODES / Math.pow(
                2,
                1
            )

            nodes[0].push(
                highVisionNode
            )

            highVisionNode.callBackInitCustomFunctionsBefore.push(
                    (currentNode, text) => {

                        let tempText = ""

                        for (let index = 0; index < readTimes; index++) {
                            
                            tempText += "\nRead my instruction again:" + text[0]["content"]
                            
                        }

                        text[1]["content"] += tempText

                    }
                )


                highVisionNode.callBackInitCustomFunctionsAfter.push(
                    PreMadeCustomChain.customComplete
                )

                //filterNode.callBackInitCustomFunctionsBefore.push(
                //    (currentNode, text) => {
//
                //        let tempText = ""
//
                //        for (let index = 0; index < readTimes; index++) {
                //            
                //            tempText += "\nRead my instruction again:" + text[0]["content"]
                //            
                //        }
//
                //        text[1]["content"] += tempText
//
                //    }
                //)
//
//
                //filterNode.callBackInitCustomFunctionsAfter.push(
                //    PreMadeCustomChain.customComplete
                //)

        }

        for (let index = 0; index < nodes.length-1; index++) {

            break

            let dividebyIndex = 0

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                for (let index = 0; index < max_runs; index++) {

                    let highVisionNode = new ChainNode(typeOfTask, undefined, [
                        nodes[index][indey],
                        nodes[index][indey+1]
                    ], undefined, [this.dividebyFunction])

                    highVisionNode.isAdditionalNoiseContext = true
                    highVisionNode.dividebyIndex = dividebyIndex
                    highVisionNode.dividebyMaxNodes = MAX_NODES / Math.pow(
                        2,
                        index + 1 + 1
                    )

                }

                //let filterNode = new ChainNode("merge v1", undefined, initNodes)

                

                nodes[index+1].push(highVisionNode)

                dividebyIndex += 1

                highVisionNode.callBackInitCustomFunctionsBefore.push(
                    (currentNode, text) => {

                        let tempText = ""

                        for (let index = 0; index < readTimes; index++) {
                            
                            tempText += "\nRead my instruction again:" + text[0]["content"]
                            
                        }

                        text[1]["content"] += tempText

                        console.log(text[0]["content"])

                    }
                )


                highVisionNode.callBackInitCustomFunctionsAfter.push(
                    PreMadeCustomChain.customComplete
                )
                
            }

        }

        nodes[nodes.length-1][0].isAdditionalNoiseContext = false

        return [
            initNodes,
            [nodes[nodes.length-1][0]]
        ]

    }

    customComplete(currentNode, text) {

        text = replacer(text, "<complete>...</complete>", "")

        console.log(
            text
        )

        console.log(
            text.match(/<complete>((?:.|\n)*?)<\/complete>/)
        )

        if(text.match(/<complete>((?:.|\n)*?)<\/complete>/)){

            if(
                !currentNode.avoidDefaultInput
            ){
                currentNode.input_output.value = text.match(/<complete>((?:.|\n)*?)<\/complete>/)[1]
            }else{
                currentNode.input_output.value += text.match(/<complete>((?:.|\n)*?)<\/complete>/)[1]
            }

            
        }else{
            console.warn("---------- ERRRO! NO <COMPLETE> -------------")
            console.warn(currentNode)
            return
            if(
                !currentNode.avoidDefaultInput
            ){
                currentNode.input_output.value = text
            }else{
                currentNode.input_output.value += text
            }
        }

    }

}

const PreMadeCustomChain = new PreMadeCustomChainController()