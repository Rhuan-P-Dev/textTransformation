import { CloneController } from "./utils/clone.js"

export class PromptsDataBaseController {

    get(name){

        let prompt = promptsDataBase[name]

        if(prompt.extend){

            let basePrompt = new CloneController().recursiveCloneAttribute(promptsDataBase[prompt.extend])

            let content = prompt.content

            basePrompt[0]["content"] = replacer(
                basePrompt[0]["content"],
                "{[extension]}",
                content
            )

            return basePrompt

        }else{
            return new CloneController().recursiveCloneAttribute(prompt)
        }

    }

}

export const promptsDataBase = {

    "ask": [
        {"role": "user", "content": `<input>{[DATA]}</input>`},
    ],

    "to English": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Translate the input to English. Please respond **ONLY** with the translated input.`},
    ],
    "to PT-BR": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Translate the input to PT-BR. Please respond **ONLY** with the translated input.`},
    ],
    "Fix gramatical errors": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Fix all gramatical errors of the input. First give a detailed explanation about every fix and after give the fixed input.`},
    ],
    "Emotion analyzer": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Tell me what emotion the input conveys. Please respond to me in this **format**: emotion1, emotion2, emotion3, and so on... Please respond **ONLY** with the emotions.`},
    ],

    "Topic extration": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Tell me the topics of input. Please respond to me in this **format**: topic1, topic2, topic3, and so on... Please respond **ONLY** with the topics.`},
    ],

    "Some definition": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Provide me with a definition of the input.`},
    ],

    "Some scientific definition": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Provide me with a scientific definition of the input.`},
    ],

    "Some religious definition": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Provide me with a religious definition of the input.`},
    ],

    "Some technology definition": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Provide me with a technology definition of the input.`},
    ],

    "Some overview definition": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Provide me with a overview definition of the input content.`},
    ],

    "10 things with similarity": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Give me the 10 things with similarity of the input.`},
    ],
    "Summary": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Make a summary.`},
    ],
    "Summary v1": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, summarize the input, highlighting the most relevant topics. For example: **Key topic** brief introduction.`},
    ],
    "Summary v2": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, summarize the input, highlighting the most relevant topics. For example: **Key topic** brief introduction. After the summary explain deeply each topic.`},
    ],
//https://www.reddit.com/r/LocalLLaMA/comments/1ftjbz3/shockingly_good_superintelligent_summarization/
//https://www.reddit.com/user/custodiam99/
    "Summary v3": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, 1.) Analyze the input text and generate 5 essential questions that, when answered, capture the main points and core meaning of the text. 2.) When formulating your questions: a. Address the central theme or argument b. Identify key supporting ideas c. Highlight important facts or evidence d. Reveal the author's purpose or perspective e. Explore any significant implications or conclusions. 3.) Answer all of your generated questions one-by-one in detail.`},
    ],
    "Simplify this text": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Simplify this input. Please respond **ONLY** with the simplified input.`},
    ],

    "Complex this text": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Transform this input into a more complex one. Don't invent nonsensical things, just make small obvious assumptions, stay consistent with the input. Please respond **ONLY** with the transformed input. Don't forget to **FOLLOW** the style of the original input.`},
    ],

    "Complex this text - HARD": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Transform this input into a more complex, expert, profound, detailed, and nuanced one. Don't invent nonsensical things, just make small obvious assumptions, stay consistent with the input. Please respond **ONLY** with the transformed input. Don't forget to **FOLLOW** the style of the original input.`},
    ],

    "Explain it with gradually": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Explain the input with gradually increasing complexity, up to five.`}
    ],

    "Invert the meaning": [
        {"role": "user", "content": `<input>{[DATA]}</input>

invert the meaning of this input. **ONLY** respond with inverted input.`}
    ],

    "to positive": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Now, Translate the input to a positive & afirmative. Please respond **ONLY** with the translated input.`},
    ],

    "analyze about this project": [
        {"role": "user", "content": `<input>{[DATA]}</input>

What you see in the <input>? I want a deep and neutral, unbiased, truthful analyze about this project.`},
    ],

    "re-write edit": [
        {"role": "user", "content": `<input>{[DATA]}</input>

# Edit Instruction Rewriter
You are a professional edit instruction rewriter. Your task is to generate a precise, concise, and visually achievable professional-level edit instruction based on the user-provided instruction and the image to be edited.

Please strictly follow the rewriting rules below:

## 1. General Principles
- Keep the rewritten prompt **concise**. Avoid overly long sentences and reduce unnecessary descriptive language.
- If the instruction is contradictory, vague, or unachievable, prioritize reasonable inference and correction, and supplement details when necessary.
- Keep the core intention of the original instruction unchanged, only enhancing its clarity, rationality, and visual feasibility.
- All added objects or modifications must align with the logic and style of the edited input image’s overall scene.

## 2. Task Type Handling Rules
### 1. Add, Delete, Replace Tasks
- If the instruction is clear (already includes task type, target entity, position, quantity, attributes), preserve the original intent and only refine the grammar.
- If the description is vague, supplement with minimal but sufficient details (category, color, size, orientation, position, etc.). For example:
    > Original: "Add an animal"
    > Rewritten: "Add a light-gray cat in the bottom-right corner, sitting and facing the camera"
- Remove meaningless instructions: e.g., "Add 0 objects" should be ignored or flagged as invalid.
- For replacement tasks, specify "Replace Y with X" and briefly describe the key visual features of X.

### 2. Text Editing Tasks
- All text content must be enclosed in English double quotes \`" "\`. Do not translate or alter the original language of the text, and do not change the capitalization.
- **For text replacement tasks, always use the fixed template:**
    - \`Replace "xx" to "yy"\`.
    - \`Replace the xx bounding box to "yy"\`.
- If the user does not specify text content, infer and add concise text based on the instruction and the input image’s context. For example:
    > Original: "Add a line of text" (poster)
    > Rewritten: "Add text \"LIMITED EDITION\" at the top center with slight shadow"
- Specify text position, color, and layout in a concise way.

### 3. Human Editing Tasks
- Maintain the person’s core visual consistency (ethnicity, gender, age, hairstyle, expression, outfit, etc.).
- If modifying appearance (e.g., clothes, hairstyle), ensure the new element is consistent with the original style.
- **For expression changes, they must be natural and subtle, never exaggerated.**
- If deletion is not specifically emphasized, the most important subject in the original image (e.g., a person, an animal) should be preserved.
    - For background change tasks, emphasize maintaining subject consistency at first.
- Example:
    > Original: "Change the person’s hat"
    > Rewritten: "Replace the man’s hat with a dark brown beret; keep smile, short hair, and gray jacket unchanged"

### 4. Style Transformation or Enhancement Tasks
- If a style is specified, describe it concisely with key visual traits. For example:
    > Original: "Disco style"
    > Rewritten: "1970s disco: flashing lights, disco ball, mirrored walls, colorful tones"
- If the instruction says "use reference style" or "keep current style," analyze the input image, extract main features (color, composition, texture, lighting, art style), and integrate them into the prompt.
- **For coloring tasks, including restoring old photos, always use the fixed template:** "Restore old photograph, remove scratches, reduce noise, enhance details, high resolution, realistic, natural skin tones, clear facial features, no distortion, vintage photo restoration"
- If there are other changes, place the style description at the end.

## 3. Rationality and Logic Checks
- Resolve contradictory instructions: e.g., "Remove all trees but keep all trees" should be logically corrected.
- Add missing key information: if position is unspecified, choose a reasonable area based on composition (near subject, empty space, center/edges).

# Output Format Example
\`\`\`json
{
   "Rewritten": "..."
}\`\`\` `}],

    "LTX-Video": [
        {"role": "user", "content": `<input>{[DATA]}</input>

You will construct your output based on my input. Based on my input, I want you to imagine a world lived in its entirety, with extreme details, colors, formats, etc. Your output should describe EVERYTHING that is VISIBLE, and nothing else.

When writing prompts, focus on detailed, chronological descriptions of actions and scenes. Include specific movements, appearances, camera angles, and environmental details - all in a single flowing paragraph. Start directly with the action, and keep descriptions literal and precise. Think like a cinematographer describing a shot list. Keep within 200 words. For best results, build your prompts using this structure:

Start with main action in a single sentence
Add specific details about movements and gestures
Describe character/object appearances precisely
Include background and environment details
Specify camera angles and movements
Describe lighting and colors
Note any changes or sudden events`}
    ],

    "extract: streets & neighborhoods": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Extract ALL streets, neighborhoods, etc. from the input.
Just output the list with the names. example: name1, name2, name3, name4...`}
    ],

    "são vicente sp - only": [
    {"role": "user", "content": `<input>{[DATA]}</input>

I want you to clean **ALL** input, but you must follow these **guidelines** for a high-quality cleaning.

# **guidelines**:
1. Remove everything that is not from the municipality of São Vicente - SP.
2. **Only** clean using the input as the truth.
3. If after the cleaning your output is empty just say 'Nothing is in São Vicente - SP.'`}
    ],

    "extract all names": [
    {"role": "user", "content": `<input>{[DATA]}</input>

Ignore: common name (also called common noun).
Extract ALL proper names
be short and efficient!`}
    ],

    "add one type: municipality, neighborhood, street, or unknown": [
    {"role": "user", "content": `<input>{[DATA]}</input>

Your task is to assign one of these four categories to each name: municipality, neighborhood, street, or unknown.

Output format:
X is a municipality
Y is a street
Z is unknown

Rules:

Only use these exact words: municipality, neighborhood, street, unknown.
Do NOT use any other words or categories.
If a name doesn't fit perfectly into one category, choose the one it's MOST like.
Never make up new labels.
Example:
CityHall is a municipality
ParkAve is a street
Riverside is a neighborhood
NoIdea123 is unknown`}
    ],

    "make correlations for each regional districts": [
    {"role": "user", "content": `<input>{[DATA]}</input>

Your goal is to identify and list regional districts (municipalities, neighborhoods, and streets) from the input.
For each name in the <input>
- If the name refers to a municipality, neighborhood, or street, include it.
- Only list real, known geographic relationships (e.g., streets within a neighborhood, neighborhoods within a municipality).
- Do not invent or assume relationships that are not verifiable.

Example output:
- Downtown is a neighborhood in Metro City.
- Oak Street is a street in Downtown.
- Riverside is a municipality.
- Westside is a neighborhood in Riverside.

❗ Safety Rule: Do not create any geographic relationships unless they are well-documented. If uncertain, omit the connection.`}
    ],

    "deduplicate": [
    {"role": "user", "content": `<input>{[DATA]}</input>

I want you to deduplicate ALL, but you must follow these **guidelines** for a high-quality merge.

# **guidelines**:
1. Forbidden: duplicated content, similar meaning contents.
2. Only respond with the final output.
3. Don't invent nonsensical things, Don't make **ANY** assumptions, stay consistent with the inputs.
4. Don't forget to **FOLLOW** the style of the input.`}],

    "extract events - são vicente": [
        {"role": "user", "content": `<input>{[DATA]}</input>

I want you to extract **ALL** events on são vicente from são paulo in <input>, you must follow these **guidelines**.

# **guidelines**:
1. Focus only on events, their consequences, and their context.
1.1. Be clear about reporting the events, their consequences, and their context; Use words that state facts.
2. You need to output in XML.
2.1. Exemple: <name of where the event occurred type="..." this administrative division type="..." municipality name="...">
<event 1>
    <description>...</description>
    <consequence>...</consequence>
    <context>...</context>
</event 1>
<event 2>
    <description>...</description>
    <consequence>...</consequence>
    <context>...</context>
</event 2>
</name of where the event occurred>
...
<name of where the event occurred type="..." this administrative division type="..." municipality name="...">
<event 1>
    <description>...</description>
    <consequence>...</consequence>
    <context>...</context>
</event 1>
<event 2>
    <description>...</description>
    <consequence>...</consequence>
    <context>...</context>
</event 2>
</name of where the event occurred>
...
<name of where the event occurred type="..." this administrative division type="..." municipality name="...">
<event 1>
    <description>...</description>
    <consequence>...</consequence>
    <context>...</context>
</event 1>
<event 2>
    <description>...</description>
    <consequence>...</consequence>
    <context>...</context>
</event 2>
</name of where the event occurred>
...
2.2. DON'T write names like 'firstName' or 'fist_name'.
2.3. Write names like 'first name'.
2.4. Types: street, neighborhood, municipality, house, beach, etc.
2.5. Administrative division: street, neighborhood, municipality.
3. Your response must be in English only.`}],

    "relate - administrative divisions - são vicente - low quality": [
    {"role": "user", "content": `<input>{[DATA]}</input>

I want you to relate **ALL** input related with municipalitie são vicente from são paulo, but you must follow these **guidelines** for a high-quality relate.

# **guidelines**:
1. You have 3 administrative divisions: municipalitie, neighborhood, and street.
2. correlate the input's facts with each respective administrative division.
3. correlate each street with its respective neighborhoods.
4. correlate each neighborhood with its respective municipalities.
5. **only** make a correlation if such a correlation is already present in the input.
6. the output must start with the municipality [X], then list all the neighborhoods of municipality [X], and finally list all the streets of neighborhood [Y].
7. Pay special attetion to 5 rule.
8. Focus **ONLY** anything from são vicnete - são paulo; anything else ignore.

Here a format example to guide you:
### **[Municipality Exampleville]**
**Facts about the municipality**:
- Exampleville is known for its historic downtown district and vibrant cultural scene.
- The municipality has a population of 150,000 residents.
- It is home to the Exampleville University, a major educational institution.

- **[Neighborhood Downtown]**
  **Facts about the neighborhood**:
  - Downtown is the commercial and cultural hub of Exampleville.
  - It hosts the annual Exampleville Festival every July.
  - - **[Street Main Street]**
      - **Facts about the street**:
        - Main Street is lined with historic buildings and boutique shops.
        - The Exampleville Art Museum is located at 456 Main Street.
    - **[Street Elm Street]**
      - **Facts about the street**:
        - Elm Street is famous for its family-friendly parks and community garden.
        - It connects to the Exampleville Central Library.

- **[Neighborhood Riverside]**
  **Facts about the neighborhood**:
  - Riverside is known for its scenic riverfront and outdoor activities.
  - It has a growing tech sector with several startups.
  - - **[Street Riverfront Avenue]**
      - **Facts about the street**:
        - Riverfront Avenue offers panoramic views of the Exampleville River.
        - The Riverside Art Gallery is located at 789 Riverfront Avenue.
    - **[Street Pine Street]**
      - **Facts about the street**:
        - Pine Street is a residential area with a strong emphasis on sustainability.
        - It features a community garden and a local farmers’ market.

---

### **[Municipality Greenfield]**
**Facts about the municipality**:
- Greenfield is a suburban municipality with a focus on technology and innovation.
- It has a population of 200,000 and is part of the Greenfield Tech Corridor.
- - **[Neighborhood Eastside]**
    - **Facts about the neighborhood**:
      - Eastside is a hub for startups and tech companies.
      - It hosts the Greenfield Innovation Expo annually.
      - - **[Street Maple Lane]**
          - **Facts about the street**:
            - Maple Lane is home to the Greenfield Tech Park.
            - The Greenfield Innovation Center is located at 101 Maple Lane.
      - **[Street Oak Drive]**
          - **Facts about the street**:
            - Oak Drive is a residential area with high-end housing.
            - It connects to the Greenfield Business District.
    - **[Neighborhood Westview]**
      - **Facts about the neighborhood**:
        - Westview is a family-friendly neighborhood with strong community ties.
        - It has the Westview Community Center and a public library.
        - - **[Street Hilltop Road]**
            - **Facts about the street**:
              - Hilltop Road offers panoramic views of the city and mountains.
              - It is popular for jogging and hiking.
        - **[Street Cedar Street]**
            - **Facts about the street**:
              - Cedar Street hosts monthly cultural events and festivals.
              - The Westview Community Center is located at 202 Cedar Street.`}],

    "relate - administrative divisions - são vicente - v2": [
        {"role": "user", "content": `<input>{[DATA]}</input>

### Objective
Extract **all** information from the provided \`<input>\` that concerns the municipality **São Vicente** (state of São Paulo) and organise it into a three‑level hierarchy — municipality → neighbourhood → street — while explicitly documenting **facts, events, context, and consequences** for each level.

---

### Guidelines

1. **Administrative divisions**
   - **municipality** (top level)
   - **neighbourhood** (second level)
   - **street** (third level)

2. **Correlation**
   - Correlate any **events** (or any other information) that the \`<input>\` links to a municipality, neighbourhood, or street.
   - **Ignore** any description that merely defines an administrative division; keep only the events‑related data.
2.1.
   - When reporting facts, do not include the district where such a fact occurred.
   - When reporting context, do not include the district where such a context occurred.
   - When reporting consequences, do not include the district where such consequences occurred.

3. **Contextual hierarchy**
   - When presenting an event for a neighbourhood or street, precede it with the context of its **parent** division (municipality → neighbourhood).

4. **Street‑Neighbourhood mapping**
   - List each street under the neighbourhood it belongs to **only if the \`<input>\` explicitly makes that connection**.

5. **Neighbourhood‑Municipality mapping**
   - List each neighbourhood under São Vicente **only if the \`<input>\` explicitly makes that connection**.

6. **Correlation only when present**
   - Do **not** invent connections; include a relation only when it already exists in the \`<input>\`.

7. **Output order & structure**
   - Begin with the **municipality** element.
   - Inside it, list all its **neighbourhoods**.
   - Inside each neighbourhood, list its **streets**.

8. **No relevant data**
   - If the \`<input>\` contains **no** information about São Vicente, output exactly:

     \`\`\`
     NONE
     \`\`\`

9. **Geographic focus**
   - Include **only** data that concerns **São Vicente – São Paulo**. Discard anything about other municipalities, states, or countries.

10. **Partial data**
    - It is acceptable for a municipality to have no neighbourhoods, or for a neighbourhood to have no streets. Simply omit the missing level(s).

11. **Language**
    - The entire response must be in **English**.

---

### XML Output Format (with the required sub‑elements)

\`\`\`xml
<?xml version="1.0" encoding="UTF-8"?>
<municipalities>
  <municipality name="São Vicente">
    <!-- Municipality level -->
    <facts>…</facts>
    <events>…</events>
    <context>…</context>
    <consequences>…</consequences>

    <neighborhoods>
      <neighborhood name="Neighbourhood A">
        <!-- Neighborhood level -->
        <facts>…</facts>
        <events>…</events>
        <context>…</context>
        <consequences>…</consequences>

        <streets>
          <street name="Street 1">
            <!-- Street level -->
            <facts>…</facts>
            <events>…</events>
            <context>…</context>
            <consequences>…</consequences>
          </street>

          <!-- Repeat <street> elements as needed -->
        </streets>
      </neighborhood>

      <!-- Repeat <neighborhood> elements as needed -->
    </neighborhoods>
  </municipality>

  <!-- If there were other municipalities in the input that also belong to São Vicente,
       repeat the <municipality> block for each. Otherwise, keep only the block above. -->
</municipalities>
\`\`\`

*Replace each “…” with the corresponding **facts**, **events**, **context**, and **consequences** extracted from the \`<input>\`.*

---

**Remember:**
- Only add a \`<neighborhood>\` or \`<street>\` if the \`<input>\` explicitly links it to São Vicente.
- Every listed entity must contain **four** sub‑elements: \`<facts>\`, \`<events>\`, \`<context>\`, and \`<consequences>\`.

Follow these instructions precisely to generate a high‑quality, fully‑structured correlation of all São Vicente‑related information.`}],

        "relate - administrative divisions - são vicente - simple": [
        {"role": "user", "content": `<input>{[DATA]}</input>

I want you to relate **ALL** <input> related with municipalitie são vicente from são paulo, but you must follow these **guidelines** for a high-quality relate.

# **guidelines**:
1. You have 3 administrative divisions: municipalitie, neighborhood, and street.
2. correlate each street with its respective neighborhoods.
2.1. You must only include a street in a neighborhood if the <original input> explicitly states that the street is located in that neighborhood. Do not infer or assume based on proximity, context, or other indirect clues. Always verify that the text directly links a street to a neighborhood. If no such explicit link exists, do not include the street in that neighborhood.
3. correlate each neighborhood with its respective municipalities.
4. **only** make a correlation if such a correlation is already present in the <input>.
5. the output must start with the municipality [X], then list all the neighborhoods of municipality [X], and finally list all the streets of neighborhood [Y].
6. If the <input> don't have anything related with output "NONE". Pay special attetion to 3 rule.
7. Focus **ONLY** anything from são vicente - são paulo; anything else ignore.
8. Is okay if some municipality don't have a neighborhood; if some neighborhood don't have a street; ignore it.
9. Your response must be in English only.

Here a format example to guide you:
<?xml version="1.0" encoding="UTF-8"?>
<municipalities>
    <municipality name="Exampleville">
        <neighborhoods>
            <neighborhood name="Downtown">
                <streets>
                    <street name="Main Street"></street>
                    <street name="Elm Street"></street>
                </streets>
        </neighborhood>
        <neighborhood name="Riverside">
            <streets>
                <street name="Riverfront Avenue"></street>
                <street name="Pine Street"></street>
            </streets>
        </neighborhood>
        </neighborhoods>
    </municipality>
    <municipality name="Greenfield">
        <neighborhoods>
            <neighborhood name="Eastside">
                <streets>
                    <street name="Maple Lane"></street>
                    <street name="Oak Drive"></street>
                </streets>
            </neighborhood>
            <neighborhood name="Westview">
                <streets>
                    <street name="Hilltop Road"></street>
                    <street name="Cedar Street"></street>
                </streets>
            </neighborhood>
        </neighborhoods>
    </municipality>
</municipalities>`}],

    "relate - administrative divisions - são vicente": [
        {"role": "user", "content": `<input>{[DATA]}</input>

I want you to relate **ALL** <input> related with municipalitie são vicente from são paulo, but you must follow these **guidelines** for a high-quality relate.

# **guidelines**:
1. You have 3 administrative divisions: municipalitie, neighborhood, and street.
2. correlate the <input>'s events with each respective administrative division;
2.1. Ignore any discrition of any administrative division, focus only on the events.
3. When correlating these events give the context from the upper administrative division.
4. correlate each street with its respective neighborhoods.
5. correlate each neighborhood with its respective municipalities.
6. **only** make a correlation if such a correlation is already present in the <input>.
7. the output must start with the municipality [X], then list all the neighborhoods of municipality [X], and finally list all the streets of neighborhood [Y].
8. If the <input> don't have anything related with output "NONE". Pay special attetion to 5 rule.
9. Focus **ONLY** anything from são vicente - são paulo; anything else ignore.
10. Is okay if some municipality don't have a neighborhood; if some neighborhood don't have a street; ignore it.
11. Your response must be in English only.

Here a format example to guide you:
<?xml version="1.0" encoding="UTF-8"?> <municipalities> <municipality name="Exampleville"> <facts>Exampleville is known for its historic downtown district and vibrant cultural scene. The municipality has a population of 150,000 residents. It is home to the Exampleville University, a major educational institution.</facts> <neighborhoods> <neighborhood name="Downtown"> <facts>Downtown is the commercial and cultural hub of Exampleville. It hosts the annual Exampleville Festival every July.</facts> <streets> <street name="Main Street"> <facts>Main Street is lined with historic buildings and boutique shops. The Exampleville Art Museum is located at 456 Main Street.</facts> </street> <street name="Elm Street"> <facts>Elm Street is famous for its family-friendly parks and community garden. It connects to the Exampleville Central Library.</facts> </street> </streets> </neighborhood> <neighborhood name="Riverside"> <facts>Riverside is known for its scenic riverfront and outdoor activities. It has a growing tech sector with several startups.</facts> <streets> <street name="Riverfront Avenue"> <facts>Riverfront Avenue offers panoramic views of the Exampleville River. The Riverside Art Gallery is located at 789 Riverfront Avenue.</facts> </street> <street name="Pine Street"> <facts>Pine Street is a residential area with a strong emphasis on sustainability. It features a community garden and a local farmers’ market.</facts> </street> </streets> </neighborhood> </neighborhoods> </municipality> <municipality name="Greenfield"> <facts>Greenfield is a suburban municipality with a focus on technology and innovation. It has a population of 200,000 and is part of the Greenfield Tech Corridor.</facts> <neighborhoods> <neighborhood name="Eastside"> <facts>Eastside is a hub for startups and tech companies. It hosts the Greenfield Innovation Expo annually.</facts> <streets> <street name="Maple Lane"> <facts>Maple Lane is home to the Greenfield Tech Park. The Greenfield Innovation Center is located at 101 Maple Lane.</facts> </street> <street name="Oak Drive"> <facts>Oak Drive is a residential area with high-end housing. It connects to the Greenfield Business District.</facts> </street> </streets> </neighborhood> <neighborhood name="Westview"> <facts>Westview is a family-friendly neighborhood with strong community ties. It has the Westview Community Center and a public library.</facts> <streets> <street name="Hilltop Road"> <facts>Hilltop Road offers panoramic views of the city and mountains. It is popular for jogging and hiking.</facts> </street> <street name="Cedar Street"> <facts>Cedar Street hosts monthly cultural events and festivals. The Westview Community Center is located at 202 Cedar Street.</facts> </street> </streets> </neighborhood> </neighborhoods> </municipality> </municipalities>`}],

    "relate - administrative divisions": [
    {"role": "user", "content": `<input>{[DATA]}</input>

I want you to relate **ALL** input, but you must follow these **guidelines** for a high-quality relate.

# **guidelines**:
1. You have 3 administrative divisions: municipalitie, neighborhood, and street.
2. correlate the input's facts with each respective administrative division.
3. correlate each street with its respective neighborhoods.
4. correlate each neighborhood with its respective municipalities.
5. **only** make a correlation if such a correlation is already present in the input.
6. the output must start with the municipality [X], then list all the neighborhoods of municipality [X], and finally list all the streets of neighborhood [Y].
7. Pay special attetion to 5 rule.

Here a format example to guide you:
### **[Municipality Exampleville]**
**Facts about the municipality**:
- Exampleville is known for its historic downtown district and vibrant cultural scene.
- The municipality has a population of 150,000 residents.
- It is home to the Exampleville University, a major educational institution.

- **[Neighborhood Downtown]**
  **Facts about the neighborhood**:
  - Downtown is the commercial and cultural hub of Exampleville.
  - It hosts the annual Exampleville Festival every July.
  - - **[Street Main Street]**
      - **Facts about the street**:
        - Main Street is lined with historic buildings and boutique shops.
        - The Exampleville Art Museum is located at 456 Main Street.
    - **[Street Elm Street]**
      - **Facts about the street**:
        - Elm Street is famous for its family-friendly parks and community garden.
        - It connects to the Exampleville Central Library.

- **[Neighborhood Riverside]**
  **Facts about the neighborhood**:
  - Riverside is known for its scenic riverfront and outdoor activities.
  - It has a growing tech sector with several startups.
  - - **[Street Riverfront Avenue]**
      - **Facts about the street**:
        - Riverfront Avenue offers panoramic views of the Exampleville River.
        - The Riverside Art Gallery is located at 789 Riverfront Avenue.
    - **[Street Pine Street]**
      - **Facts about the street**:
        - Pine Street is a residential area with a strong emphasis on sustainability.
        - It features a community garden and a local farmers’ market.

---

### **[Municipality Greenfield]**
**Facts about the municipality**:
- Greenfield is a suburban municipality with a focus on technology and innovation.
- It has a population of 200,000 and is part of the Greenfield Tech Corridor.
- - **[Neighborhood Eastside]**
    - **Facts about the neighborhood**:
      - Eastside is a hub for startups and tech companies.
      - It hosts the Greenfield Innovation Expo annually.
      - - **[Street Maple Lane]**
          - **Facts about the street**:
            - Maple Lane is home to the Greenfield Tech Park.
            - The Greenfield Innovation Center is located at 101 Maple Lane.
      - **[Street Oak Drive]**
          - **Facts about the street**:
            - Oak Drive is a residential area with high-end housing.
            - It connects to the Greenfield Business District.
    - **[Neighborhood Westview]**
      - **Facts about the neighborhood**:
        - Westview is a family-friendly neighborhood with strong community ties.
        - It has the Westview Community Center and a public library.
        - - **[Street Hilltop Road]**
            - **Facts about the street**:
              - Hilltop Road offers panoramic views of the city and mountains.
              - It is popular for jogging and hiking.
        - **[Street Cedar Street]**
            - **Facts about the street**:
              - Cedar Street hosts monthly cultural events and festivals.
              - The Westview Community Center is located at 202 Cedar Street.`}],

    "merge v1": [
    {"role": "user", "content": `<input>{[DATA]}</input>

I want you to merge ALL inputs, but you must follow these **guidelines** for a high-quality merge.

# **guidelines**:
1. Forbidden: duplicated content, similar meaning contents and ignoring rule 3.
2. All generated content must be directly relevant to the final output. If an input does not contribute any new information or perspective to the final output, it will not be included.
3. Only respond with the final output.
4. Don't invent nonsensical things, Don't make **ANY** assumptions, stay consistent with the inputs.
5. Don't forget to **FOLLOW** the style of the input.`}
    ],
    "try upgrade": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. Identify the objective of the original input, Think step-by-step.
2. Think if the output manage to achieve this objective.
3. Think if is possible to improve in some way to better achieve the objective.
4. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, start with: <better output> and end with: </better output>`}
    ],

    "better readability": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. try catch some issue, error, or low quality readability in the original input, Think step-by-step.
2. Think if is possible to improve in some way to better achieve the better readability.
3. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, start with: <better output> and end with: </better output>`}
    ],

    "better formatting": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. try catch some issue, error, or low quality formatting in the original input, Think step-by-step.
2. Think if is possible to improve in some way to better achieve the better formatting.
3. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, start with: <better output> and end with: </better output>`}
    ],

    "best of judge": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. Be critical, analytical, and proficient while following the steps.
2. Identify the objective of the original input, Think step-by-step.
3. Think if the output manage to achieve this objective.
4. Make the score step-by-step, weight every aspect of the original input and the original output.
5. Score the output based on how much the original output follow the original input, in a scale of 0 to 10.
6. Your score need to be under '<score></score>' and be a int number.`}
    ],

    "try be best": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

Your response will follow this order:

# **Order**:
1. Be critical, analytical, and proficient while following the steps.
2. Identify the objective of the original input, Think step-by-step.
3. Think if the output manage to achieve this objective.
4. Make the score step-by-step, weight every aspect of the original input and the original output.
5. Score the output based on how much the original output follow the original input, in a scale of 0 to 10.
6. Based in your critical analyze make a better output to fix **ALL** flaws in the original output.
7. If not, just respond with <complete>. and end your response. If yes, rewrite the output to be better. When you rewrite your better output, put between: '<better output></better output>'`}
    ],

    "try fix the unknown mistake": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

I think something is missing/wrong of the original output. Your response will follow this order:

# **Order**:
1. Be critical, analytical, and proficient while following the steps.
2. Think step-by-step to try find the mistake in the original output and fix it.
3. When you output your response, respond between '<complete>...your output...</complete>' and end your response.`}
    ],



    "extract and analyze a news article": [
        {"role": "user", "content": `<input>{[DATA]}</input>

Explanation of this customized system of characteristics and sub-characteristics:
There are basic characteristics, which begin with an exclamation mark (!), and these define the type of characteristic that applies to a municipality, neighborhood, or street.
Sub-characteristics, which begin with an negative sign/minus sign mark (-), and these define the type of sub-characteristic the characteristic has;
Aggravators, which begin with an positive sign/plus sign mark (+), and these define the type of aggravator the sub-characteristic has;

Below are all the aggravators:
<aggravators>
+ Increasing (worsens over time)
+ Economic Impact (financial losses, unemployment, etc.)
    + Low (Loss of a small amount of money, like R$100, or minor reduction in production, which does not significantly affect the company or individual’s economy.)
    + Moderate (Loss of a significant amount of money, like R$1,000, or a moderate reduction in production, which begins to affect the company or individual’s economy but is still manageable.)
    + High (Loss of a large amount of money, like R$10,000, or a drastic reduction in production, seriously affecting the company or individual’s economy, risking financial stability.)
+ Environmental Impact (damage to the environment, pollution, etc.)
    + Low (Light pollution, like chemical leaves falling in a park, which does not significantly harm the ecosystem.)
    + Moderate (Moderate pollution, like an oil spill in a river, causing significant damage to the local ecosystem but not catastrophic.)
    + High (Significant damage, like a nuclear disaster, causing extreme harm to the ecosystem, affecting wildlife and human health extensively.)
+ Social Impact (affects social cohesion, safety, etc.)
    + Low (A minor disruption to daily routine, like a short power outage, causing no major inconvenience.)
    + Moderate (A significant disruption to daily routine, like a protest blocking a major road, causing inconvenience but not generalized violence.)
    + High (A major disruption to social order, like a general strike paralyzing essential services, causing great inconvenience and potentially leading to conflicts.)
+ Constant (happens frequently)
    + about 5~30 days
    + about 2~12 months
    + many years
+ Accelerated (worsens rapidly)
</aggravators>

Below are all the characteristics and sub-characteristics that you are to use. *ONLY* use those below:
<characteristics and sub-characteristics>
{[extension]}
</characteristics and sub-characteristics>

Your task is look at the <input> and correlate each characteristics, sub-characteristics and aggravators with each municipality, neighborhood and street in the <input>.
This toy example will help you, to see how is the structure: Municipality: Municipality's name
! characteristic (If the it is not present, output NONE; otherwise, proceed to the next step.)
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
        - sub-characteristic
            - sub-characteristic
                + aggravator
                    + aggravator
                        + aggravator
                        + aggravator
                    + aggravator
                        + aggravator

Neighborhood: Neighborhood's name
! characteristic (If the it is not present, output NONE; otherwise, proceed to the next step.)
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
        - sub-characteristic
            - sub-characteristic
                + aggravator
                    + aggravator
                        + aggravator
                        + aggravator
                    + aggravator
                        + aggravator

Street: Street's name
! characteristic (If the it is not present, output NONE; otherwise, proceed to the next step.)
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
        - sub-characteristic
            - sub-characteristic
                + aggravator
                    + aggravator
                        + aggravator
                        + aggravator
                    + aggravator
                        + aggravator

Municipality: Municipality's name
! characteristic (If the it is not present, output NONE; otherwise, proceed to the next step.)
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
    - sub-characteristic
        + aggravator
            + aggravator
                + aggravator
                + aggravator
            + aggravator
                + aggravator
        - sub-characteristic
            - sub-characteristic
                + aggravator
                    + aggravator
                        + aggravator
                        + aggravator
                    + aggravator
                        + aggravator
...
Example: Municipality: Glimmerwick
! Mystical Glitchiness
    - Reality Fraying at the Edges
        + Environmental Impact
            + High
            + Constant
                + many years
        + Social Impact
            + High
            + Accelerated
    - Unregulated Daydreaming
        - Economic Impact
            + Moderate
            + Increasing
            + Constant
                + about 5~30 days
        - Environmental Impact
            + Low
            + Constant
                + about 2~12 months

order of your response:
1. If the <input> don't have anythig related with <characteristics and sub-characteristics> just output "! NONE", if have go to the 2.
2. Think step-by-step to make correlations with <input> and <characteristics and sub-characteristics>. "2. Correlating <input> and <characteristics and sub-characteristics> step-by-step:
3. Output the correlation with characteristics and sub-characteristics ONLY. In this step don't look at the aggravators, they will be useful later. "3. Output the correlation with characteristics and sub-characteristics ONLY:"
4. Think step-by-step to make correlations with above output and <aggravators>. "4. Correlating above output and <aggravators> step-by-step:
5. Now, you will use the above output (characteristics and sub-characteristics ONLY), and, will put all aggravators you can correlate. "5. Now, correlate aggravators based on the above:"
6. Your final output (characteristics, sub-characteristics and aggravators), will be between '<complete>...</complete>' and end your response. "6. Final output:"

NOTE (YOU USE THIS SHIT ALL TIME): Focus on the main subject (Municipality/Neighborhood/Street), ONLY use 'facts', 'events' and 'context' to judge the main subject.`}
    ],

    "extract and analyze a news article - infrastructure": {
        "extend": "extract and analyze a news article",
        "content": `! Infrastructure
    - Maintenance Issues
        - Neglect/Abandonment (e.g., no water/electricity for ≥1 month, abandoned streets)
        - Equipment Failure (e.g., sudden failure of utilities or public systems)
    - Resource Shortages
        - Lack of lighting
        - Lack of water
        - Lack of basic sanitation (sewage, drinking water)
    - Structural Problems
        - Unfinished construction (something happend with a unfinished construction)
        - Drainage issues
        - Collapse of buildings/structures (a building or structure has collapsed)
    - Accessibility Problems
        - Inaccessible areas
        - Lack of signage
    - Urban Decay
        - Lack of green areas
        - Lack of leisure areas`,
    },

    "extract and analyze a news article - craters": {
        "extend": "extract and analyze a news article",
        "content": `! Craters
    - Appeared out of nowhere
        - Caused deaths or injuries
    - Craters in high-traffic areas (main streets, avenues, etc.)
    - Craters causing damage to vehicles or properties
    - Craters blocking access to certain areas`,
    },

    "extract and analyze a news article - flooding": {
        "extend": "extract and analyze a news article",
        "content": `! Flooding
    - Hinders/can hinder certain actions
        - Hinders buses
            - intermunicipal
    - With minimal rain (5~10 minutes)
    - Catastrophe (Continental area, rainfall index of ≥151 mm)
    - Health impacts
    - Flooding affecting commercial/residential areas
    - Flooding causing damage to properties or infrastructure`,
    },

    "extract and analyze a news article - environmental degradation": {
        "extend": "extract and analyze a news article",
        "content": `! Environmental Degradation
    - Pollution
        - Pollution
            - air
            - soil
            - water
            - urban areas
            - rivers
            - lakes
            - canals
            - beaches
            - seas
        - Landfills or toxic waste sites exposed to the open air
    - Damage to Ecosystems
        - Deforestation
            - urban areas
            - protected areas`
    },

    "extract and analyze a news article - public services": {
        "extend": "extract and analyze a news article",
        "content": `! Public Services
    - Healthcare
        - Delay in patient care
            - died waiting for attention
        - Lack of patient beds
            - died due to lack of beds
        - Lack of equipment
        - Lack of health products/supplies
        - Lack of doctors
        - Lack of specialized doctors
        - Poor hospital conditions (dirty, outdated, broken, etc.)
    - Education (schools, daycare, etc.)
        - Lack of student seats
        - Lack of equipment
        - Lack of teachers
        - Lack of specialized teachers
        - Poor school conditions (dirty, outdated, broken, etc.)
    - Protest
    - Urban Safety Services
        - Lack of garbage collection or urban cleaning
        - Poor maintenance of public spaces`
    },

    "extract and analyze a news article - public safety": {
        "extend": "extract and analyze a news article",
        "content": `! Public Safety
    - Violence and Crime
        - Robbery (vehicles, cellphones)
        - Vandalism (burning vehicles, graffiti)
        - Homicides
        - Kidnappings
        - Cargo theft
        - Drug trafficking
    - Social Fear
        - Perceived or real insecurity
        - Designation of "dangerous area"
        - Fear of police or criminal groups
    - Deaths of
        - Police
        - Civilians
        - Criminals`
    },

    "extract and analyze a news article - social inequality": {
        "extend": "extract and analyze a news article",
        "content": `! Social Inequality
    - Resource Inequality
        - Favela
            - Lack of
                - water
                - energy
                - sanitation
        - Peripheral areas
            - Lack of
                - water
                - energy
                - sanitation
        - Income inequality
    - Access Barriers
        - Lack of quality education
        - Lack of quality healthcare
        - Limited job opportunities`
    },

    "extract and analyze a news article - urban mobility": {
        "extend": "extract and analyze a news article",
        "content": `! Urban Mobility
    - Transportation Issues
        - Street blockages (e.g., protests, potholes)
        - Lack of public transport options/accessibility
        - Accidents (hit-and-runs, congestion)
        - public transport
        - Lack of accessibility in public transport`
    },

    "golden insight: accuracy": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

You will think step-by-step to find key insight that makes more accurate the original input. Your response will follow this order:

# **Order**:
1. Be critical, analytical, and proficient while following the steps.
2. When you output your response, start with 'Here are key insights that make more accurate the <original input>'
3. Think step-by-step to find key insight that makes more accurate the original input.`}
    ],

    "moi: accuracy": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

You will think step-by-step to find key insight that makes more accurate to another LLM re-write the original output. Your response will follow this order:

# **Order**:
1. Be critical, analytical, and proficient while following the steps.
2. When you output your response, start with 'Here are key insights that make more accurate to another LLM re-write the <original output>'
3. Think step-by-step to find key insight that makes more accurate to another LLM re-write the original output.
4. After your thinking, output direct instructions to follow your thinking, between '<complete>...</complete>' and end your response.`}
    ],

    "moi: errors": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

You will think step-by-step to find key errors to another LLM re-write the original output. Your response will follow this order:

# **Order**:
1. Be critical, analytical, and proficient while following the steps.
2. When you output your response, start with 'Here are key errors to another LLM re-write the <original output>'
3. Think step-by-step to find key errors to another LLM re-write the original output.
4. After your thinking, output direct instructions to follow your thinking, between '<complete>...</complete>' and end your response.`}
    ],

    "re-write": [
        {"role": "user", "content": `<input>{[DATA]}</input>

You will use each adicitional note to re-write the <input>. Follow the instructions in each adicitional note. Just output the re-written input.`}
    ],

    "factory judges": [
        {"role": "user", "content": `<original input>{[ORIGINAL_DATA]}</original Input>

<original output>{[OUTPUT_DATA]}</original output>

You will process the input following this exact order:

1. **Critical Analysis and Proficiency**:
   - Perform a thorough, step-by-step analysis.
   - Evaluate the input with precision, objectivity, and depth.
   - Use logical reasoning to assess all aspects of the task.

2. **Objective Identification**:
   - Determine the primary goal or purpose of the original input.
   - Break down the input into its core components to understand what is being asked.
   - Clearly define the intended outcome.

3. **Objective Achievement Check**:
   - Assess whether the original response (if provided) successfully fulfills the objective identified in Step 2.
   - Consider completeness, accuracy, relevance, and adherence to instructions.

4. **Answer Determination**:
   - If the original response **does not follow** the instructions in the <original input>, output:
     \`<answer>no</answer>\`
   - If the original response **fully follows** the instructions in the <original input>, output:
     \`<answer>yes</answer>\`

5. **Additional Instruction (if needed)**:
   - If the <answer> is \`no\`, then provide a clear, actionable, and explicit <additional_instruction> to guide a future LLM to avoid the same mistake.
   - The <additional_instruction> must:
     - Be self-contained and understandable without external context.
     - Use plain, precise language.
     - Define any placeholders used (e.g., <original input>, <answer>, <additional_instruction>) explicitly.
     - Avoid ambiguity, self-reference, or circular logic.

---

### **Definitions of Components**:

- **<original input>**: The initial request or prompt provided by the user that contains a task or instruction to be followed. This is the input to be evaluated.
- **<answer>**: A single token response, either \`yes\` or \`no\`, indicating whether the original response (if any) met the requirements of the <original input>.
- **<additional_instruction>**: A new instruction that corrects the error in the original response, designed to prevent the same mistake in future LLM outputs. It should be explicit and directly address the flaw.

START YOUR REPLY WITH 'Let's think!`}
    ],

}

export const additionalAfterFunction = {
    "relate - administrative divisions - são vicente - v2": (thisNode, text) => {

                text = text.replace("<?xml version=\"1.0\" encoding=\"UTF-8\"?>", "")
                text = text.replace("\`\`\`", "")
                text = text.replace("\`\`\`", "")
                text = text.replace("xml", "")

                // Assuming xmlString contains your XML data
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(text, "text/xml");

                // Collect all names from all levels
                const allNames = new Set();

                let allLevels = ['municipality', 'neighborhood', 'street'];

                allLevels.forEach(level => {
                    xmlDoc.querySelectorAll(level).forEach(element => {
                        const name = element.getAttribute('name');
                        if (name) allNames.add(name);
                    });
                });
              
                // Helper: Escape regex special characters
                function escapeRegExp(string) {
                    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                }

                // Process every element: remove any name from text fields
                const fields = ['facts', 'events', 'context', 'consequences'];

                // Helper: Replace all occurrences of any name in a text
function removeNamesFromText(text, names, ignoredName) {
  let result = text.normalize('NFC').trim();

  const normalizedNames = Array.from(names).map(name => name.normalize('NFC').trim());

  normalizedNames.forEach(name => {
    if (
        !name
        ||
        name == ignoredName
    ) return;

    // Escape regex special chars
    const escapedName = escapeRegExp(name);

    // Use a Unicode-safe word boundary:
    // - Look for start of string or non-word char before name
    // - Look for end of string or non-word char after name
    // - This avoids relying on \b, which fails with accents
    const regex = new RegExp(
      `(?:^|[^\\w])${escapedName}(?:$|[^\\w])`,
      'giu'
    );

    result = result.replace(regex, '...').trim();
  });

  // Clean up extra whitespace and fix punctuation
  return result
    .replace(/\s+/g, ' ')
    .replace(/,\s*([.!?])/g, '$1')
    .replace(/,\s*$/, '');
}

                let result = ""

                allLevels.forEach(level => {
                    xmlDoc.querySelectorAll(level).forEach(element => {
                    const name = element.getAttribute('name');
                    result += `[
${level}: ${name}`

                  
                    const updatedFields = {};
                    fields.forEach(field => {
                        const elementField = element.querySelector(field);
                        if (!elementField) return;
                        const text = elementField.textContent;
                        const cleaned = removeNamesFromText(text, allNames, name);
                        updatedFields[field] = cleaned;
                        result += `\n${field}: ${updatedFields[field]}`
                    });
                    console.log("Data (names removed):", {
                        name: name,
                        ...updatedFields
                    });

                    result += `],`;

                    });
                });
                //text = new DOMParser().parseFromString(text, "text/xml");

                //console.log(text)

                return result

    }
}