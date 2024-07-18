import React, { useCallback, useState, useEffect } from "react";
import { TextField, Box, Button, Grid, Radio, RadioGroup, FormControlLabel, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { syncGame, playGame } from "../../actions/game";
import { jwtDecode } from "jwt-decode";
import History from './History'

const Game = () => {
  const dispatch = useDispatch()

  const user = localStorage.getItem("profile")
    ? jwtDecode(JSON.parse(localStorage.getItem("profile")).token)
    : "null";

  const syncData = useSelector((state) => state.game.syncData)
  const playData = useSelector((state) => state.game.playData)

  // handle game logic
  const [coinSide, setCoinSide] = useState('heads')
  const [wagerToken, setWagerToken] = useState(1)
  const onWagerTokenChange = useCallback((e) => {
    setWagerToken(parseInt(e.target.value) || '')
  }, [])
  const onSubmit = useCallback(() => {
    dispatch(playGame({
      email: user.email,
      wager_token: wagerToken,
      coin_side: coinSide === 'heads' ? true : false,
    }),);
  }, [dispatch, user, wagerToken, coinSide])

  // sync game data after playing
  useEffect(() => {
    dispatch(syncGame(user));
  }, [playData])

  // calculate streak_count, multiple_count, hole_count
  const [multipleCount, setMultipleCount] = useState(1)
  const [holeArray, setHoleArray] = useState([])
  useEffect(() => {
    const holeCount = 10 - (syncData?.history ? syncData.history.length : 0)
    const _holeArray = []
    for (let index = 0; index < holeCount; ++index) {
      _holeArray.push(0)
    }
    setHoleArray(_holeArray)
    const _streakWinCount = syncData?.history && syncData.history.length && syncData.history[0].won ? syncData.history[0].streak_count : 0
    const _multipleCount = _streakWinCount === 2 ? 3 : _streakWinCount === 4 ? 10 : 1
    setMultipleCount(_multipleCount)
  }, [syncData])

  return (
    <Box p={5} borderRadius={2}>
      <Grid container columns={24}>
        <Grid item xs={8} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <TextField
            label="Wager"
            variant="outlined"
            value={wagerToken}
            onChange={onWagerTokenChange}
            sx={{ width: 200 }}
          />
          <RadioGroup
            row
            value={coinSide}
            onChange={() => setCoinSide(prev => prev === 'heads' ? 'tails' : 'heads')}
            sx={{ margin: '2rem 0rem', width: 200 }}
          >
            <FormControlLabel value="heads" control={<Radio />} label="Heads" />
            <FormControlLabel value="tails" control={<Radio />} label="Tails" />
          </RadioGroup>

          <Button
            variant="outlined"
            onClick={onSubmit}
            sx={{ margin: '0rem 0rem 2rem 0rem', width: 200 }}
          >Toss</Button>

          {playData ?
            <Typography variant="body2">Server Coin Toss Result: <b>{playData.server_coin_side ? 'Heads' : 'Tails'}</b>, You <b>{playData.won ? 'WON' : 'LOST'}</b>!</Typography>
            : null}
        </Grid>

        <Grid item xs={16}>
          <Grid
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
          >
            {syncData?.history && syncData.history.length ?
              syncData.history.map((history, index) => <History key={index} data={history} />)
              : null}
            {holeArray.map((_, index) => <History key={index} data={null} />)}
          </Grid>
          <Grid
            display={'flex'}
            flexDirection={'row'}
            alignItems={'center'}
            my={2}
          >
            {multipleCount === 3 ? (<>
              <Typography color={'#ee0000'} variant="h6" mx={3}><b>GREAT</b></Typography>
              You can get <Typography color={'#ee0000'} variant="h6" mx={1}>3x TOKENS</Typography> on the next win!
            </>) : null}
            {multipleCount === 10 ? (<>
              <Typography color={'#ee0000'} variant="h6" mx={3}><b>UNBELIEVABLE</b></Typography>
              You can get <Typography color={'#ee0000'} variant="h6" mx={1}>10x TOKENS</Typography> on the next win!
            </>) : null}
          </Grid>
        </Grid>
      </Grid>
    </Box >
  );
};

export default Game;
