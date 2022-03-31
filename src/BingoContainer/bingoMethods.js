import stringsJson from "./strings.json"

const shuffleWords = (words) => {
  const shuffledWords = words.sort(() => Math.random() - Math.random());
  const centerIndex = Math.floor(shuffledWords.length / 2);
  const freeSquarIndex = words.findIndex((word) => word === "FREE");
  const swap = shuffledWords[centerIndex];
  shuffledWords[centerIndex] = shuffledWords[freeSquarIndex];
  shuffledWords[freeSquarIndex] = swap;

  return shuffledWords;
}

export const mapStrings = () => {
  const strings = shuffleWords(stringsJson)
  const itemsLengthInRow = Math.sqrt(strings.length)
  if ((itemsLengthInRow % 2) !== 1) {
    alert("strings can't form a square with a center piece")
  }
  const centerIndex = Math.floor(strings.length / 2)
  const bingoItems = Array(itemsLengthInRow).fill().map(Array)

  for (let i = 0 ; i < itemsLengthInRow ; i++) {
    for (let j = 0 ; j < itemsLengthInRow ; j++) {
      const linearCount = j + (i * itemsLengthInRow);
      const isCenter = centerIndex === linearCount

      bingoItems[i][j] = {
        name: strings[linearCount],
        selected: isCenter,
        colChecked: false,
        rowChecked: false,
        diagTopLeftChecked: false,
        diagBotLeftChecked: false,
        isCenter,
        linearCount, 
      }
    }  
  }

  return bingoItems
}

const checkColumn = (bingoItems, col, linesCount) => {
  let colChecked = true
  for (let i = 0 ; i < bingoItems[col].length ; i++) {
    if(!bingoItems[i][col].selected) {
      colChecked = false;
      break;
    }
  }

  if (colChecked) {
    linesCount++
  } else if (bingoItems[0][col].colChecked) {
    linesCount--
  }
  
  for (let i = 0 ; i < bingoItems[col].length ; i++) {
    bingoItems[i][col].colChecked = colChecked;
  }

  return [bingoItems, linesCount]
}

const checkRow = (bingoItems, row, linesCount) => {
  let rowChecked = true
  for (let i = 0 ; i < bingoItems[row].length ; i++) {
    if(!bingoItems[row][i].selected) {
      rowChecked = false;
      break;
    }
  }

  if (rowChecked) {
    linesCount++
  } else if (bingoItems[row][0].rowChecked) {
    linesCount--
  }

  for (let i = 0 ; i < bingoItems[row].length ; i++) {
    bingoItems[row][i].rowChecked = rowChecked;
  }

    return [bingoItems, linesCount]
}

const checkDiag = (bingoItems, row, col, linesCount) => {
  const isDiagTopLeft = row === col;
  const isDiagBotLeft = (bingoItems[row].length - 1) === (row + col);

  if (isDiagTopLeft) {
    let topLeftChecked = true
    for (let i = 0 ; i < bingoItems[row].length ; i++) {
      if(!bingoItems[i][i].selected) {
        topLeftChecked = false;
        break;
      }
    }

    if (topLeftChecked) {
      linesCount++
    } else if (bingoItems[0][0].diagTopLeftChecked) {
      linesCount--
    }

    for (let i = 0 ; i < bingoItems[row].length ; i++) {
      bingoItems[i][i].diagTopLeftChecked = topLeftChecked;
    }
  } else if (isDiagBotLeft) {
    let botLeftChecked = true
    for (let i = 0 ; i < bingoItems[row].length ; i++) {
      if(!bingoItems[bingoItems.length -1 - i][i].selected) {
        botLeftChecked = false;
        break;
      }
    }

    if (botLeftChecked) {
      linesCount++
    } else if (bingoItems[bingoItems.length -1][0].diagBotLeftChecked) {
      linesCount--
    }

    for (let i = 0 ; i < bingoItems[row].length ; i++) {
      bingoItems[bingoItems.length -1 - i][i].diagBotLeftChecked = botLeftChecked;
    }
  }

  return [bingoItems, linesCount];
}

export const checkCompleteLines = (bingoItems, row, col, linesCount, handleLinesChangeCB) => {
  const [colChecked, linesCountCol] = checkColumn(bingoItems, col, linesCount);
  const [rowChecked, linesCountRow] = checkRow(colChecked, row, linesCountCol);
  const [diagChecked, linesCountDiag] = checkDiag(rowChecked, row, col, linesCountRow)
  handleLinesChangeCB(linesCountDiag)
  
  return diagChecked
}