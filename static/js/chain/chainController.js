
export class ChainController {

    chainBox = document.getElementById("chainBox")

    addChainBlock(){
        this.chainBox.insertAdjacentHTML("beforeend",chainBlockTemplate)
    }

    removeChainBlock(){
        let lastChainBlock = Chain.getLastChainBlock()
        lastChainBlock.parentNode.removeChild(lastChainBlock)
    }

    getLastChainBlock(){
        return this.chainBox.childNodes[this.chainBox.childNodes.length-1]
    }

}

var Chain = new ChainController()