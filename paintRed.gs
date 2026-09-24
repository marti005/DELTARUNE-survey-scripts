// This function was used to paint every blank row in a column red after painting all the correct or close rows manually
// Since I was coloring the columns one at a time, I didn't go super fancy and simply changed the values in these constants
function paintRed() {
  const SHEET_NAME = "Section 5: Wildcard"
  const COLUMN = 7;

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
  const colors = spreadsheet.getRange(ROW_START_COMMUNITY, COLUMN, RESPONSE_ROWS+1, 1).getBackgrounds().flat()

  for (let i = 0; i<colors.length; ++i) {
    if (colors[i] === "#ffffff") {
      spreadsheet.getRange(i+ROW_START_COMMUNITY, COLUMN).setBackground(INCORRECT_COLOR);
    }
  }
}
