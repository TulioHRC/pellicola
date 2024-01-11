import React from 'react'
import { CircularProgress, Box, Typography, Stack } from '@mui/material'

function LoadingScreen () {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <div className='LoadingScreen' style={{justifyContent: 'center'}}>
        <Stack alignItems="center">
          <CircularProgress />
        </Stack>
        <Typography variant="h6" mt={2} marginLeft={2}>
          Loading...
        </Typography>
      </div>
    </Box>
  )
}

export default LoadingScreen;