const chainBlockTemplate = `<div class="chainBlock" id="chainBlock">
    <div class="up">
        <div class="up">
            <select class="clickable">
                <option selected disabled>Type Of Task</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </select>
        </div>
        <div class="mid">
            <div class="on_off clickable" id="on_off" state="off" title="Give examples for generic LLM to understand the task that needs to be executed.">Examples</div>
        </div>
        <div class="down">
            <div class="clickable button">Run Block</div>
        </div>
    </div>
    <div class="down">
        <textarea placeholder="Output/Input"></textarea>
    </div>
</div>`