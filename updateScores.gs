// This is the entry point function to update all the scores. Everybody's scores in each section are counted, then 
// two other functions update the leaderboard and the question stats
function updateScores() {
  const sectionSheets = SpreadsheetApp.getActive().getSheets().filter(sheet => sheet.getName().includes("Section"))

  for (let i=0; i<sectionSheets.length; ++i) {
    let lastColumn = sectionSheets[i].getLastColumn()-1;
    let lastRow = sectionSheets[i].getLastRow();
    let range = sectionSheets[i].getRange(2, 1, lastRow, lastColumn-1);
    
    let colors = range.getBackgrounds();
    let points = range.getValues()[0]
    points.shift();

    for (let j = 2; j<=lastRow; ++j) {
      let rowColors = colors[j-2].slice()
      rowColors.shift() 
      let total = sumPoints(rowColors, points)
      sectionSheets[i].getRange(j, lastColumn).setValue(total)
    } 
  }

  printLeaderboard();
  writeQuestionStats();
}
