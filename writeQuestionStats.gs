// Counts the correct and close cells by question instead of by respondent, then writes the tally in a statistics tab 
function writeQuestionStats() {
  const sectionSheets = SpreadsheetApp.getActive().getSheets().filter(sheet => sheet.getName().includes("Section"))
  const statistics = SpreadsheetApp.getActive().getSheetByName("Statistics")

  let statisticsRowIndex = 26;

  for (let i=0; i<sectionSheets.length; ++i) {
    const questions = sectionSheets[i].getRange(QUESTION_ROW, 2, 1, sectionSheets[i].getLastColumn()-3).getValues().flat()
    const rawAnswers = sectionSheets[i].getRange(5, 2, sectionSheets[i].getLastRow()-ROW_START+1, sectionSheets[i].getLastColumn()-3).getBackgrounds()

    const answers = rawAnswers[0].map((_, colIndex) => rawAnswers.map(row => row[colIndex]));

    for (let j=0; j<answers.length; ++j) {
      const questionAnswers = answers[j]
      let correct = 0;
      let close = 0;

      for (let k=0; k<questionAnswers.length; ++k) {
          const color = questionAnswers[k]

          switch (color) {
            case CORRECT_COLOR:
              ++correct;
              break;
            case CLOSE_COLOR:
              ++close;
              break;
            default:
              break;
          }
      }

      statistics.getRange(statisticsRowIndex, 2).setValue(questions[j]);
      statistics.getRange(statisticsRowIndex, 5).setValue(correct);
      statistics.getRange(statisticsRowIndex, 7).setValue(sectionSheets[i].getLastRow()-4-correct-close);
      statistics.getRange(statisticsRowIndex, 9).setValue(close);

      ++statisticsRowIndex;
    }
    
  }

  const questionStatistics = statistics.getRange(26, 2, statistics.getLastRow()-26+1, 9)
  questionStatistics.sort({column: 6, ascending: false})
}
