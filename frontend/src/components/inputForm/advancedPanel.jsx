import { useState } from "react";


function AdvancedPanel(props) {
    const [advancedOptions, setAdvancedOptions] = useState(new Array(6).fill(false));
    const [memoryString, setMemoryString] = useState("");
    const [languageString, setLanguageString] = useState("");
    
    const handleAdvancedPanelCheckboxes = (index) => {
        const updatedAdvancedOptions = advancedOptions;
        updatedAdvancedOptions[index] = !updatedAdvancedOptions[index];
        switch (index) {
            case 1: {
                    const memField = document.getElementById('memField');
                if  (advancedOptions[1]) {
                    memField.disabled = false;
                } else {
                    memField.disabled = true;
                }
                break;
            }
        }
        setAdvancedOptions(updatedAdvancedOptions);
        props.advancedColumns(advancedOptions);
    }

    const handleCountBookForMemory = (e) => {
        e.preventDefault();
        props.memoryInput(memoryString);
    }

    const handleFindVisitorByLanguage = (e) => {
        e.preventDefault();
        props.languageInput(languageString);
    }

    return (
        <>
        <div>Allows special views of the data</div>
        <div>Memory: &nbsp;
             Numen only <input type="checkbox" checked = {advancedOptions[0] == true} onChange={() => handleAdvancedPanelCheckboxes(0)}/> &nbsp;
        </div>
        <div>Visitors: &nbsp;
            Show languages spoken by only 1 visitor <input type="checkbox" checked ={advancedOptions[2]} onChange={() => handleAdvancedPanelCheckboxes(2)} /> &nbsp;
            Show visitors that don&apos;t teach player a new language  <input type="checkbox" checked ={advancedOptions[4]} onChange={() => handleAdvancedPanelCheckboxes(4)}/> &nbsp;
            <div>
            Find visitor by language they teach 
            <form onSubmit={(e) => handleFindVisitorByLanguage(e)}>
                <input value={languageString} onChange={(e) => setLanguageString(e.target.value)}></input>
            </form>
            </div>
        </div>
        <div>Assistants: &nbsp;
        location of the assistants ingame where their cost is higher <br />than the average cost to all assistants from all locations in the game <input key = {Math.random()} type="checkbox" checked = {advancedOptions[5]} onChange={() => handleAdvancedPanelCheckboxes(5)} /><br /> &nbsp;
        </div>

        <div>Book: &nbsp;
             Group aspect requirement <input type="checkbox" id = "groupCheckbox" checked ={advancedOptions[1]} onChange={() => handleAdvancedPanelCheckboxes(1)}/> &nbsp;
             {/* should not be opened until the checkbox is ticked */}
             Count the books that unlocks memory: 
             <form  onSubmit={(e) => handleCountBookForMemory(e)}>
                <input id="memField" value = {memoryString} onChange={(e) => setMemoryString(e.target.value)} 
                disabled/>
             </form>
               &nbsp;
        </div>
        </>
    );
}

export default AdvancedPanel;