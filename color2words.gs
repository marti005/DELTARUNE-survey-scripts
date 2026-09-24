// This function simply wrote the colors of open ended text answers into a separate sheet so it could be used to make the statistical analysis

function color2Words() {  
  const outputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Tady's Data")
  const inputSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Section 5: Wildcard")
  const COL = 2;
  const OUTPUT_COL = outputSheet.getLastColumn()+1

  let colors = inputSheet.getRange(ROW_START, COL, inputSheet.getLastRow()-ROW_START+1, 11).getBackgrounds()
  colors = colors[0].map((_, colIndex) => colors.map(row => row[colIndex]));

  for (let col = 0; col < colors.length; ++col ){
    colColors = colors[col];
    for (let i = 0; i<colColors.length; ++i) {
      const writeCel = outputSheet.getRange(i+2, OUTPUT_COL+col);
      switch (colColors[i]) {
        case CORRECT_COLOR:
          writeCel.setValue("Correct");
          break;
        case CLOSE_COLOR:
          writeCel.setValue("Close");
          break;
        default:
          writeCel.setValue("Incorrect");
      }
    }
  }
}
