class CustomDoublyLinkedList{

    Chain = ""

    firstNode = {
        protected: true,
        input_output: document.getElementById("chainInput"),

        init: function(){
            this.next.init()
        },

        next:undefined,
        previous:null,
    }

    lastNode = {
        protected:true,
        lastNode:true,

        input_output:document.getElementById("chainOutput"),
        get: function(){return this.previous.input_output.value},
        init: function(){
            this.input_output.value = this.get()
        },

        next:null,
        previous:undefined,

        styleInit:() => {},
        styleCheckFail:() => {},
    }

    constructor(){
        this.firstNode.next = this.lastNode
        this.lastNode.previous = this.firstNode
        this.Chain = this.firstNode
    }

    add(ChainNode){
        let node = this.Chain
        while(1){
            if(node.next.lastNode == true){
                let oldNext = node.next

                node.next = ChainNode
                oldNext.previous = ChainNode

                ChainNode.next = oldNext
                ChainNode.previous = node

                return
            }else{
                node = node.next
            }
        }
    }
    
    remove(){
        let node = this.Chain
        while(1){
            if(node.next.lastNode == true){

                if(node.protected){return}

                node.previous.next = node.next
                node.next.previous = node.previous

                return
            }else{
                node = node.next
            }
        }
    }

}