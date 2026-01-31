// static/js/chain/advancedChainController.js
import { GetSliderValueController } from "../config/getSliderValueController.js"
import { OnOffController } from "../onOffController.js"
import { PromptsDataBaseController } from "../taskPromptDataBase.js"
import { ChainController } from "./chainController.js"
import { ChainNode } from "./chainNodeController.js"
import { MinimalChainNode } from "./minimalChainNode.js"

// linkedList.js – simple multi‑parent/child linked list
// each node can have many next and previous nodes

// ── Node ───────────────────────────────────────────────────────────────
class ListNode {
    /**
     * @param {number|string} id   Unique identifier
     * @param {string}          type Node type (used by iterate)
     * @param {*}               payload Arbitrary data stored in the node
     */
    constructor(id, type, payload) {
        this.id      = id;
        this.type    = type;
        this.node    = payload;   // payload / “value” of the node
        this.next    = [];        // array of ListNode
        this.previous = [];       // array of ListNode
    }

    /** add a next reference (and back‑reference) */
    addNext(node) {
        if (!this.next.includes(node)) this.next.push(node);
        if (!node.previous.includes(this)) node.previous.push(this);
    }

    /** add a previous reference (and back‑reference) */
    addPrevious(node) {
        if (!this.previous.includes(node)) this.previous.push(node);
        if (!node.next.includes(this)) node.next.push(this);
    }
}

// ── Linked list (graph) ─────────────────────────────────────────────────
class LinkedList {
    constructor() {
        this._nodes   = new Map();   // id → ListNode
        this._counter = 0;           // simple auto‑increment id generator
        this.roots    = [];          // nodes without previous refs (optional)
    }

    /** generate a new unique id (numeric) */
    _genId() {
        return ++this._counter;
    }

    /**
     * Add a node to the list.
     * @param {*} payload               Data stored in the node
     * @param {string} type            Node type (used by iterate)
     * @param {Array<number|string>} [prevIds=[]]  ids of predecessor nodes
     * @param {Array<number|string>} [nextIds=[]]  ids of successor nodes
     * @returns {id}            id of the new node
     */
    add(payload, type, prevIds = [], nextIds = []) {
        const id   = this._genId();
        const node = new ListNode(id, type, payload);
        this._nodes.set(id, node);

        // ---- previous ids (same logic as before) ----
        if (prevIds.length === 0) {
            this.roots.push(node);
        } else {
            prevIds.forEach(pid => {
            const prev = this._nodes.get(pid);
            if (prev) {
                prev.addNext(node);               // liga o anterior ao novo nó
            } else {
                console.warn(`LinkedList.add: previous id ${pid} not found`);
            }
            });
        }

        // ---- next ids (mirroring the previous logic) ----
        if (nextIds.length > 0) {
            nextIds.forEach(nid => {
            const next = this._nodes.get(nid);
            if (next) {
                node.addNext(next);               // liga o novo nó ao seguinte
            } else {
                console.warn(`LinkedList.add: next id ${nid} not found`);
            }
            });
        }

        return node.id;
    }

    /**
     * Remove a node by id and reconnect its neighbours.
     * @param {number|string} id
     * @returns {boolean} true if removed, false if not found
     */
    remove(id) {
        const node = this._nodes.get(id);
        if (!node) return false;

        // reconnect previous → next
        node.previous.forEach(prev => {
            // drop the removed node from prev.next
            prev.next = prev.next.filter(n => n.id !== id);
            // link every next of the removed node
            node.next.forEach(nxt => {
                prev.addNext(nxt);
            });
        });

        node.next.forEach(nxt => {
            // drop the removed node from nxt.previous
            nxt.previous = nxt.previous.filter(p => p.id !== id);
            // link every previous of the removed node
            node.previous.forEach(prev => {
                nxt.addPrevious(prev);
            });
        });

        // clean roots list
        this.roots = this.roots.filter(r => r.id !== id);
        // finally delete
        this._nodes.delete(id);
        return true;
    }

    /**
     * Iterate over all nodes of a given type and execute a callback.
     * @param {string} type   Node type to filter
     * @param {function(ListNode):void} fn  Callback executed for each match
     */
    iterate(type, fn) {
        this._nodes.forEach(node => {
            if (
                node.type === type
                ||
                type === "all"
            ) fn(node);
        });
    }

    /** optional helper – depth‑first traversal from a start node */
    traverse(startId, visit) {
        const start = this._nodes.get(startId);
        if (!start) return;
        const visited = new Set();
        const dfs = node => {
            if (visited.has(node.id)) return;
            visited.add(node.id);
            visit(node);
            node.next.forEach(dfs);
        };
        dfs(start);
    }

    /** expose all nodes (read‑only) */
    get all() {
        return Array.from(this._nodes.values());
    }

    getNode(id){
        return this._nodes.get(id)
    }

    /**
     * Get all previous nodes of the node with the given id.
     * @param {number|string} id
     * @returns {ListNode[]} array of previous ListNode objects (empty if not found)
     */
    getPreviousNodes(id) {
        const node = this._nodes.get(id);
        return node ? [...node.previous] : [];
    }

    /**
     * Get all next nodes of the node with the given id.
     * @param {number|string} id
     * @returns {ListNode[]} array of next ListNode objects (empty if not found)
     */
    getNextNodes(id) {
        const node = this._nodes.get(id);
        return node ? [...node.next] : [];
    }

    /**
     * Remove the mutual link between two nodes.
     *
     * @param {object} node1  Node object
     * @param {object} node2  Node object
     * @returns {boolean} true if both nodes existed and the link was removed
     */
    removeLink(id1, id2) {
        const n1 = this._nodes.get(id1);
        const n2 = this._nodes.get(id2);
        if (!n1 || !n2) return false; // one of the nodes not found

        // ── break n1 → n2 ─────────────────────────────────────
        n1.next = n1.next.filter(node => node.id !== id2);
        n2.previous = n2.previous.filter(node => node.id !== id1);

        // ── break n2 → n1 ─────────────────────────────────────
        n2.next = n2.next.filter(node => node.id !== id1);
        n1.previous = n1.previous.filter(node => node.id !== id2);

        return true;
    }

    /**
     * Add a **mutual** link between two nodes using the ListNode helpers.
     *
     * The method calls `addNext` on each node, which automatically creates the
     * corresponding back‑reference (`previous`). After execution each node is in
     * the other's `next` **and** `previous` arrays.
     *
     * @param {number|string} id1  ID of the first node
     * @param {number|string} id2  ID of the second node
     * @returns {boolean} true if both nodes exist and the link was added,
     *                    false otherwise
     */
    addLink(id1, id2) {
        const n1 = this._nodes.get(id1);
        const n2 = this._nodes.get(id2);
        if (!n1 || !n2) return false;   // one (or both) nodes not found

        // n1 → n2 (adds n2 to n1.next and n1 to n2.previous)
        n1.addNext(n2);

        return true;
    }

    /** Call `fn(node)` for every node in the list. */
    forEach(fn) {
        this._nodes.forEach(fn);
    }

}




export class LogicalNode extends MinimalChainNode{

    shortRegex = "<complete>...</complete>"
    matchRegex = /<complete>([\s\S]*?)<\/complete>/s

    constructor({
        initFunction = () => {this.callBackInit("NONE")},
        previousNodes = [],
        nextNodes = [],
    }){
        super({
            previousNodes,
            nextNodes,
        })

        this.init = initFunction

    }

    customComplete(text) {

        text = text.replaceAll(this.shortRegex, "")

        const match = text.match(this.matchRegex);

        console.log(match)

        if(match){
            return match[1]
        }else{
            return false
        }

    }

}



export class AdvancedChainController {

    constructor({
        GetSliderValueC = new GetSliderValueController(),
        //OnOffC = new OnOffController(),
        ChainC = new ChainController(),
        //ChainNodeC = ChainNode,
        //PromptsDataBaseC = new PromptsDataBaseController(),
    } = {}) {
        this.GetSliderValueC = GetSliderValueC
        //this.OnOffC = OnOffC
        this.ChainC = ChainC
        //this.ChainNodeC = ChainNodeC
        //this.PromptsDataBaseC = PromptsDataBaseC
    }

    /*

    #o divideby(+vision) + reread = YES! 


#converge - cria mais
#divideby - cria mais

#bestof - mid sup?

#tryfix - all sup?
#rereadmore - all sup
#database - all sup
#loop - all sup?

#moi - ?

#o divideby pode fazer assim:
#50% vision -|
#            -> 100% vision
#50% vision -|

#aditional note != aditiontal instruction

#o bestof poderia ver as outras tentativas?

pressiso pensar em um sistema de construção, modificação, logic nodes custom

ReReadMore - + attetion
for: all
for: task & outputers
tryfix - try fix
for: after output
Database - + context - run varies prompt to create a data base
for: all?
type: + knowledge
BestOf - look at x samples of y window, and rank the best one
for: depois dos geradores de conhecimentos?
type: filter
DivideBy(vision) - divide and generate, double the vision and generate
for: separar e gerar usando um sub contexto
type: ?
factoryJudges - make judgemnts to judge if the output finish the task
for: tentar melhorar o output e descreve
type: ?

Loop - try self improve
MultiLoop - try self improve, on x,y,z topics

goldenInsights - ?
MOI - ?

blob = modificar grafico
rereadmore = modificar o prompt
tryfix = pensa + responde, IF se 'não', então passa o conteudo do node anterior
tryfix = usar nodes logicos
Database - roda um prompt base e adiciona conhecimentos no node... como? injetar conehcimentos em TODOS os nodes? tipo o rereadmore?
bestof = pensa + responde, deolver um valor, o maior valor é o mais alto.
bestof = node logico + duplicação de graficos dos geradores de conhecimentos

programar a interação do tryfix com o resto!

    */

    nodesTypes = {

        "base node":"knowledge",

        "blob": "knowledge",
        "blob filter": "merger",

        "converge": "knowledge",
        "converge filter": "merger",

        "try fix": "fixer",

        "loop": "better",
        "factoryjudges": "fixer",

        "selfbestof base": "fixed knowledge",
        "selfbestof": "better",

        "selfbestof - logical": "logic",

        "originalNode": "knowledge",
    }

    graphApplicationOrder = {
        "blob": "first",
        "converge": "first",
        "selfbestof": "first",

        "tryfix": "secound",
        "loop": "second",
        "factoryjudges": "second",
        "reredemore": "second",
    }

    applicationTarget = {
        "tryfix": "knowledge",
        "loop": "knowledge",
        "factoryjudges": "knowledge",
        "reredemore": "all"
    }


    saveConections(node){
        const previous = node.previous
        const next = node.next

        const previousNext = []
        const previousPrevious = []

        const nextPrevious = []
        const nextNext = []

        previous.forEach((previousNode) => {
            previousNext.push(previousNode.next)
            previousPrevious.push(previousNode.previous)
        })

        next.forEach((nextNode) => {
            nextNext.push(nextNode.next)
            nextPrevious.push(nextNode.previous)
        })

        return {
            node,
            previous,
            next,
            previousNext,
            previousPrevious,
            nextNext,
            nextPrevious,
        }

    }

    loadConnections(state) {
        const {
            node,               // the original node whose connections were saved
            previous,           // saved array of node.previous
            next,               // saved array of node.next
            previousNext,       // saved .next arrays of each previous node
            previousPrevious,   // saved .previous arrays of each next node
            nextNext,
            nextPrevious,       // saved .previous arrays of each next node
        } = state;

        if (!node) {
            console.warn('loadConnections: no node reference in saved state');
            return;
        }

        // ---- 1️⃣ restore the node's own links -----------------------------
        node.previous = previous
        node.next     = next

        // ---- 2️⃣ restore each previous node's .next array -------------------
        if (previous && previousNext) {
            previous.forEach((prevNode, i) => {
                const savedNext = previousNext[i];
                prevNode.next = savedNext
                const savedPrev = previousPrevious[i];
                prevNode.previous = savedPrev
            });
        }

        // ---- 3️⃣ restore each next node's .previous array -------------------
        if (next && nextPrevious) {
            next.forEach((nextNode, i) => {
                const savedPrev = nextPrevious[i];
                nextNode.previous = savedPrev
                const savedNext = nextNext[i];
                nextNode.next = savedNext
            });
        }
    }

    run(node){

        const savedState = this.saveConections(node)

        console.log(node)

        // CUDA_VISIBLE_DEVICES= numactl --cpunodebind=1 --membind 1 /media/rp/NVM480GB/llama.cpp_rocm/build/bin/llama-server -fit off -m /media/rp/NVM2T/inclusionAI_Ling-mini-2.0-Q6_K_L.gguf -c 22000 -np 1 -t 26 --port 5003 --no-mmap -fa on -cram -1 --cache-reuse 128 --temp 1 --top-k 20 --top-p 0.9 --min-p 0 --numa isolate

        const element = node.element

        const originalTypeOfTask = node.typeOfTask
        const input = node.previous[0]
        const output = node.next[0]

        const allMods = this.ChainC.getOnsText(element).map(mod => mod.toLowerCase())

        const graph = new LinkedList()

        const inputNode = graph.add(input, "inputNode")

        const outputNode = graph.add(
            output,
            "outputNode",
        )

        output.onBeforeInitsChecks((output) => {
            console.error("==================================")

            console.log(output)

            console.log(this)
            console.log(savedState)
            this.loadConnections(savedState)

            console.log(output)

            console.error("================================== DEBUG ==================================")
            console.error("================================== DEBUG ==================================")
            console.error("================================== DEBUG ==================================")
            console.log(node)
            console.log(node.next[0])
            console.log(node.previous[0])

            node.set(output)
            node.styleFinish()
        },{
            selfDelete: true
        })

        graph.addLink(inputNode, outputNode)

        allMods.forEach((mod) => {

            //graphApplicationOrder = {
            //    "blob": "first",
            //    "converge": "first",
            //    "try fix": "secound",
            //}

            //applicationTarget = {
            //    "try fix": "merger"
            //}

            console.log("++++++++++++++++++++++++")
            console.log(mod)

            if(
                this.graphApplicationOrder[mod] === "first"
            ){

                graph.removeLink(
                    inputNode,
                    outputNode
                )

                this[mod](originalTypeOfTask, inputNode, outputNode, graph)
            }else{
                graph.iterate(this.applicationTarget[mod], (graphNode) => {
                    const nextGraphNode = graphNode.next[0]
                    console.log("------------------------")
                    console.log(graphNode)
                    console.log(nextGraphNode)

                    graph.removeLink(
                        graphNode.id,
                        nextGraphNode.id
                    )

                    this[mod](originalTypeOfTask, graphNode.id, nextGraphNode.id, graph)
                })
            }

        })

        this.buildNodes(graph)

        graph.iterate("inputNode", (graphNode) => {

            graphNode.next.forEach(
                (nextGraphNode) => {
                    nextGraphNode.node.init()
                }
            )

        })

    }

    buildNodes(graph){

        // Phase (1/2) cleans all existing links in each node
        graph.forEach(graphNode => {
            graphNode.node.cleanAllLinks()
        })

        // Phase (2/2) rebuilds the connections from the `next` property
        graph.forEach(
            (graphNode) => {

                const node = graphNode.node

                console.log(node)

                graphNode.next.forEach(
                    (nextGraphNode) => {

                        console.log(nextGraphNode)

                        node?.addNext(
                            nextGraphNode.node
                        )

                    }
                )

                console.log(node)

            }
        )

        console.log(graph)

    }

    blob(typeOfTask, input, output, graph, max_runs = this.GetSliderValueC.get("blob")){

        const blobType = this.nodesTypes["blob"]
        const blobFilterType = this.nodesTypes["blob filter"]

        const filterNode = new ChainNode({
            typeOfTask: "merge v1",
        })

        const graphFilterNode = graph.add(
            filterNode,
            blobFilterType,
            [],
            [output]
        )

        for (let index = 0; index < max_runs; index++) {

            let node = new ChainNode({
                typeOfTask: typeOfTask,
            })


            graph.add(
                node,
                blobType,
                [input],
                [graphFilterNode],
            )

        }

        return graph

    }

    converge(typeOfTask, input, output, graph, maxDepth = this.GetSliderValueC.get("converge depth")){

        const maxNodes = Math.pow(2, maxDepth)

        const initNodes = []

        const nodes = []

        for (let index = 0; index < rounds(maxNodes); index++) {

            nodes.push([])

        }

        for (let index = 0; index < maxNodes; index+=2) {

            const node1 = new ChainNode({
                typeOfTask: typeOfTask
            })

            const graphNode1 = graph.add(
                node1,
                this.nodesTypes["converge"],
                [input],
                []
            )

            const node2 = new ChainNode({
                typeOfTask: typeOfTask
            })

            const graphNode2 = graph.add(
                node2,
                this.nodesTypes["converge"],
                [input],
                []
            )

            const filterNode = new ChainNode({
                typeOfTask: "merge v1",
                previousNodes: [node1, node2]
            })

            const graphFilterNode = graph.add(
                filterNode,
                this.nodesTypes["converge filter"],
                [graphNode1, graphNode2],
                []
            )

            nodes[0].push(
                graphFilterNode
            )

            initNodes.push(
                graphNode1,
                graphNode2
            )

        }

        for (let index = 0; index < nodes.length-1; index++) {

            for (let indey = 0; indey < nodes[index].length; indey+=2) {

                const filterNode = new ChainNode({
                    typeOfTask: "merge v1",
                })

                const graphFilterNode = graph.add(
                    filterNode,
                    this.nodesTypes["converge filter"],
                    [nodes[index][indey], nodes[index][indey+1]],
                    [],
                )

                nodes[index+1].push(graphFilterNode)
                
            }

        }

        graph.addLink(
            nodes[nodes.length-1][0],
            output
        )

        return graph

    }

    tryFixNodeLogic(thisNode){
        // ???
    }

    tryfix(typeOfTask, input, output, graph){

        const tryFixNode = new ChainNode({
            typeOfTask: "try fix the unknown mistake"
        })

        const graphTryFixNode = graph.add(
            tryFixNode,
            this.nodesTypes["try fix"],
            [input],
            []
        )

        const logicalNode = new LogicalNode({
            initFunction: function(){
                console.error("===LOGIOC!!!!!!!!!! ==================================")

                const getAll = this.get(this.previous[0])
                const previousPrevious = this.get(this.previous[0].previous[0])

                console.log(getAll)

                const tryFixOutput = this.customComplete(getAll)

                console.log(tryFixOutput)

                if(!tryFixOutput){
                    console.log("error!")
                }

                console.warn("=============================================")
                console.log(getAll)
                console.log(tryFixOutput)

                const regex = /^\s*no\s*$/i;

                if (regex.test(tryFixOutput)) {
                    this.callBackInit(previousPrevious);
                } else {
                    this.callBackInit(tryFixOutput);
                }

            },
        })

        const logicalNodeGraph = graph.add(
            logicalNode,
            "logicalNode",
            [graphTryFixNode],
            [output],
        )

        return graph

    }

    loop(typeOfTask, input, output, graph, loopCount = this.GetSliderValueC.get("loop count")){

        // O PROMPT DO 'LOOP' ESTA COLOCANDO O 'THINK PROCESS' VAZA PARA O OUTPUT, FIX!!!!

        const think = new ChainNode({
            typeOfTask: "try be best",
        })

        const graphThinkNode = graph.add(
            think,
            this.nodesTypes["loop"],
            [input],
            []
        )

        const logicalNode = new LogicalNode({
            initFunction: function(){
                console.error("===LOGIOC!!!!!!!!!! ==================================")

                const getAll = this.get(this.previous[0])
                const previousPrevious = this.get(this.previous[0].previous[0])

                //console.log(getAll)

                const tryFixOutput = this.customComplete(getAll)

                //console.log(tryFixOutput)

                if(!tryFixOutput){
                    console.log("error!")
                }

                //console.warn("=============================================")
                //console.log(getAll)
                //console.log(tryFixOutput)

                const regex = /^\s*no\s*$/i;

                if (
                    regex.test(tryFixOutput)
                    ||
                    this.loopCount <= 0
                ) {
                    this.callBackInit(previousPrevious);
                } else {
                    this.loopCount--
                    this.previous[0].previous[0].set(tryFixOutput)
                    this.previous[0].init()
                }

            },
        })

        logicalNode.loopCount = loopCount

        const logicalNodeGraph = graph.add(
            logicalNode,
            "logicalNode",
            [graphThinkNode],
            [output],
        )

        return graph

    }

    selfbestof(typeOfTask, input, output, graph, bestOfCount = this.GetSliderValueC.get("best of")){

        // deve ter 1 "best of judge" para 1 knowloge node, porem, sometne um logical node para todos
        // selfbestof base

        // modificar o prompt e fazer considerar o que não foi escrito, tipo 'emotion[1~99]' nota -> 1/100

        const logicalNode = new LogicalNode({
            initFunction: function(){

                const thisNode = this

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
            },
        })

        const graphLogicalNode = graph.add(
            logicalNode,
            this.nodesTypes["selfbestof - logical"],
            [],
            [output],
        )

        for (let index = 0; index < bestOfCount; index++) {

            const baseNode = new ChainNode({
                typeOfTask: typeOfTask,
            })

            const baseNodeGraph = graph.add(
                baseNode,
                this.nodesTypes["selfbestof base"],
                [input],
                []
            )

            const filterNode = new ChainNode({
                typeOfTask: "best of judge",
            })

            const graphFilterNode = graph.add(
                filterNode,
                this.nodesTypes["selfbestof"],
                [baseNodeGraph],
                [graphLogicalNode]
            )

        }

        return graph

    }

    rereadmore(typeOfTask, input, output, graph, rereadmoreCount = this.GetSliderValueC.get("rereadmore")){

        const node = graph.getNode(input).node

        node.setSpecialFlags({
            "repeatPrompt": rereadmoreCount
        })

        node.onOutput(
            node.cleanSpecialFlags,
            {
                selfDelete: true
            }
        )

        return graph
    }

    findpick(typeOfTask){
        
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

    factoryjudges(typeOfTask, input, output, graph, countFactoryJudges = this.GetSliderValueC.get("factory judges")){

        // need to modfy the prompt

        const filterNode = new ChainNode({
            typeOfTask: "factory judges",
        })

        const graphFilterNode = graph.add(
            filterNode,
            this.nodesTypes["factory judges"],
            [input],
            []
        )

        filterNode.callBackInitCustomFunctionsBefore.push(
            PreMadeCustomChain.loopFunction
        )

        filterNodes.push(
            filterNode
        )

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

}