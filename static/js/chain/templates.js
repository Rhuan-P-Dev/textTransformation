const blockChainTemplate = `<div class="blockChain" id="blockChain">
    <div class="up">
        <div class="up">
            <select  class="clickable">
                <option selected disabled>Type Of Task</option>
                <optgroup label="=== Translation ===">
                    <option>to PT-BR</option>
                    <option>to English</option>
                </optgroup>
                <optgroup label="=== Fix ===">
                    <option>Fix gramatical errors</option>
                </optgroup>
                <optgroup label="=== Analyzer ===">
                    <option>Emotion analyzer</option>
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
                    <option>Simplify this text</option>
                    <option>Complex this text</option>
                    <option>Complex this text - HARD</option>
                    <option>Explain it with gradually</option>
                    <option>Invert the meaning</option>
                    <option>Extract information</option>
            </select>
        </div>
        <div class="mid">
            <div class="onOff clickable" state="off" title="Makes the LLM generate X outputs and aggregate all outputs into one output.">Converge</div>
            <div class="onOff clickable" state="off" title="Makes the LLM try to improve input X times.">Loop</div>
            <div class="onOff clickable" state="off" title="Makes the LLM create a knowledge database to improve input.">Database</div>
            <div class="onOff clickable" state="off" title="Makes the LLM try to improve input X*(2*Y) times.">MultiLoop</div>
        </div>
        <div class="down">
            <div class="clickable button">Run Block</div>
        </div>
    </div>
    <div class="down">
        <textarea placeholder="Output/Input"></textarea>
    </div>
</div>`