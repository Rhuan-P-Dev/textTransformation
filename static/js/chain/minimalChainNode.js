export class MinimalChainNode{

    input_output = {
        value: undefined,
    }

    next = []
    previous = []

    isDone = false

    constructor({
        previousNodes = [],
        nextNodes = [],
    }){

        previousNodes.forEach((previousNode) => {

            this.addPrevious(previousNode)

        })

        nextNodes.forEach((nextNode) => {

            this.addNext(nextNode)

        })

    }

    set(text){
        this.input_output.value = text
    }

    get(node = this){
        return node.input_output.value
    }

    getAll(){

        let all = []

        this.previous.forEach((previous) => {
            all.push(this.get(previous))
        })

        return all

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

    getAllOutputs(){

        return this.formatGetAllOutput(this.getAll()) || this.previous[0]?.getAllOutputs() || ""

    }

    getCleanOutputs(){

        return this.getAllOutputs()

        //return this.UtilsC.promptCleaner(
        //    this.getAllOutputs()
        //)

    }

    addNext(node){
        node.previous.push(this)
        this.next.push(node)
    }

    addPrevious(node){
        node.next.push(this)
        this.previous.push(node)
    }

    cleanAllLinks(){
        this.next = []
        this.previous = []
    }



    // HACK!

    getTask(){
        return "dummy"
    }

    init(){
        this.styleInit()
    }

    callBackInit(text){

        this.set(text)

        this.styleFinish()

        this.next.forEach(
            (next) => {
                next.init()
            }
        )

    }

    styleInit(){

        this.isDone = false

        this.next.forEach(
            (next) => {
                next.styleInit()
            }
        )
    }

    styleCheckFail(){

        this.next.forEach(
            (next) => {
                next.styleCheckFail()
            }
        )

    }

    styleFinish(){

        this.isDone = true

    }

}