
const promptsDataBase = {
    "to English": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Translate the input to English. Please respond **ONLY** with the translated input.`},
    ],
    "to PT-BR": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Translate the input to PT-BR. Please respond **ONLY** with the translated input.`},
    ],
    "Fix gramatical errors": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Fix all gramatical errors of the input. First give a detailed explanation about every fix and after give the fixed input.`},
    ],
    "Emotion analyzer": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Tell me what emotion the input conveys. Please respond to me in this **format**: emotion1, emotion2, emotion3, and so on... Please respond **ONLY** with the emotions.`},
    ],

    "Topic extration": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Tell me the topics of input. Please respond to me in this **format**: topic1, topic2, topic3, and so on... Please respond **ONLY** with the topics.`},
    ],

    "Some definition": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Provide me with a definition of the input.`},
    ],

    "Some scientific definition": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Provide me with a scientific definition of the input.`},
    ],

    "Some religious definition": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Provide me with a religious definition of the input.`},
    ],

    "Some technology definition": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Provide me with a technology definition of the input.`},
    ],

    "Some overview definition": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Provide me with a overview definition of the input content.`},
    ],

    "10 things with similarity": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Give me the 10 things with similarity of the input.`},
    ],
    "Summary": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Make a summary.`},
    ],
    "Summary v1": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, summarize the input, highlighting the most relevant topics. For example: **Key topic** brief introduction.`},
    ],
    "Summary v2": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, summarize the input, highlighting the most relevant topics. For example: **Key topic** brief introduction. After the summary explain deeply each topic.`},
    ],
    "Simplify this text": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Simplify this input. Please respond **ONLY** with the simplified input.`},
    ],

    "Complex this text": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Transform this input into a more complex one. Don't invent nonsensical things, just make small obvious assumptions, stay consistent with the input. Please respond **ONLY** with the transformed input. Don't forget to **FOLLOW** the style of the original input.`},
    ],

    "Complex this text - HARD": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Now, Transform this input into a more complex, expert, profound, detailed, and nuanced one. Don't invent nonsensical things, just make small obvious assumptions, stay consistent with the input. Please respond **ONLY** with the transformed input. Don't forget to **FOLLOW** the style of the original input.`},
    ],

    "Explain it with gradually": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

Explain the input with gradually increasing complexity, up to five.`}
    ],

    "Invert the meaning": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

invert the meaning of this input. **ONLY** respond with inverted input.`}
    ],

    "Extract information": [
        {"role": "user", "content": `input:<input>{[DATA]}</input>

You will extract every core piece of information from the input.`}
    ],








    "merge v1": [
    {"role": "user", "content": `input:<input>{[DATA]}</input>

I want you to merge ALL inputs, but you must follow these **guidelines** for a high-quality merge.

# **guidelines**:
1. Forbidden: duplicated content, similar meaning contents and ignoring rule 3.
2. All generated content must be directly relevant to the final output. If an input does not contribute any new information or perspective to the final output, it will not be included.
3. Only respond with the final output.
4. Don't invent nonsensical things, Don't make **ANY** assumptions, stay consistent with the inputs.
5. Don't forget to **FOLLOW** the style of the input.`}
    ],
    "try upgrade": [
        {"role": "user", "content": `original input:<original input>{[ORIGINAL_DATA]}</original Input>

original output:<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. Identify the objective of the original input, Think step-by-step.
2. Think if the output manage to achieve this objective.
3. Think if is possible to improve in some way to better achieve the objective.
4. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, start with: <better output> and end with: </better output>`}
    ],

    "better readability": [
        {"role": "user", "content": `original input:<original input>{[ORIGINAL_DATA]}</original Input>

original output:<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. try catch some issue, error, or low quality readability in the original input, Think step-by-step.
2. Think if is possible to improve in some way to better achieve the better readability.
3. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, start with: <better output> and end with: </better output>`}
    ],

    "better formatting": [
        {"role": "user", "content": `original input:<original input>{[ORIGINAL_DATA]}</original Input>

original output:<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. try catch some issue, error, or low quality formatting in the original input, Think step-by-step.
2. Think if is possible to improve in some way to better achieve the better formatting.
3. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, start with: <better output> and end with: </better output>`}
    ],

}