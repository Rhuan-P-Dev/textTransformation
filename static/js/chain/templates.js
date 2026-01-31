const blockChainTemplate = `<div class="blockChain" id="blockChain">
    <div class="up">
        <div class="up">
            <select  class="clickable">
                <option selected disabled>Type Of Task</option>
                <option>try fix the unknown mistake</option>
                <option>ask</option>
                <option>motion AI</option>
                <optgroup label="=== Translation ===">
                    <option>to PT-BR</option>
                    <option>to English</option>
                    <option>to Chinese</option>
                    <option>to positive</option>
                </optgroup>
                <optgroup label="=== Fix ===">
                    <option>Fix gramatical errors</option>
                </optgroup>
                <optgroup label="=== Analyzer ===">
                    <option>Emotion analyzer</option>
                    <option>analyze about this project</option>
                </optgroup>
                <optgroup label="=== Some Definition ===">
                    <option>Some overview definition</option>
                    <option>Some definition</option>
                    <option>Some scientific definition</option>
                    <option>Some religious definition</option>
                    <option>Some technology definition</option>
                <optgroup label="=== Extraction ===">
                    <option>Topic extration</option>
                    <option>10 things with similarity</option>
                    <option>Summary</option>
                    <option>Summary v1</option>
                    <option>Summary v2</option>
                    <option>Summary v3</option>
                    <option>Simplify this text</option>
                    <option>Complex this text</option>
                    <option>Complex this text - HARD</option>
                    <option>Explain it with gradually</option>
                    <option>Invert the meaning</option>
                    <option>add one type: municipality, neighborhood, street, or unknown</option>
                    <option>make correlations for each regional districts</option>
                    <option>extract all names</option>
                <optgroup label="=== Creation ===">
                    <option>re-write edit</option>
                    <option>LTX-Video</option>
                <optgroup label="=== Extract X ===">
                    <option>extract events - são vicente</option>
                    <option>extract: streets & neighborhoods</option>
                <optgroup label="=== Factory ===">
                    <option>relate - administrative divisions - são vicente - simple</option>
                    <option>relate - administrative divisions</option>
                    <option>relate - administrative divisions - são vicente</option>
                    <option>relate - administrative divisions - são vicente - v2</option>
                    <option>relate - administrative divisions - são vicente - low quality</option>
                <optgroup label="=== cleaner ===">
                    <option>são vicente sp - only</option>
                    <option>deduplicate</option>
            </select>
        </div>
        <div class="mid">

            <div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and aggregate all outputs (fast) into one output.">Blob</div>
            <div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and aggregate all outputs into one output.">Converge</div>
            <div class="onOff clickable" state="off" title="Makes the LLM try fix some mistake in the output.">tryfix</div>
            <div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and self judge the 'best' output.">SelfBestOf</div>
            <div class="onOff clickable" state="off" title="Makes the LLM re-read X times the instruction.">ReReadMore</div>
            <div class="onOff clickable" state="off" title="Makes the LLM try to improve input X times.">Loop</div>

        </div>
        <div class="down">
            <div class="clickable button">Run Block</div>
        </div>
    </div>
    <div class="down">
        <textarea placeholder="Output/Input"></textarea>
    </div>
</div>`

//<div class="onOff clickable" state="off" title="Makes a Mixture-of-Instructions to enchance the final output. 1 > X > 1">TODO</div>
//<div class="onOff clickable" state="off" title="Makes a Mixture-of-Instructions to enchance the final output. 1 > X > 1">MOI</div>
//<div class="onOff clickable" state="off" title="...">factoryJudges</div>
//<div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and judge the best output.">BestOf</div>
//<div class="onOff clickable" state="off" title="Split the input by X+1 and aggregate all outputs into one output.">DivideBy</div>
//<div class="onOff clickable" state="off" title="Makes the LLM create a knowledge database to improve input.">Database</div>
//<div class="onOff clickable" state="off" title="Makes the LLM try to improve input X*(2*Y) times.">MultiLoop</div>
//<div class="onOff clickable" state="off" title="NOT WORK!!!">goldenInsights</div>

const composerBlockTemplate = `<div class="blockChain" id="blockChain">
    <div class="up">
        <div class="up">
            <select  class="clickable">
                <option selected disabled>Type Of Task</option>
                    <option>emotion, topic - plus</option>
                <optgroup label="===== Test =====">
                    <option>emotion, topic</option>
                    <option>Simplify, topic, Complex, Invert, EN</option>
                    <option>creative</option>
                </optgroup>
                <optgroup label="===== Factory =====">
                    <option>relate - administrative divisions - são vicente - composer</option>
                    <option>extract and analyze a news article</option>
                    <option>extract and analyze a news article - test</option>
                    <option>extract and analyze a news article - test - test</option>
                </optgroup>
            </select>
        </div>
        <div class="mid">
            <div class="onOff clickable" state="off" title="Makes the LLM re-read X times the instruction.">ReReadMore</div>
            <div class="onOff clickable" state="off" title="Makes the LLM try fix some mistake in the output.">tryfix</div>
            <div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and aggregate all outputs (fast) into one output.">Blob</div>
            <div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and aggregate all outputs into one output.">Converge</div>
            <div class="onOff clickable" state="off" title="Makes the LLM try to improve input X times.">Loop</div>
        </div>
        <div class="down">
            <div class="clickable button">Run Block</div>
        </div>
    </div>
    <div class="down">
        <textarea placeholder="Output/Input"></textarea>
    </div>
</div>`
