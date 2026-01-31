
export class UtilsController {

    static promptCleaner(prompt){
        return replacer(prompt, "\\", "")
    }

    static callBackCleaner(text){

        text = replacer(text, "<input>", "")
        text = replacer(text, "</input>", "")
        text = replacer(text, /<input_\d+>|\<\/input_\d+>/g, "") // This pattern matches "<input_X>" and "</input_X>", where X is a number
        text = replacer(text, "<output>", "")
        text = replacer(text, "</output>", "")

        text = UtilsController.removeThink(text)

        return text
    }

    static removeThink(text){
        text = text.replace(/<think>[\s\S]*?<\/think>\n\n/g, "").replace(/<think>[\s\S]*?<\/think>\n/g, "")
        text = UtilsController.removeGptOss(text)
        return text
    }

    static gptOssFinalToken = "<|start|>assistant<|channel|>final<|message|>"

    static removeGptOss(text){
        if (text.indexOf(UtilsController.gptOssFinalToken) !== -1) {
            return text.substring(text.indexOf(UtilsController.gptOssFinalToken) + UtilsController.gptOssFinalToken.length).trim();
        }else{
            return text
        }
    }

}