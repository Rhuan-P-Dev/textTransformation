import { PromptsDataBaseController } from "../taskPromptDataBase.js";

export class PromptController {

    //dataTemplateBefore = "# BELOW YOUR INPUT DATA TO USE TO FINISH YOUR TASK:\n\n<input>"
    dataTemplateBefore = "<input>"
    //dataTemplateAfter = "</input> \n\n# ABOVE IS YOUR INPUT DATA TO FINISH YOUR TASK."
    dataTemplateAfter = "</input>\n\n"

    specialTokens = {

        "{[DATA]}": {
            before: "<input>",
            after: "</input>\n\n",
            function: this.dataProcess,
        },

        //isso é referente ao input do node anterior do node atual
        "{[ORIGINAL_DATA]}": {
            before: "<original input>",
            after: "</original Input>",
            function: this.originalDataProcess,
        },

        //isso é referente ao output do node anterior do node atual
        "{[OUTPUT_DATA]}": {
            before: "<original output>",
            after: "</original output>",
            function: this.originalOutputProcess,
        },

        //isso é referente ao task do node anterior do node atual
        "{[TASK_DATA]}": {
            before: "<original task>",
            after: "</original task>",
            function: this.originalTaskProcess,
        }

    }

    constructor({
        PromptsDataBaseC = new PromptsDataBaseController(),
    } = {}){

        this.PromptsDataBaseC = PromptsDataBaseC

    }

    dataProcess(instruction, data, node, key, before, after){

        const finalReplacement = `${before}${data}${after}`
        instruction[0].content = instruction[0].content.replaceAll(key, finalReplacement);

        return instruction

    }

    originalDataProcess(instruction, data, node, key, before, after){

        const previousNode = node.previous[0] // user [0] is sub-optimal
        const previousData = previousNode.getAll()

        const finalReplacement = `${before}${previousData}${after}`
        instruction[0].content = instruction[0].content.replaceAll(key, finalReplacement);

        return instruction

    }

    originalOutputProcess(instruction, data, node, key, before, after){

        const previousNode = node.previous[0] // user [0] is sub-optimal
        const previousData = previousNode.get()

        const finalReplacement = `${before}${previousData}${after}`
        instruction[0].content = instruction[0].content.replaceAll(key, finalReplacement);

        return instruction

    }

    originalTaskProcess(instruction, data, node, key, before, after, thisClass){

        const previousNode = node.previous[0] // user [0] is sub-optimal
        const previousNodeTask = previousNode.getTask() // isso esta errado, por enquanto esta certo!

        console.log(previousNodeTask)

        let previousNodePrompt = ""

        if(previousNodeTask){

            previousNodePrompt = thisClass.getPrompt({
                prompt: previousNodeTask,
                data: data,
                node: node,
                justPrompt: true
            })[0].content

            console.log(previousNodePrompt)

        }

        const finalReplacement = `${before}${previousNodePrompt}${after}`
        instruction[0].content = instruction[0].content.replaceAll(key, finalReplacement);

        return instruction

    }

    instructionProcessing(instruction, data, node) {

        for (const key in this.specialTokens){
            const process = this.specialTokens[key].function

            const before = this.specialTokens[key].before
            const after = this.specialTokens[key].after

            instruction = process(instruction, data, node, key, before, after, this)

        }

        return instruction

    }

    promptBooter(prompt){

        prompt.push(
            {
                role: "system",
                content: `Remember that your works is being loged and everything you do will be reviewed by a senior.`
            }
        )

        return prompt

    }

    getPrompt({
        prompt = "",
        node = undefined,
        data = undefined,
        
        justPrompt = false

    } = {}){

        const specialFlags = {
            repeatPrompt: 1
        }

        // colocar um objeto no node, armazenando os prompts extras para aqui eu injetar?
        // como duplico meus prompts? dividos os prompts?

        if(!data || !node){
            errr
        }

        let instruction = this.PromptsDataBaseC.get(prompt)

        if(justPrompt){
            return instruction
        }

        instruction = this.instructionProcessing(instruction, data, node)


        // hacky
        for (let index = specialFlags.repeatPrompt; 0 < index; index--) {
            
            instruction[0].content += "\nLets read all instructions again: " + instruction[0].content
            
        }

        console.log("------------------------------------")
        console.log(instruction)
        console.log("------------------------------------")



        //instruction = this.promptBooter(instruction)

        //console.log(instruction)

        return instruction

    }

    // pos promopt buster? I senior will review, your output to check it's quality
    // adicinar flags custom nessa run? nesse node?
    // se o prompt tem x y z, posso tratalo de forma diferente!!!

}