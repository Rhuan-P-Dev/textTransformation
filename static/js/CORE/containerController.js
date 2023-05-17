
export class ContainerController {

    mainContainer = document.getElementById("mainContainer")
    configContainer = document.getElementById("configContainer")
    chainContainer = document.getElementById("chainContainer")

    switchTab(tab){

        Container.hiddenAll()

        if(tab == "main"){
            Container.showMain()

            return true
        }

        if(tab == "config"){
            Container.showConfig()

            return true
        }

        if(tab == "chain"){
            Container.showChain()

            return true
        }

        return false
    }

    showMain(){
        this.mainContainer.style.display = "block"
    }

    hiddenMain(){
        this.mainContainer.style.display = "none"
    }

    showConfig(){
        this.configContainer.style.display = "block";
    }

    hiddenConfig() {
        this.configContainer.style.display = "none";
    }

    showChain() {
        this.chainContainer.style.display = "block";
    }

    hiddenChain() {
        this.chainContainer.style.display = "none";
    }

    hiddenAll(){
        Container.hiddenMain()
        Container.hiddenConfig()
        Container.hiddenChain()
    }
}

var Container = new ContainerController()