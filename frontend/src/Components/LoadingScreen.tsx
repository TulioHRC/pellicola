import React from 'react'
import { CircularProgress, Box, Typography } from '@mui/material'

function LoadingScreen () {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="50vh">
      <div>
        <CircularProgress />
        <Typography variant="h6" mt={2}>
          Loading...
        </Typography>
      </div>
    </Box>
  )
}

export default LoadingScreen