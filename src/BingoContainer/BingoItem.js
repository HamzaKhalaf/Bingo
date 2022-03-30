import { Box, Typography } from '@mui/material';

import { styled } from '@mui/system';
import { useEffect, useState } from 'react';


const BingoBoxOverlay = styled(Box)(({ selected }) => ({
  display: 'flex',
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "100%",
  height: "100%",
  border: "1px solid #000",
  transform: "translate(-50%, -50%)",
  transition: "0.3s",
  backgroundColor: selected ? "#c9f2cd" : "#f6f1b5",
}));

const ColLine = styled(Box)(() => ({
  position: "absolute",
  opacity: ".4",
  top: "50%",
  left: "50%",
  width: "3px",
  height: "110%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#000",
}));

const RowLine = styled(Box)(() => ({
  position: "absolute",
  opacity: ".4",
  top: "50%",
  left: "50%",
  height: "3px",
  width: "110%",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#000",
}));

const DiagTopLeftLine = styled(Box)(() => ({
  position: "absolute",
  opacity: ".4",
  top: "50%",
  left: "50%",
  height: "3px",
  width: "150%",
  transform: "translate(-50%, -50%) rotate(45deg)",
  backgroundColor: "#000",
}));

const DiagBotLeftLine = styled(Box)(() => ({
  position: "absolute",
  opacity: ".4",
  top: "50%",
  left: "50%",
  height: "3px",
  width: "150%",
  transform: "translate(-50%, -50%) rotate(-45deg)",
  backgroundColor: "#000",
}));

const BingoItem = (props) => {
  const { itemData, itemWidth, rowIndex, colIndex, handleClickCB } = props;
  const [fontSize, setFontSize] = useState("13px");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 375) {
        setFontSize("11px")
      } else if (window.innerWidth <= 500) {
        setFontSize("13px")
      } else {
        setFontSize("1rem")
      }
    }
    handleResize();

    window.addEventListener('resize', handleResize)
  }, [])

  return (
    <Box
      width={itemWidth}
      paddingTop={itemWidth}
      position={"relative"}
      height={"0"}
    >
      <BingoBoxOverlay onClick={handleClickCB(rowIndex, colIndex)} selected={itemData.selected}>
        <Typography textAlign={"center"} fontSize={fontSize}>
          {itemData.name}
        </Typography>
      </BingoBoxOverlay>
      {itemData.colChecked && <ColLine />}
      {itemData.rowChecked && <RowLine />}
      {itemData.diagTopLeftChecked && <DiagTopLeftLine />}
      {itemData.diagBotLeftChecked && <DiagBotLeftLine />}
    </Box>
  )
}

export default BingoItem;