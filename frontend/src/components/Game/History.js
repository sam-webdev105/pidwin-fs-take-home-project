import React from "react";
import { Box, Typography } from "@mui/material";

const History = ({ data }) => {
  return (data ?
    <Box
      sx={{ transition: '.5s all' }}
      m={1}
      width={100}
      height={30}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      bgcolor={data.won ? '#6fe56f' : '#ff8989'}
      border={'none'}
      borderRadius={1}
      boxShadow={(th) => th.shadows[2]}
    >
      <Typography>{data.won ? '+' : '-'}<b>{data.wager_token * data.multiple_count}</b></Typography>
      {data.multiple_count > 1 ? <Typography variant="body2" mx={1}>(x{data.multiple_count})</Typography> : null}
    </Box>
    : <Box m={1} width={100} height={30}></Box>
  )
}

export default History