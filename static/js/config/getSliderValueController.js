
export class GetSliderValueController{

    table = {
        "converge depth": document.getElementById("convergeDepth"),
        "loop count": document.getElementById("loopCount"),
        "loop depth": document.getElementById("loopDepth"),
        "database questions": document.getElementById("databaseQuestions"),
    }

    get(name){
        return this.table[name].value
    }

}