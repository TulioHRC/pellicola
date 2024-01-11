import React, { useEffect, useState } from 'react'
import { Typography, IconButton, Box, Grid, Card, CardContent, Button, CardMedia, Alert, Backdrop } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import LoadingScreen from './LoadingScreen';
import "../styles/Components/LibraryPage.css"


function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([{"imdbID": ""}]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //const [isConfirmFormOpen, setIsConfirmFormOpen] = useState(false);
  const [confirmFormOpenMap, setConfirmFormOpenMap] = useState({"imdbID": ""});

  const getSavedMovies = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
      if(data.ok) setSavedMovies(await data.json());
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch (error) { 
      console.error('Error while fetching server: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeleteWatchedMovie = async (event: any, movieJSONstrinfyed: string) => {
    setIsLoading(true);
    event.preventDefault(); // Prevents it from reloading the page

    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: movieJSONstrinfyed
      });

      if(data.ok) console.log('Watched Movie deleted!');
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch(error) {
      console.error('Error while fetching: ', error);
      setIsError(true);
    } finally {
      getSavedMovies(); // Updates library
      setIsLoading(false);
    }
  } 

  useEffect(() => {
    setIsError(false); // Avoids the error message to appear even if the problem was resolved
    CSSnavBarButtonsSelect(false);

    getSavedMovies();
  }, []); // [] allows the useEffect to run only one time

  const GridCardsWatchedMovies = ({moviesWatchedData}: { moviesWatchedData: [{"imdbID": ""}]}) => {
    return (
      <Grid container spacing={3}>
        {
          (moviesWatchedData[0].imdbID != "")  && // Prevents it from showing non-relevant data
            moviesWatchedData.map((movie: any) => (
            <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={4}>
              <Card>
                <CardContent>
                  <CardMedia
                    component="img"
                    height="340"
                    image={movie.Poster}
                    alt={movie.Title}
                  />
                  <Typography variant="h5">{movie.Title}</Typography>
                  <Typography variant="subtitle1">{movie.Year}</Typography>
                  <form onSubmit={(event: any) => handleDeleteWatchedMovie(event, JSON.stringify(movie))}>
                    <Button variant="outlined" color="primary" onClick={() => {setConfirmFormOpenMap({"imdbID": movie.imdbID})}} sx={{color: "red", borderColor: "red"}}>
                      Delete Watched Movie
                    </Button>
                    <Backdrop open={confirmFormOpenMap["imdbID"] === movie.imdbID} onClick={() => {setConfirmFormOpenMap({"imdbID": ""})}}>
                      Do you want to remove '{movie.Title}' from your library?
                      <Button type="submit" variant="contained" color="success">Yes</Button>
                      <Button variant="contained" color="error" onClick={() => {setConfirmFormOpenMap({"imdbID": ""})}}>No</Button>
                    </Backdrop>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    )
  }

  return (
    <div className='library'>
      {
        (isLoading) ?
        <LoadingScreen /> :
        <div>
          <br />
          <Box display="flex" justifyContent="center" sx={{ marginTop: 8 }}>
            <GridCardsWatchedMovies moviesWatchedData={savedMovies}/>
          </Box>
          {
            (savedMovies[0].imdbID === "" && !isError) && // In case it has no saved movie
            <Box display="flex" justifyContent="center" >
              <IconButton color="primary" aria-label="search">
                <SearchOffIcon />
              </IconButton>
              <Typography variant="h6" gutterBottom>
                We couldn't find any saved movies.
              </Typography>
            </Box>
          }
        </div>
      }
      {
        isError &&
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="10vh">
          <Alert severity='error' position="flex" justifyContent="center">
            An error had occured! Try again later...
          </Alert>
        </Box>
      }
    </div>
  )
}

export default LibraryPage