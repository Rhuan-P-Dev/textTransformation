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

function promptCleaner(prompt){
    return replacer(prompt, "\\", "")
}

function removeThink(text){
    return text.replace(/<think>[\s\S]*?<\/think>\n\n/g, "").replace(/<think>[\s\S]*?<\/think>\n/g, "")
}

function callBackCleaner(text){

    text = replacer(text, "<input>", "")
    text = replacer(text, "</input>", "")
    text = replacer(text, /<input_\d+>|\<\/input_\d+>/g, "") // This pattern matches "<input_X>" and "</input_X>", where X is a number
    text = replacer(text, "<output>", "")
    text = replacer(text, "</output>", "")

    text = removeThink(text)

    text = removeGptOss(text)

    return text
}


function randomInteger(min = 0, max = 1){
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomUniqueID() {
    return "ID"+randomInteger(0, 2**52)
}

function rounds(number){
    return Math.floor(Math.log2(number))
}

const gptOssFinalToken = "<|start|>assistant<|channel|>final<|message|>"

function removeGptOss(text){
    if (text.indexOf(gptOssFinalToken) !== -1) {
        return text.substring(text.indexOf(gptOssFinalToken) + gptOssFinalToken.length).trim();
    }else{
        return text
    }
}