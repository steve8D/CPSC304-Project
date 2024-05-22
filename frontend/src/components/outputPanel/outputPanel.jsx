import React from "react";
import "./styles.css"

function OutputPanel(props) {
  let isEmpty = []
  for (let i = 0; i < props.data.length; i++) {
    if (props.data[i].length == 0) {
      isEmpty.push(true);
    } else {
      isEmpty.push(false);
    }
  }
  if (!isEmpty.includes(false)) return (<div height = "auto" width = "100%" style={{backgroundColor: "#313338", textAlign: "center"}}>{"No data found"}</div>);

  let biggerArray = [];
  for (let j = 0; j < props.data.length; j++){
    let bigArray = [];
    for (let i = 0; i < props.data[j].length; i++) {
      let array = [];
      Object.keys(props.data[j][i]).forEach(function (keyName) {
        if (typeof props.data[j][i][keyName] === "object" && props.data[j][i][keyName] != null ) {
          array.push({ field: keyName, value: props.data[j][i][keyName].data });
        } else {
          array.push({ field: keyName, value: props.data[j][i][keyName] });
        }
      });
      bigArray.push(array);
    }
    biggerArray.push(bigArray);
  }
  console.log(biggerArray);
  
  let renderedTable = biggerArray.map((bigArray) => {
    if (bigArray.length == 0) return null;
    return(
      <>
      <div className="tableName">{}</div>
      <table width={"100%"}>
        <thead>
          <tr>
          {bigArray.length > 0 &&
          bigArray[0].map((cell, cellIndex) => (
            <th key={cellIndex}>{cell.field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
      {bigArray.map((row, rowIndex) => (
        <tr key={rowIndex}>
          {row.map((cell, cellIndex) => (
            <td key={cellIndex}>{cell.value}</td>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
      </>
    )
  })

  return (
    <div style={{ height: "auto", width: "80rem", backgroundColor: "#313338" }}>
      {renderedTable}
    </div>
  );
}

// function parseTableName(index) {
//   switch (index) {
//     case 0:
//       return 'Memory';
//     case 1:
//       return 'Book';
//     case 2:
//       return 'Visitors';
//     case 3:
//       return 'Assistants';
//   }
// }

// function parseTableValue(string) {
//   if (string == '0') {
//     return 'False';
//   } else if (string == '1') {
//     return 'True';
//   } else
//     return string;
// }

export default OutputPanel;