import { useCallback, useMemo, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import Confetti from 'react-confetti'

import BingoItem from './BingoItem';
import {mapStrings, checkCompleteLines} from './bingoMethods'

const BingoContainer = () => {
  const [bingoItems, setBingoItems] = useState(mapStrings);
  const [linesCount, setLinesCount] = useState(0);
  const [timeoutId, setTimeoutId] = useState(0);
  const [recycleConfetti, setRecycleConfetti] = useState(false);
  const itemsLengthInRow = bingoItems[0].length
  const itemWidth = useMemo(() => `${100 / itemsLengthInRow}%`, [itemsLengthInRow]);


  const handleLinesChangeCB = useCallback((newLinesCount) => {
    if (newLinesCount === linesCount) {
      return;
    }

    if (newLinesCount > linesCount) {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      setRecycleConfetti(true);
      setTimeoutId(setTimeout(() => {
        setRecycleConfetti(false);
      }, 1000))
    }

    setLinesCount(newLinesCount)
  }, [linesCount, timeoutId])

  const handleClickCB = useCallback((row, col) => () => {
    if (bingoItems[row][col].isCenter) {
      return;
    }

    const newState = bingoItems.slice()
    newState[row][col] = {
      ...newState[row][col],
      selected: !newState[row][col].selected,
    }
    const newStateChecked = checkCompleteLines(newState, row, col, linesCount, handleLinesChangeCB)

    setBingoItems(newStateChecked)
  }, [bingoItems, handleLinesChangeCB, linesCount]);

  return (
    <Box width={"90vh"} margin={"0 auto"} maxWidth={"100%"}>
      {!!timeoutId && 
        <Confetti
          recycle={recycleConfetti}
          gravity={.3}
        />
      }
      <Typography sx={{ marginBottom: "10px"}} variant='h4' textAlign={"center"}>
        Working from Home Bingo
      </Typography>
      <Paper>
        <Box display={"flex"} width={"100%"} flexWrap={"wrap"}>
          {
            bingoItems.map((rowItems, rowIndex) => {
              return rowItems.map((item, colIndex) =>  
                <BingoItem
                  key={item.name}
                  itemData={item}
                  itemWidth={itemWidth}
                  index={0}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  handleClickCB={handleClickCB}
                />
              )
            })
          }
        </Box>
      </Paper>
    </Box>
  )

}

export default BingoContainer;