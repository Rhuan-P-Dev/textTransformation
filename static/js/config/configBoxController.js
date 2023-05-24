
export class ConfigBoxController {

    allConfigBox = document.querySelectorAll(".configBox")

    addTriggers(){
        for (let index = 0; index < this.allConfigBox.length; index++) {
            this.allConfigBox[index].childNodes[1].addEventListener("click",function(){
                if(this.parentNode.getAttribute("state") == "closed"){
                    this.parentNode.setAttribute("state","open")
                    this.parentNode.childNodes[3].style.display = "flex"
                    this.parentNode.childNodes[1].style.color = "white"
                }else{
                    this.parentNode.setAttribute("state","closed")
                    this.parentNode.childNodes[3].style.display = "none"
                    this.parentNode.childNodes[1].style.color = "black"
                }
            })
            

        }
    }


}

var ConfigBox = new ConfigBoxController()