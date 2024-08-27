function docReady(fn) {
    // stack overflow
    // see if DOM is already available
    if (document.readyState === "complete" || document.readyState === "interactive") {
        // call on next available tick
        setTimeout(fn, 1);
    } else {
        document.addEventListener("DOMContentLoaded", fn);
    }
}

function replacer(text, targetText, newText){

    let oldText = ""

    do{
        oldText = text

        text = text.replace(targetText, newText)

    }while(text != oldText)
    
    return text
}

function randomInteger(min = 0, max = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomUniqueID() {
    return "ID"+randomInteger(0, 2**52)
}
