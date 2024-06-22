
const promptsDataBase = {
    "to English": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Translate the text to English. Please respond **ONLY** with the translated text.`},
    ],
    "to PT-BR": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Translate the text to PT-BR. Please respond **ONLY** with the translated text.`},
    ],
    "Fix gramatical errors": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Fix all gramatical errors. First give the fixed text and after give a detailed explanation about every fix.`},
    ],
    "Emotion analyzer": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Tell me what emotion it conveys. Please respond to me in this **format**: emotion1, emotion2, emotion3, and so on... Please respond **ONLY** with the emotions.`},
    ],

    "Topic extration": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Tell me the topics. Please respond to me in this **format**: topic1, topic2, topic3, and so on... Please respond **ONLY** with the topics.`},
    ],

    "Some definition": [
        {"role": "user", "content": "Give me some definition of {[DATA]}."},
    ],
    "10 words with similarity": [
        {"role": "user", "content": "Give me the 10 words with similarity of {[DATA]}. 1-10."},
    ],
    "Summary": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Make a summary.`},
    ],
    "Simplify this text": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Simplify this text. Please respond **ONLY** with the simplified text.`},
    ],

    "Complex this text": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Transform this text into a more complex one. Please respond **ONLY** with the transformed text.`},
    ],

    "Complex this text - HARD": [
        {"role": "user", "content": `Look at this: <text>{[DATA]}</text>

Now, Transform this text into a more complex, expert, profound, detailed, and nuanced one. Please respond **ONLY** with the transformed text.`},
    ],

}