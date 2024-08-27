
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
    "10 words with similarity": [
        {"role": "user", "content": "Give me the 10 words with similarity of {[DATA]}. 1-10."},
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
}