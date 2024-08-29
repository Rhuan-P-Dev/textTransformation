class CustomDoublyLinkedList{

    Chain = ""

    firstNode = {
        protected: true,
        input_output: document.getElementById("chainInput"),

        init: function(){
            this.next.forEach(
                (next) => {
                    next.init()
                }
            )
            
        },

        isDone: true,

        next: [],
        previous: [],
    }

    lastNode = {
        protected:true,
        lastNode:true,

        input_output:document.getElementById("chainOutput"),
        get: function(){
            let output = ""
            this.previous.forEach(
                (previous) => {
                    output = output + previous.input_output.value
                }
            )
            return output
        },
        init: function(){
            this.input_output.value = this.get()
        },

        next: [],
        previous:[],

        styleInit:() => {},
        styleCheckFail:() => {},
    }

    constructor(){
        this.firstNode.next.push(this.lastNode)
        this.lastNode.previous.push(this.firstNode)
        this.Chain = this.firstNode
    }

    add(ChainNode){
        let node = this.Chain
        while(1){
            if(node.next[0].lastNode == true){
                let oldNext = node.next.pop()
                oldNext.previous.pop()

                node.next.push(ChainNode)
                oldNext.previous.push(ChainNode)

                ChainNode.next.push(oldNext)
                ChainNode.previous.push(node)

                return
            }else{
                node = node.next[0]
            }
        }
    }
    
    remove(){
        let node = this.Chain
        while(1){
            if(node.next[0].lastNode){

                if(node.protected){return}

                node.previous[0].next.pop()
                node.previous[0].next.push(node.next[0])
                node.next[0].previous.pop()
                node.next[0].previous.push(node.previous[0])

                return
            }else{
                node = node.next[0]
            }
        }
    }

}