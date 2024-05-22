import React, { useState, useEffect } from "react";
import "./styles.css";
import FilterPanel from "./filterPanel";
import AdvancedPanel from "./advancedPanel";

function InputForm({ onItemsChange }) {
  const [query, setQuery] = useState("");
  const [items, setItems] = useState([]);
  const [insertInput, setInsertInput] = useState("");
  const [updateInput, setUpdateInput] = useState("");
  const [bookIDInput, setBookIDInput] = useState("");

  const [filterPanelOpen, setFilterPanel] = useState(true);
  const [advancedPanelOpen, setAdvancedPanel] = useState(true);

  const [selectedColumnsAllTable, setSelectedColumnsAllTable] = useState([
    [false, false, false, false, false, false, false, false],
    [true, false, false, false, false, false, false],
    [false]
  ]);

  // flags[numenOnly, groupAspect, languageSpokenByOne, visitorsNotTeachPlayerNewLanguage]
  const [flags, setFlags] = useState(new Array(5).fill(false));

  
  let list = {
    memoryID: 'ME111',
    memoryName: 'Memory: Taste hellooo',
    memorySources: 'Considering sustenance and beverages',
    memoryIsSound: 0,
    memoryIsOmen: 0,
    memoryIsPersistent: 0,
    memoryIsWeather: 0,
  };
  let listBook = {
      bookID:'',
      bookName : '',
      language:'',
      aspectID:'AS001',
      memoryID:'',
      elementOfTheSoulID:'',
      numenID:'',
  }
  
  let selectedColumns = "";
  let initTableNames = [`memory`,`book`, `people/visitors`]
  let tableNames = initTableNames;
  let one = ['one'];

  const sanitizeInput = (str) => {
    return str.replace(/[`~!@#$%^&*_|+\-=?;:'.]/gi, "");
  }

  useEffect(() => {
    console.log("Items updated:", items);
    onItemsChange(items);
  }, [items]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSelectedColumns();
    tableNames = initTableNames.filter(filterTableName);
    let subUrl = ``;
    let cleanQuery = sanitizeInput(query);
    if (cleanQuery != "") {
      subUrl = `/findByName/${cleanQuery}`;
    }
    fetchAPI(e, subUrl);
  };


  const handleAdvancedFlags = (advancedOptions) => {
    let updatedFlags = [...flags];
    advancedOptions.map((bool, index) => {
      updatedFlags[index] = bool;
    })
    setFlags(updatedFlags);
    console.log("updated falgs:"+updatedFlags)
  }
  const handleSelectedColumns = () => {
    const bookFilter = selectedColumnsAllTable[1];
    console.log(bookFilter);
    const columnArr = [];
    if (bookFilter[0]) {
      tableNames[1] = 'book';
    } else {
      tableNames[1] = null;
    }
    if (bookFilter[1]) {
      columnArr.push("bookID");
    }
    if (bookFilter[2]) {
      columnArr.push("bookName");
    }
    if (bookFilter[3]) {
      columnArr.push("language");
    }
    if (bookFilter[4]) {
      columnArr.push("aspectID");
    }
    if (bookFilter[5]) {
      columnArr.push("memoryID");
    }
    if (bookFilter[6]) {
      columnArr.push("numenID");
    }
    selectedColumns = columnArr.join();
  }

  const filterTableName = (tableName) => {
    return tableName != null;
  }

  const handleAdvancedBookSubmit = async (memoryString) => {
    let subUrl = ``;
    let cleanMemoryString = sanitizeInput(memoryString);
    if (cleanMemoryString) subUrl = `/findByMemory/` + cleanMemoryString;
    try {
      const data = await fetch(`http://localhost:3000/book` + subUrl + `?groupBy=aspectID`, { 
        credentials: "include",

        method: "GET",

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },

      }).then(response => response.json())
      onItemsChange([data]);
    } catch (e) {
    console.log(e);
    }
  }

  const handleAdvancedVisitorSubmit = async (languageString) => {
    let subUrl = ``;
    let cleanLanguageString = sanitizeInput(languageString);
    if (cleanLanguageString) subUrl = `/findByLanguage/` + cleanLanguageString;
    try {
      const data = await fetch(`http://localhost:3000/people/visitors` + subUrl, { 
        credentials: "include",

        method: "GET",

        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
       },

      }).then(response => response.json())
      onItemsChange([data]);
    } catch (e) {
    console.log(e);
    }
  }

  const fetchAPI = async (e, subUrl) => {
    e.preventDefault();
    if (flags[0]) {
      try {
        const numenData = await fetch(`http://localhost:3000/numen` + subUrl, { 
          credentials: "include",

          method: "GET",

          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         },

        }).then(response => response.json())
        console.log(numenData);
        onItemsChange([numenData]);
      } catch (e) {
      console.log(e);
      }
    } else if (flags[4]) {
      try {
        const allData = await Promise.all(one.map(() =>
            fetch(`http://localhost:3000/people/visitors/?nonLanguageTeaching=true`, { 
              credentials: "include",
  
              method: "GET",
  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             },
            }).then(response => response.json())));
        onItemsChange(allData);
      }catch (e) {
        console.log(e);
      }
    
    } else if (flags[2]) {
      try {
        const allData = await Promise.all(one.map(() =>
            fetch(`http://localhost:3000/people/visitors/?uniqueLanguageVisitor=true`, { 
              credentials: "include",
  
              method: "GET",
  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             },
            }).then(response => response.json())));
        onItemsChange(allData);
      }catch (e) {
        console.log(e);
      }

    } else if (flags[5]) {
      console.log("bert");
      try {
        const allData = await Promise.all(one.map(() =>
            fetch(`http://localhost:3000/people/assistants/aggregated`, { 
              credentials: "include",
  
              method: "GET",
  
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
             },
            }).then(response => response.json())));
        onItemsChange(allData);
      }catch (e) {
        console.log(e);
      }

    } else if(selectedColumns){
        try {
          const allData = await Promise.all(tableNames.map(tableName =>
              fetch(`http://localhost:3000/${tableName}${subUrl}?selectedColumns=${selectedColumns}`, { 
                credentials: "include",
    
                method: "GET",
    
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
               },
              }).then(response => response.json())));
          onItemsChange(allData);
        }catch (e) {
          console.log(e);
        }
      } else {
        try {
          const allData = await Promise.all(tableNames.map(tableName =>
            fetch(`http://localhost:3000/${tableName}${subUrl}`, { 
                credentials: "include",
    
                method: "GET",
    
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
               },
              }).then(response => response.json())
              )
            );
          onItemsChange(allData);
        }catch (e) {
          console.log(e);
        }
      }
  };


  const handleFilterClick = () => {
    const filterPanel = document.getElementById('filter');
    setFilterPanel(!filterPanelOpen);
    if (filterPanelOpen) {
      filterPanel.style.display = 'block';
    } else {
      filterPanel.style.display = 'none';
    }
  }

  const handleFilterBookColumns = (filteredColumns) => {
    let updatedState = [...selectedColumnsAllTable];
    filteredColumns.map((state, i) => {
      updatedState[1][i] = state;
      console.log(state)
    })
    setSelectedColumnsAllTable(updatedState);
  }
  // const handleFilterVisitorColumn = (filteredColumn) => {
  //   let updatedState = [...selectedColumnsAllTable];
  //   updatedState[2][0] = filteredColumn;
  //   console.log(filteredColumn)
  //   setSelectedColumnsAllTable(updatedState);
  // };

  const handleAdvancedClick = () => {
    const advancedPanel = document.getElementById('advanced');
    setAdvancedPanel(!advancedPanelOpen);
    if (advancedPanelOpen) {
      advancedPanel.style.display = 'block';
    } else {
      advancedPanel.style.display = 'none';
    }
  }

  const handleSubmitINSERT = (e) => {
    e.preventDefault();
    let cleanInsertInput = sanitizeInput(insertInput);
    // Split the input value by commas and assign to list properties
    const values = cleanInsertInput.split(",").map((value) => value.trim());
    if (values[0].length != 5 && values[0].length != 0)  {
      alert("That is not valid insertion");
      return;
    }
    
    list = {
      ...list,
      memoryID: values[0] || list.memoryID,
      memoryName: values[1] || list.memoryName,
      memorySources: values[2] || list.memorySources,
      memoryIsSound: values[3] || list.memoryIsSound,
      memoryIsOmen: values[4] || list.memoryIsOmen,
      memoryIsPersistent: values[5] || list.memoryIsPersistent,
      memoryIsWeather: values[6] || list.memoryIsWeather,
    };
    listBook = {
      ...listBook,
      bookID: values[0] || listBook.bookID,
      bookName: values[1] || listBook.bookName,
      language: values[2] || listBook.language,
      aspectID: values[3] || listBook.aspectID,
      memoryID: values[4] || listBook.memoryID,
      elementOfTheSoulID: values[5] || listBook.elementOfTheSoulID,
      numenID: values[6] || listBook.numenID,
    };
    fetchAPIInsert(listBook);
  };

  const fetchAPIInsert = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(
          `Insert request failed with status: ${response.status}`
        );
      }
      
      alert("Insert request successful");
    } catch (error) {
      alert("Error during insert request: " + error.message);
      console.error("Error during insert request:", error.message);
    }
  };



  const handleSubmitUPDATE = (e) => {
    e.preventDefault();
    // Split the input value by commas and assign to list properties

    const values = updateInput.split(",").map((value) => value.trim());
    list = {
      ...list,
      memoryID: values[0] || list.memoryID,
      memoryName: values[1] || list.memoryName,
      memorySources: values[2] || list.memorySources,
      memoryIsSound: values[3] || list.memoryIsSound,
      memoryIsOmen: values[4] || list.memoryIsOmen,
      memoryIsPersistent: values[5] || list.memoryIsPersistent,
      memoryIsWeather: values[6] || list.memoryIsWeather,
    };

    listBook = {
      ...listBook,
      bookID: values[0] || listBook.bookID,
      bookName: values[1] || listBook.bookName,
      language: values[2] || listBook.language,
      aspectID: values[3] || listBook.aspectID,
      memoryID: values[4] || listBook.memoryID,
      elementOfTheSoulID: values[5] || listBook.elementOfTheSoulID,
      numenID: values[6] || listBook.numenID,
    };
    fetchAPIUpdate(listBook);
  };
  
  const fetchAPIUpdate = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/book/findByID/${data.bookID}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`Update request failed with status: ${response.status}`);
      }
  
      const responseData = await response.json();
      alert("Update request successful");
      console.log("Update request successful", responseData);
    } catch (error) {
      alert("Error during update request: " + error.message)
      console.error("Error during update request:", error.message);
    }
  };
  const handleSubmitDELETE = (e) => {
    e.preventDefault();
    handleDelete(e);
  };
  const handleDelete = async () => {
    console.log(bookIDInput)
    try {
      const response = await fetch(`http://localhost:3000/book/findByID/${bookIDInput}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Delete request failed with status: ${response.status}`);
      }
  
      alert("Delete request successful");
      // You may want to update your state or perform additional actions after a successful delete
    } catch (error) {
      alert("Error during delete request: " + error.message);
      console.error("Error during delete request:", error.message);
    }
  };


  
  return (
    <div className="input-form-container">
      <div className="parent">
        <div className="col">
          <form onSubmit={handleSubmit}>
            <input
              className="input-form"
              type="text"
              placeholder="Enter keywords here"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
             <button className="col" type="button" onClick={handleFilterClick}>Filter</button>
             <button className="col" type="button" onClick={handleAdvancedClick}>Advanced</button>
          </form>
          <div id="filter" className="filterPanel">
            <FilterPanel bookColumns = {handleFilterBookColumns}/>
            </div>
          <div id="advanced" className="advancedPanel">
            <AdvancedPanel advancedColumns = {handleAdvancedFlags} memoryInput = {handleAdvancedBookSubmit}
            languageInput = {handleAdvancedVisitorSubmit}/>
            </div>
          <h2>INSERT</h2>
          {}
          <form onSubmit={handleSubmitINSERT}>
            {}
            <input
              className="input-form"
              type="text"
              placeholder="Enter INSERT"
              value={insertInput}
              onChange={(e) => setInsertInput(e.target.value)}
            />
            <button className="col">INSERT</button>
          </form>
          <h2>UPDATE</h2>
          {}
          <form onSubmit={handleSubmitUPDATE}>
            {}
            <input
              className="input-form"
              type="text"
              placeholder="Enter UPDATE"
              value={updateInput}
              onChange={(e) => setUpdateInput(e.target.value)}
            />
            <button className="col">UPDATE</button>
          </form>
          <h2>DELETE</h2>
          {}
          <form onSubmit={handleSubmitDELETE}>
            {}
            <input
              className="input-form"
              type="text"
              placeholder="Enter DELETE"
              value={bookIDInput}
              onChange={(e) => setBookIDInput(e.target.value)}
            />
            <button className="col">DELETE</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InputForm;