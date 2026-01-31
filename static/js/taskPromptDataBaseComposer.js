
const promptsDataBaseCluster = {

    "mult factory: extract and analyze a news article - XML": {

        "shot": {
            "infrastructure": `! Infrastructure
- Maintenance Issues
    - Neglect/Abandonment (e.g., no water/electricity for ≥1 month, abandoned streets)
    - Equipment Failure (e.g., sudden failure of utilities or public systems)
- Resource Shortages
    - Lack of lighting
    - Lack of water
    - Lack of basic sanitation (sewage, drinking water)
- Structural Problems
    - Unfinished construction
    - Drainage issues
    - Collapse of buildings/structures
- Accessibility Problems
    - Inaccessible areas
    - Lack of signage
- Urban Decay
    - Lack of green areas
    - Lack of leisure areas`,
    "craters": `! Craters
    - Appeared out of nowhere
        - Caused deaths or injuries
    - Craters in high-traffic areas (main streets, avenues, etc.)
    - Craters causing damage to vehicles or properties
    - Craters blocking access to certain areas`,

    "flooding": `! Flooding
- Hinders/can hinder certain actions
    - Hinders buses
        - intermunicipal
- With minimal rain (5~10 minutes)
- Catastrophe (Continental area, rainfall index of ≥151 mm)
- Health impacts
- Flooding affecting commercial/residential areas
- Flooding causing damage to properties or infrastructure`,

    "environmental degradation": `! Environmental Degradation
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
        - protected areas`,

    "public services": `! Public Services
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
    - Poor maintenance of public spaces`,

    "public safety": `! Public Safety
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
    - Criminals`,

    "social inequality": `! Social Inequality
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
    - Limited job opportunities`,

    "urban mobility": `! Urban Mobility
- Transportation Issues
    - Street blockages (e.g., protests, potholes)
    - Lack of public transport options/accessibility
    - Accidents (hit-and-runs, congestion)
    - public transport
    - Lack of accessibility in public transport`,

        },
        "solo shot": {},

        "result": `======================
==== Deep Analyze ====
======================

=== infrastructure ===

{[infrastructure]}

=== craters ===

{[craters]}

=== flooding ===

{[flooding]}

=== environmental degradation ===

{[environmental degradation]}

=== public services ===

{[public services]}

=== public safety ===

{[public safety]}

=== social inequality ===

{[social inequality]}

=== urban mobility ===

{[urban mobility]}`,

        "main": `input:<input>{[DATA]}</input>

Explanation of this customized system of characteristics and sub-characteristics:
There are basic characteristics (basic characteristics start with '!'), which define what type of characteristic the input has.
Sub-characteristics (Sub-characteristics start with '-'), define what type of sub-characteristic the characteristic has; note that a sub-characteristic can have other sub-characteristics.
Any sub-characteristic can have an aggravator. Aggravators (Aggravators start with '+') within other aggravators can only be used within the previous aggravator.

Below are all the aggravators:
<?xml version="1.0" encoding="UTF-8"?> <aggravators> <aggravator name="Increasing">worsens over time</aggravator> <aggravator name="Economic Impact">financial losses, unemployment, etc.</aggravator> <aggravator name="Environmental Impact">damage to the environment, pollution, etc.</aggravator> <aggravator name="Social Impact"> <subaggravator name="Constant"> <description>happens frequently</description> </subaggravator> <subaggravator name="Accelerated"> <description>worsens rapidly</description> </subaggravator> <impact-level name="Low"> <description>Loss of a small amount of money, like R$100, or minor reduction in production, which does not significantly affect the company or individual’s economy.</description> </impact-level> <impact-level name="Moderate"> <description>Loss of a significant amount of money, like R$1,000, or a moderate reduction in production, which begins to affect the company or individual’s economy but is still manageable.</description> </impact-level> <impact-level name="High"> <description>Loss of a large amount of money, like R\$10,000, or a drastic reduction in production, seriously affecting the company or individual’s economy, risking financial stability.</description> </impact-level> <impact-level name="Low"> <description>Light pollution, like chemical leaves falling in a park, which does not significantly harm the ecosystem.</description> </impact-level> <impact-level name="Moderate"> <description>Moderate pollution, like an oil spill in a river, causing significant damage to the local ecosystem but not catastrophic.</description> </impact-level> <impact-level name="High"> <description>Significant damage, like a nuclear disaster, causing extreme harm to the ecosystem, affecting wildlife and human health extensively.</description> </impact-level> <impact-level name="Low"> <description>A minor disruption to daily routine, like a short power outage, causing no major inconvenience.</description> </impact-level> <impact-level name="Moderate"> <description>A significant disruption to daily routine, like a protest blocking a major road, causing inconvenience but not generalized violence.</description> </impact-level> <impact-level name="High"> <description>A major disruption to social order, like a general strike paralyzing essential services, causing great inconvenience and potentially leading to conflicts.</description> <time-frame>about 5~30 days</time-frame> <time-frame>about 2~12 months</time-frame> <time-frame>many years</time-frame> </impact-level> </aggravator> </aggravators>


Below are all the characteristics and sub-characteristics that you are to use. *ONLY* use those below:
{[SHOT]}


You need to look at the input and correlate with characteristics, sub-characteristics and aggravators with the Municipality, Neighborhood and Street in the input. This toy example will help you, to see how is the structure:
Municipality: Municipality's name
<LocationCharacteristics> <Municipality name="Municipality's name"> <Characteristic> <Name>characteristic</Name> <SubCharacteristics> <SubCharacteristic> <Name>sub-characteristic</Name> <SubCharacteristics> <SubCharacteristic> <Name>sub-characteristic</Name> <Aggravators> <Aggravator> <Name>aggravator</Name> <Aggravators> <Aggravator> <Name>aggravator</Name> </Aggravator> </Aggravators> </Aggravator> </Aggravators> </SubCharacteristic> </SubCharacteristics> </SubCharacteristic> </SubCharacteristics> </Characteristic> </Municipality> <Neighborhood name="Neighborhood's name"> <Characteristic> <Name>characteristic</Name> <SubCharacteristics> <SubCharacteristic> <Name>sub-characteristic</Name> <SubCharacteristics> <SubCharacteristic> <Name>sub-characteristic</Name> <Aggravators> <Aggravator> <Name>aggravator</Name> <Aggravators> <Aggravator> <Name>aggravator</Name> </Aggravator> </Aggravators> </Aggravator> </Aggravators> </SubCharacteristic> </SubCharacteristics> </SubCharacteristic> </SubCharacteristics> </Characteristic> </Neighborhood> <Street name="Street's name"> <Characteristic> <Name>characteristic</Name> <SubCharacteristics> <SubCharacteristic> <Name>sub-characteristic</Name> <SubCharacteristics> <SubCharacteristic> <Name>sub-characteristic</Name> <Aggravators> <Aggravator> <Name>aggravator</Name> <Aggravators> <Aggravator> <Name>aggravator</Name> </Aggravator> </Aggravators> </Aggravator> </Aggravators> </SubCharacteristic> </SubCharacteristics> </SubCharacteristic> </SubCharacteristics> </Characteristic> </Street> </LocationCharacteristics>

Remember that in input you must identify all municipalities, neighborhoods, and streets if not exist just output NONE.

OUTPUT RULES:
1. Any aggravator must be under a sub-characteristic.
5. DON'T create any new characteristics, sub-characteristics and aggravators.
6. You output ONLY a critical & professional analysis of the input.
7. You need to correlate characteristics, sub-characteristics and aggravator with the Municipality, Neighborhood and Street in the input. Remember that some characteristics, sub-characteristics and aggravator are linked only to streets, others only to neighborhoods, and others only to the municipality. You should pay attention to ensure you make these correlations correctly.
8. Don't write ANY 'note'.
9. Don't invent nonsensical things; just make small, obvious assumptions, and stay consistent with the input.
10. If you're unsure, don't include that characteristic, sub-characteristic or aggravator.
11. If the INPUT don't have any characteristic, sub-characteristic or aggravator, just output NONE.
12. All user instructions don't have mistake.
13. All user instructions are perfect.
14. Follow ALL rules, formats, etc. ALL!

**THE USER INSTRUCTIONS DON'T HAVE *ANY* MISTAKE!**

Just relax, keep calm, my friend. I will pay extra if you work hard! Have a good day and good luck!`},

"mult factory: test": {

        "shot": {
            "infrastructure": `Now, Tell me the topics of input. Please respond to me in this **format**: topic1, topic2, topic3, and so on... Please respond **ONLY** with the topics.`,

    "craters": `Now, Tell me what emotion the input conveys. Please respond to me in this **format**: emotion1, emotion2, emotion3, and so on... Please respond **ONLY** with the emotions.`,

        },
        "solo shot": {},

        "result": `======================
==== Deep Analyze ====
======================

=== infrastructure ===

{[infrastructure]}

=== craters ===

{[craters]}`,

        "main": `input:<input>{[DATA]}</input>

{[SHOT]}`},

}


const promptsDataBaseComposer = {

    "emotion, topic - plus": {
        "order": {
            "Topic extration": ["input"],
            "Emotion analyzer": ["input"]
        },
        "outputTask":[
            "Topic extration",
            "Emotion analyzer"
        ],
        "input": [
            "Emotion analyzer",
            "Topic extration",
        ],
        "output": `======================
==== test Analyze ====
======================

=== Emotion ===

{[Emotion analyzer]}

=== Topic ===

{[Topic extration]}`
    },

    "emotion, topic": {
        "input": [
            "Emotion analyzer",
            "Topic extration",
        ],
        "output": `======================
==== test Analyze ====
======================

=== Emotion ===

{[Emotion analyzer]}

=== Topic ===

{[Topic extration]}`
    },
    "Simplify, topic, Complex, Invert, EN": {
        "input": [
            "to English",
            "Simplify this text",
            "Topic extration",
            "Complex this text",
            "Invert the meaning",
        ],
        "output": `========================
==== test Analyze ======
========================

=== to English ====

{[to English]}

=== Simplify ===

{[Simplify this text]}

=== Topic ===

{[Topic extration]}

=== Complex ===

{[Complex this text]}

=== Invert ===

{[Invert the meaning]}`
    },

    "creative": {
        "input": [
            "Image - tags & txt",
            "LTX-Video",
            "Flux image build",
        ],
        "output": `======================
==== test Analyze ====
======================

=== Image - tags & txt ===

{[Image - tags & txt]}

=== LTX-Video ===

{[LTX-Video]}

=== Flux image build ===

{[Flux image build]}`
    },

    "relate - administrative divisions - são vicente - composer": {

        "order": {
            "add one type: municipality, neighborhood, street, or unknown": ["input"],
            "make correlations for each regional districts": [
                "input",
                "add one type: municipality, neighborhood, street, or unknown"
            ],
            "relate - administrative divisions - são vicente - simple": [
                "input",
                "make correlations for each regional districts"
            ],
            "relate - administrative divisions - são vicente - v2": [
                "input",
                "relate - administrative divisions - são vicente - simple"
            ]
        },
        "outputTask":[
            "relate - administrative divisions - são vicente - v2"
        ],
        "input": [
            "add one type: municipality, neighborhood, street, or unknown",
            "make correlations for each regional districts",
            "relate - administrative divisions - são vicente - simple",
            "relate - administrative divisions - são vicente - v2",
        ],
        "output": `=== administrative divisions ===

{[relate - administrative divisions - são vicente - v2]}`
    },

    "extract and analyze a news article": {
        "avoidDefaultInput": true,
        "input": [
            "extract and analyze a news article - infrastructure",
            "extract and analyze a news article - craters",
            "extract and analyze a news article - flooding",
            "extract and analyze a news article - environmental degradation",
            "extract and analyze a news article - public services",
            "extract and analyze a news article - public safety",
            "extract and analyze a news article - social inequality",
            "extract and analyze a news article - urban mobility",
        ],
        "output": `======================
==== Deep Analyze ====
======================

=== infrastructure ===

{[extract and analyze a news article - infrastructure]}

=== craters ===

{[extract and analyze a news article - craters]}

=== flooding ===

{[extract and analyze a news article - flooding]}

=== environmental degradation ===

{[extract and analyze a news article - environmental degradation]}

=== public services ===

{[extract and analyze a news article - public services]}

=== public safety ===

{[extract and analyze a news article - public safety]}

=== social inequality ===

{[extract and analyze a news article - social inequality]}

=== urban mobility ===

{[extract and analyze a news article - urban mobility]}`
    },

    "extract and analyze a news article - test": {
        "avoidDefaultInput": true,
        "input": [
            "extract and analyze a news article - infrastructure",
            "extract and analyze a news article - craters"
        ],
        "output": `======================
==== Deep Analyze ====
======================

=== infrastructure ===

{[extract and analyze a news article - infrastructure]}

=== craters ===

{[extract and analyze a news article - craters]}`
    },

    "extract and analyze a news article - test - test": {
        "avoidDefaultInput": true,
        "input": [
            "extract and analyze a news article - infrastructure",
        ],
        "output": `======================
==== Deep Analyze ====
======================

=== infrastructure ===

{[extract and analyze a news article - infrastructure]}`
    },

}


//mult chain

//X -> Y -> result