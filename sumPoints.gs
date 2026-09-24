// Updates the point totals for each person in each section
function sumPoints(colors, points) {
  if (colors.length !== points.length)
    throw "Answers range and points range must be the same length"
  
  let total = 0;

  for (let i = 0; i<colors.length; ++i) {
    let pointsCell = points[i];

    let maxValue = pointsCell;
    let closeValue = 0;

    if (isNaN(pointsCell)) {
      maxValue = pointsCell.match(/(?<=Max: )\d+/);
      closeValue = pointsCell.match(/(?<=Close: )\d+/);
    }

    maxValue = Number.parseInt(maxValue);
    closeValue = Number.parseInt(closeValue);

    switch (colors[i]) {
      case CORRECT_COLOR:
        total += maxValue;
        break;
      case CLOSE_COLOR:
        total += closeValue;
        break;
      default:
        total += 0;
    }
  }
  return total;
}
