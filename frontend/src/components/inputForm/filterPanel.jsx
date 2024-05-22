// filterPanel.jsx
import { useState } from "react";

function FilterPanel(props) {
  const [selectedBookColumns, setSelectedBookColumns] = useState([true, false, false, false, false, false, false]);
  const [showMemoryTable, setShowMemoryTable] = useState([true]);

  const handleBookCheckboxes = (checkboxIndex) => {
    const updatedSelectedBookColumns = selectedBookColumns.map((column, index) =>
      index === checkboxIndex ? !column : column
    );
    setSelectedBookColumns(updatedSelectedBookColumns);
    props.bookColumns(updatedSelectedBookColumns);
  };

  return (
    <>
      <div>Change what can be shown using the checkboxes</div>
      <div>
        {/* Memory: &nbsp;
        Show <input type="checkbox" checked={showMemoryTable} onChange={() => setShowMemoryTable(!showMemoryTable)}/> &nbsp; */}
        {/* MemoryID <input type="checkbox" /> &nbsp;
        MemoryName <input type="checkbox" /> &nbsp;
        MemorySources <input type="checkbox" /> &nbsp;
        MemoryIsSound <input type="checkbox" /> &nbsp;
        MemoryIsOmen <input type="checkbox" /> &nbsp;
        memoryIsPersistent <input type="checkbox" /> &nbsp;
        MemoryIsWeather <input type="checkbox" /> &nbsp; */}
      </div>
      <div>
        Book: &nbsp;
        Show <input type="checkbox" checked={selectedBookColumns[0]} onChange={() => handleBookCheckboxes(0)} /> &nbsp;
        bookID <input type="checkbox" checked={selectedBookColumns[1]} onChange={() => handleBookCheckboxes(1)} /> &nbsp;
        bookName <input type="checkbox" checked={selectedBookColumns[2]} onChange={() => handleBookCheckboxes(2)} /> &nbsp;
        language <input type="checkbox" checked={selectedBookColumns[3]} onChange={() => handleBookCheckboxes(3)} /> &nbsp;
        aspectID <input type="checkbox" checked={selectedBookColumns[4]} onChange={() => handleBookCheckboxes(4)} /> &nbsp;
        memoryID <input type="checkbox" checked={selectedBookColumns[5]} onChange={() => handleBookCheckboxes(5)} /> &nbsp;
        numenID <input type="checkbox" checked={selectedBookColumns[6]} onChange={() => handleBookCheckboxes(6)} /> &nbsp;
      </div>
      
    </>
  );
}

export default FilterPanel;
