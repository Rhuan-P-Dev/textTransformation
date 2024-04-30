const blockChainTemplate = `<div class="blockChain" id="blockChain">
    <div class="up">
        <div class="up">
            <select  class="clickable">
                <option selected disabled>Type Of Task</option>
                <optgroup label="=== Translation ===">
                    <option>to PT-BR</option>
                    <option>to English</option>
                </optgroup>
                <optgroup label="=== Analyzer ===">
                    <option>Emotion Analyzer</option>
                </optgroup>
                <optgroup label="=== Extraction ===">
                    <option>Some Definition</option>
                    <option>10 words with similarity</option>
                    <option>Summary</option>
                </optgroup>
            </select>
        </div>
        <div class="mid">
            <div class="onOff clickable" id="onOff" state="off" title="Give examples for generic LLM to understand the task that needs to be executed.">Examples</div>
        </div>
        <div class="down">
            <div class="clickable button">Run Block</div>
        </div>
    </div>
    <div class="down">
        <textarea placeholder="Output/Input"></textarea>
    </div>
</div>`