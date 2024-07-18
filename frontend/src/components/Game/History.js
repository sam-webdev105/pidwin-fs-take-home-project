import React, { useMemo } from "react";
import { Box, Typography } from "@mui/material";

const History = ({ data }) => {
  const timestamp = useMemo(() => {
    if (data === null) return ''
    const date = (new Date(data.createdAt))
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  }, [data])

  return (
    <Box
      sx={{ transition: '.5s all' }}
      mx={1}
      my={2}
      width={100}
      height={30}
      position={'relative'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'center'}
      bgcolor={data ? (data.won ? '#6fe56f' : '#ff8989') : '#efefef'}
      border={'none'}
      borderRadius={1}
      boxShadow={(th) => th.shadows[2]}
    >
      {data ? <>
        <Typography>{data.won ? '+' : '-'}<b>{data.wager_token * data.multiple_count}</b></Typography>
        {data.multiple_count > 1 ? <Typography variant="body2" mx={1}>(x{data.multiple_count})</Typography> : null}
        <Typography
          variant="body2"
          color="#aaaaaa"
          sx={{
            position: 'absolute',
            transform: 'translate(-50%, 100%)',
            bottom: '0',
            left: '50%',
          }}
        ><b>{timestamp}</b></Typography>
      </> : null}
    </Box>
  )
}

export default History