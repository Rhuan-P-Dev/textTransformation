
const promptsDataBase = {
    "to English": [
        {"role": "user", "content": "Translate the following text into English: [[[{[DATA]}]]]"},
        {"role": "assistant", "content": "Sure! Here's a translation of that text in English:"},
    ],
    "to PT-BR": [
        {"role": "user", "content": "Translate the following text into PT-BR: [[[{[DATA]}]]]"},
        {"role": "assistant", "content": "Sure! Here's a translation of that text in PT-BR:"},
    ],
    "Emotion Analyzer": [
        {"role": "user", "content": "I will write a text and I want you to tell me what emotion it conveys: [[[{[DATA]}]]]"},
        {"role": "assistant", "content": "The emotions conveyed in this text are"},
    ],

    "Some Definition": [
        {"role": "user", "content": "Give me some definition of {[DATA]}."},
        {"role": "assistant", "content": "Sure! Here's some definition of {[DATA]}:"},
    ],
    "10 words with similarity": [
        {"role": "user", "content": "Give me the 10 words with similarity of {[DATA]}. 1-10."},
        {"role": "assistant", "content": "Sure, here are ten words that have a similar meaning to \"{[DATA]}\":"},
    ],
    "Summary": [
        {"role": "user", "content": "Look at this: [[[{[DATA]}]]] Now make a summary of this in 3 points"},
        {"role": "assistant", "content": "Here is my summary of the above content:"},
    ]
}