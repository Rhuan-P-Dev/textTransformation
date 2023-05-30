
const examplesDataBase = {
    "to English":`### Instruction: Translate the following text into English: [[[Um monarca masculino que governa um reino ou império.]]]
### Assistant: Sure! Here's a translation of that text in English: [[[A male monarch who rules over a kingdom or empire.]]]
{[STOP]}
### Instruction: Translate the following text into English: [[[Per gli sviluppatori
Questo PR è ancora molto WIP. Farò un refactoring per rimuovere artefatti da decisioni di progettazione errate/obsolete. Puoi già rivedere il codice se vuoi, ma molti dei difetti sono ancora soggetti a modifiche.

Sul master ci sono funzioni separate per richiamare i kernel CUDA. Oltre a richiamare i kernel CUDA effettivi, fanno altre cose come copiare i dati tra host e dispositivo.]]]
### Assistant: Sure! Here's a translation of that text in English: [[[For Developers
This PR is still very much WIP. I will do a refactor to remove artifacts from bad/obsolete design decisions. You can already review the code if you want but many of the flaws are still subject to change.

On master there are separate functions for invoking CUDA kernels. Apart from invoking the actual CUDA kernels they do other things such as copying data between host and device.]]]
{[STOP]}
### Instruction: Translate the following text into English: [[[あなたは農民として生まれ、農民として育ちました。 ノバイ王国の小さな村でのあなたの生活は厳しく、仕事も大変です。 あなたは困難や窮乏に慣れているわけではありませんが、それは退屈な人生です。 あなたは何かもっと壮大で幻想的な夢を見ます。 知らないうちに、あなたの人生は変わろうとしていました。
炎天下で仕事をしていると、頭を上げて何か新しいものが見えてきます。]]]
### Assistant: Sure! Here's a translation of that text in English: [[[You were born a peasant, and grew a peasant. Your life in a small village in the Kingdom of Novai is hard and your work is hard; you are no stranger to hardship and privation, but it's a boring life. You have dreams of something grander, something fantastical. Unbeknownst to you, your life was about to change.
As you work under the blistering sun, you lift your head and see something new.]]]
{[STOP]}
### Instruction: Translate the following text into English: [[[Los cambios son en realidad un poco menos extensos de lo que parecen, si observa la diferencia usando ignorar espacios en blanco.]]]
### Assistant: Sure! Here's a translation of that text in English: [[[The changes are actually a little bit less extensive than they look, if you look at the diff using ignore-whitespace.]]]
{[STOP]}
`,
    "to PT-BR":`### Instruction: Translate the following text into PT-BR: [[[A male monarch who rules over a kingdom or empire.]]]
### Assistant: Sure! Here's a translation of that text in PT-BR: [[[Um monarca masculino que governa um reino ou império.]]]
{[STOP]}
### Instruction: Translate the following text into PT-BR: [[[Per gli sviluppatori
Questo PR è ancora molto WIP. Farò un refactoring per rimuovere artefatti da decisioni di progettazione errate/obsolete. Puoi già rivedere il codice se vuoi, ma molti dei difetti sono ancora soggetti a modifiche.

Sul master ci sono funzioni separate per richiamare i kernel CUDA. Oltre a richiamare i kernel CUDA effettivi, fanno altre cose come copiare i dati tra host e dispositivo.]]]
### Assistant: Sure! Here's a translation of that text in PT-BR: [[[Para desenvolvedores
Este PR ainda é muito WIP. Farei uma refatoração para remover artefatos de decisões de design ruins/obsoletas. Você já pode revisar o código se quiser, mas muitas das falhas ainda estão sujeitas a alterações.

No mestre, existem funções separadas para invocar kernels CUDA. Além de invocar os kernels CUDA reais, eles fazem outras coisas, como copiar dados entre o host e o dispositivo.]]]
{[STOP]}
### Instruction: Translate the following text into PT-BR: [[[あなたは農民として生まれ、農民として育ちました。 ノバイ王国の小さな村でのあなたの生活は厳しく、仕事も大変です。 あなたは困難や窮乏に慣れているわけではありませんが、それは退屈な人生です。 あなたは何かもっと壮大で幻想的な夢を見ます。 知らないうちに、あなたの人生は変わろうとしていました。
炎天下で仕事をしていると、頭を上げて何か新しいものが見えてきます。]]]
### Assistant: Sure! Here's a translation of that text in PT-BR: [[[Você nasceu um camponês e cresceu como um camponês. Sua vida em uma pequena aldeia na Reino de Novai é dura e seu trabalho também é duro; você não é estranho à dificuldade e à pobreza, mas é uma vida entediante. Você tem sonhos de algo maior, algo fantástico. Inesperadamente, sua vida estava prestes a mudar.
Enquanto trabalha sob o sol ardente, você levanta a sua cabeça e vê alguma coisa nova.]]]
{[STOP]}
### Instruction: Translate the following text into PT-BR: [[[Los cambios son en realidad un poco menos extensos de lo que parecen, si observa la diferencia usando ignorar espacios en blanco.]]]
### Assistant: Sure! Here's a translation of that text in PT-BR: [[[As alterações são, na verdade, um pouco menos extensas do que parecem, se você observar a diferença usando ignore-whitespace.]]
{[STOP]}
`,

    "Emotion Analyzer":`### Instruction: I will write a text and I want you to tell me what emotion it conveys: [[[A male monarch who rules over a kingdom or empire.]]]
### Assistant: The emotions conveyed in this text are power, authority, control, dominance, and commanding presence.
{[STOP]}
### Instruction: I will write a text and I want you to tell me what emotion it conveys: [[[You were born a peasant, and grew a peasant.]]]
### Assistant: The emotions conveyed in this text are humility, modesty, simplicity, and contentment.
{[STOP]}
### Instruction: I will write a text and I want you to tell me what emotion it conveys: [[[On master there are separate functions for invoking CUDA kernels. Apart from invoking the actual CUDA kernels they do other things such as copying data between host and device.]]]
### Assistant: The emotions conveyed in this text are precision, detail-oriented, technical, and analytical. 
{[STOP]}
### Instruction: I will write a text and I want you to tell me what emotion it conveys: [[[The world is full of people with different opinions on everything.]]]
### Assistant: The emotions conveyed in this text are open-mindedness, acceptance, tolerance, and understanding. 
{[STOP]}
### Instruction: I will write a text and I want you to tell me what emotion it conveys: [[[I am not afraid to speak my mind.]]]
### Assistant: The emotions conveyed in this text are confidence, assertiveness, self-assuredness, and courage. 
{[STOP]}
### Instruction: I will write a text and I want you to tell me what emotion it conveys: [[[For Developers
This PR is still very much WIP. I will do a refactor to remove artifacts from bad/obsolete design decisions. You can already review the code if you want but many of the flaws are still subject to change.]]]
### Assistant: The emotions conveyed in this text are caution, skepticism, uncertainty, and hesitancy.
{[STOP]}
`,

    "Some Definition":`### Instruction: Give me some definition of King.
### Assistant: A king is a male ruler, usually the head of state or government in an absolute monarchy. Kings are often referred to as monarchs and may hold various titles such as Emperor, Shah, Sultan, or Caliph depending on their specific cultural context.
{[STOP]}
### Instruction: Give me some definition of Car.
### Assistant: A car is a vehicle that is used for transportation over land. It typically has four wheels and can seat multiple passengers, including the driver. There are many different types of cars available, from small compact models to large luxury vehicles.
{[STOP]}
### Instruction: Give me some definition of RPG.
### Assistant: An RPG (Role-Playing Game) is a type of video game where players assume the role of characters within a fictional world. The player's actions determine how the story unfolds, with choices affecting the outcome of quests and battles. These games often have complex character development systems and deep stories, making them popular among gamers who enjoy immersion in a virtual world.
{[STOP]}
### Instruction: Give me some definition of Ship.
### Assistant: A ship is a vessel designed for travel by water. They come in all shapes and sizes, from small fishing boats to massive cruise ships. Some common types of ships include cargo vessels, tankers, container ships, ferries, and naval warships.
{[STOP]}
### Instruction: Give me some definition of Language.
### Assistant: A language is a system of communication between individuals or groups using sounds, gestures, or written symbols. There are thousands of languages spoken around the world, each with its own unique grammar, syntax, and vocabulary. Languages can be classified into families based on shared features and historical connections, such as Indo-European or Sino-Tibetan.
{[STOP]}
### Instruction: Give me some definition of USA.
### Assistant: The United States of America (USA) is a country located in North America. It consists of 50 states and a federal district, Washington D.C., which serves as the nation's capital city. The U.S. borders Canada to the north and Mexico to the south, and shares maritime borders with Russia across the Bering Strait to the west and Cuba to the southeast.
{[STOP]}
### Instruction: Give me some definition of Box.
### Assistant: A box is a rectangular container made of cardboard or other materials, typically used for storage or shipping purposes. Boxes can vary greatly in size and shape, depending on what they need to contain. Common types of boxes include corrugated cardboard boxes, wardrobe boxes, moving boxes, and gift boxes.
{[STOP]}
`,
    "10 words with similarity":`### Instruction: Give me the 10 words with similarity of King. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "King":
1. Monarch
2. Emperor
3. Ruler
4. Sovereign
5. Dictator
6. Despot
7. Tyrant
8. Autocrat
9. Overlord
10. Potentate
{[STOP]}
### Instruction: Give me the 10 words with similarity of Car. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "Car":
1. Automobile
2. Vehicle
3. Motorcar
4. Roadster
5. Sedan
6. Coupe
7. Station wagon
8. Minivan
9. SUV (Sport Utility Vehicle)
10. Pickup truck
{[STOP]}
### Instruction: Give me the 10 words with similarity of RPG. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "RPG":
1. Role Playing Game
2. Tabletop game
3. Dungeons and Dragons
4. Pathfinder
5. Warhammer Fantasy Battle
6. Magic: The Gathering
7. Pokemon Trading Card Game
8. Yu-Gi-Oh! Trading Card Game
9. World of Warcraft
10. Final Fantasy
{[STOP]}
### Instruction: Give me the 10 words with similarity of Ship. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "Ship":
1. Vessel
2. Boat
3. Yacht
4. Cruise ship
5. Submarine
6. Aircraft carrier
7. Battleship
8. Destroyer
9. Frigate
10. Corvette
{[STOP]}
### Instruction: Give me the 10 words with similarity of Language. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "Language":
1. Speech
2. Communication
3. Conversation
4. Dialect
5. Jargon
6. Patois
7. Vernacular
8. Idiom
9. Colloquialism
10. Slang
{[STOP]}
### Instruction: Give me the 10 words with similarity of USA. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "USA":
1. United States of America
2. US
3. U.S.A.
4. American
5. Yankee
6. Uncle Sam
7. Stars and Stripes
8. Liberty Bell
9. Statue of Liberty
10. White House
{[STOP]}
### Instruction: Give me the 10 words with similarity of Box. 1-10.
### Assistant: Sure, here are ten words that have a similar meaning to "Box":
1. Container
2. Packaging
3. Cargo
4. Crate
5. Pallet
6. Carton
7. Case
8. Package
9. Envelope
10. Parcel
{[STOP]}
`,

    "Summary":`### Instruction: Make a summary of this in 3 points: [[[Sure, here's an example of using CSS variables in a simple HTML document with some basic styling:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>CSS Variables Tutorial</title>
    <style>
      :root {
        --primary-color: #ff0000; /* Set the primary color variable */
        --secondary-color: #3399cc; /* Set the secondary color variable */
        --font-size: 16px; /* Set the font size variable */
      }
      
      body {
        background-color: var(--primary-color); /* Use the primary color variable for the body background */
        color: var(--secondary-color); /* Use the secondary color variable for the text color */
        font-size: var(--font-size)em; /* Use the font size variable to set the font size */
      }
    </style>
  </head>
  <body>
    <h1 style="background-color: var(--primary-color); color: var(--secondary-color); font-size: var(--font-size)em;">Hello World!</h1>
  </body>
</html>
\`\`\`
In this example, we define two custom properties (\`--primary-color\` and \`--secondary-color\`) as well as one predefined property (\`--font-size\`). We then apply these values to various elements within our HTML document by referencing them through the \`var()\` function. For instance, when setting the background color of the \`<h1>\` element, we reference the value of the \`--primary-color\` variable using the \`var()\` function. This allows us to easily change the values of these variables without having to manually update all instances where they are used throughout our codebase.]]]
### Assistant: Here is my summary of the above content:

* In this tutorial, you will learn how to use CSS variables in your web development projects.
* You can create custom properties or use predefined ones like \`--primary-color\`, \`--secondary-color\`, etc.
* By using the \`var()\` function, you can reference these values and apply them to different parts of your HTML document.
{[STOP]}
### Instruction: Make a summary of this in 3 points: [[[Sure, here's an example of how you can import and export JavaScript modules in a step-by-step manner with code examples:

Step 1: Importing a Module
To import a module into your current project, use the following syntax:
\`\`\`javascript
import { someModule } from './path/to/module';
\`\`\`
Here, \`someModule\` is the name of the module that you want to import, and \`./path/to/module\` is the path where it exists on your file system. This imports the entire contents of the module as a single object.

Step 2: Exporting a Module
To export a module so that other parts of your application can access its functionality, use the following syntax:
\`\`\`javascript
function myModule(){
    // Your module logic goes here...
};

export default myModule;
\`\`\`
This exports the function \`myModule()\` as a named export called "default". Other parts of your application can then call this exported function using the same syntax used for importing modules (i.e., \`import { myModule } from './path/to/module'\`).

Step 3: Using an Imported Module
Once you have imported a module into your project, you can use its functions or variables just like any other part of your code. For example, if you imported a module called \`myModule\`, you could use it like this:
\`\`\`javascript
const myFunction = myModule.myFunction();
console.log(myFunction); // Outputs 'Hello World!'
\`\`\`
In this case, we are calling the \`myFunction\` method on the \`myModule\` object, which returns a string value. We then log that value to the console using the \`console.log()\` function.

That's it! By following these steps, you should be able to successfully import and export JavaScript modules in your projects.]]]
### Assistant: Here is my summary of the above content:

* To import a module into your current project, use the following syntax: \`import { someModule } from './path/to/module';\`.
* To export a module so that other parts of your application can access its functionality, use the following syntax: \`export default myModule()\`.
* Once you have imported a module into your project, you can use its functions or variables just like any other part of your code.
{[STOP]}
`,

}