// Prints both leaderboards after points have been updated
function printLeaderboard() {
  const sectionSheets = SpreadsheetApp.getActive().getSheets().filter(sheet => sheet.getName().includes("Section"))
  const fullLeaderboard = SpreadsheetApp.getActive().getSheetByName("Full leaderboard")
  const casualLeaderboard = SpreadsheetApp.getActive().getSheetByName("Casual leaderboard")

  const scores = new Map();
  const casualScores = new Map();

  for (let i=0; i<sectionSheets.length; ++i) {
    const names = sectionSheets[i].getRange(4, 1, sectionSheets[i].getLastRow(), 1).getValues().flat()
    const points = sectionSheets[i].getRange(4, sectionSheets[i].getLastColumn()-1, sectionSheets[i].getLastRow(), 1).getValues().flat()

    for (let j=0; j<names.length; ++j) {
      if (i !== 2 && i !== 3) {
        if (casualScores.has(names[j])) {
          casualScores.set(names[j], casualScores.get(names[j]) + points[j])
        } else {
          casualScores.set(names[j], points[j])
        }
      }

      if (scores.has(names[j])) {
        scores.set(names[j], scores.get(names[j]) + points[j])
      } else {
        scores.set(names[j], points[j])
      }
    }
  }

  let fullScores = Array.from(scores)
  fullScores = fullScores.sort(scoreSorting)
  fullScores = fullScores.filter(score => score[0] != '')

  writeScores(fullLeaderboard, fullScores)

  let casualFullScores = Array.from(casualScores)
  casualFullScores = casualFullScores.sort(scoreSorting)
  casualFullScores = casualFullScores.filter(score => score[0] != '')

  writeScores(casualLeaderboard, casualFullScores)
}

function writeScores(sheet, scores) {
  let lastPos = 1

  for (let pos = 0; pos < scores.length; ++pos) {
    let leaderboardPosition;
    if (pos > 0 && scores[pos-1][1] === scores[pos][1]) {
      leaderboardPosition = lastPos
    } else {
      leaderboardPosition = pos+1
      lastPos = leaderboardPosition
    }
    sheet.getRange(pos+5, 2).setValue(leaderboardPosition)
    sheet.getRange(pos+5, 3).setValue(scores[pos][0])
    sheet.getRange(pos+5, 4).setValue(scores[pos][1])
  }
}

function scoreSorting(a, b) {
  if (a[1] === b[1]) {
    const name1 = a[0].toLowerCase()
    const name2 = b[0].toLowerCase()
    if (name1 < name2)
      return -1
    else if (name1 > name2)
      return 1;
    else return 0
  }; 
  
  return -1*(a[1] - b[1]);
}
