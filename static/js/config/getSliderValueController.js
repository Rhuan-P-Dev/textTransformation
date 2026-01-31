
export class GetSliderValueController{

    table = {
        "converge depth": document.getElementById("convergeDepth"),
        "loop count": document.getElementById("loopCount"),
        "loop depth": document.getElementById("loopDepth"),
        "database questions": document.getElementById("databaseQuestions"),
        "best of": document.getElementById("bestOf"),
        "divide by": document.getElementById("divideBy"),
        "rereadmore": document.getElementById("rereadMore"),
        "blob": document.getElementById("blob"),
        "golden insights": document.getElementById("goldenInsights"),
        "moi": document.getElementById("moi"),
        "factory judges": document.getElementById("factoryjudges")
    }

    get(name){
        return this.table[name].value
    }

}