
export class ChainController {

    chainBox = document.getElementById("chainBox")

    addChainBlock(){
        this.chainBox.insertAdjacentHTML("beforeend",chainBlockTemplate)
    }

    removeChainBlock(){
        let lastNode = this.chainBox.childNodes[this.chainBox.childNodes.length-1]
        lastNode.parentNode.removeChild(lastNode)
    }

}

var Chain = new ChainController()