import React, { useEffect, useState } from 'react'
import { Typography, IconButton, Box, Grid, Card, CardContent, Button, CardMedia, Backdrop } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import BasicSnackbar from './BasicSnackbar';
import LoadingScreen from './LoadingScreen';

function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([{"imdbID": ""}]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [confirmFormOpened, setConfirmFormOpened] = useState({"imdbID": ""});
  const [movieDeletedSnackBarActive, setMovieDeletedSnackBarActive] = useState(false);

  const getSavedMovies = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
      if(data.ok) setSavedMovies(await data.json());
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch (error) { 
      console.error('Error while fetching: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const deleteMovie = async (movieJSONstrinfyed: string) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: movieJSONstrinfyed
      });

      if(data.ok) setMovieDeletedSnackBarActive(true);
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch(error) {
      console.error('Error while fetching: ', error);
      setIsError(true);
    }
  }

  const handleDeleteWatchedMovie = async (event: any, movieJSONstrinfyed: string) => {
    setIsLoading(true);
    event.preventDefault(); // Prevents it from reloading the page

    await deleteMovie(movieJSONstrinfyed);
    
    await getSavedMovies(); // Updates library
    setIsLoading(false);
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
                  <CardMedia component="img" height="340" image={movie.Poster} alt={movie.Title}/>
                  <Typography variant="h5">{movie.Title}</Typography>
                  <Typography variant="subtitle1">{movie.Year}</Typography>
                  
                  <Button variant="outlined" color="primary" onClick={() => {setConfirmFormOpened({"imdbID": movie.imdbID})}} sx={{color: "red", borderColor: "red"}}>
                    Delete Watched Movie
                  </Button>

                  <Backdrop open={confirmFormOpened["imdbID"] === movie.imdbID} onClick={(event: any) => {if (event.target === event.currentTarget) setConfirmFormOpened({"imdbID": ""})}}>
                    <Box backgroundColor="white" padding={2} borderRadius={8} display="flex" flexDirection="column" alignItems="center">
                      <Typography variant="h6" color="textPrimary" gutterBottom>
                        Do you want to remove {movie.title} from your library?</Typography>
                      <Box display="flex" justifyContent="center" marginTop={2}>
                        <Button variant="contained" color="success" sx={{ marginRight: 2 }} onClick={(event: any) => handleDeleteWatchedMovie(event, JSON.stringify(movie))}>
                          Yes</Button>
                        <Button variant="contained" color="error" onClick={() => {setConfirmFormOpened({"imdbID": ""})}}>No</Button>
                      </Box>
                    </Box>
                  </Backdrop>
                  
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    )
  }

  return (
    <div className='library'>
      <BasicSnackbar isVariable={movieDeletedSnackBarActive} severity="success" message="Movie deleted!" setIsVariable={setMovieDeletedSnackBarActive} />
      <BasicSnackbar isVariable={isError} severity="error" message="An error had occured! Try again later..." setIsVariable={setIsError} />
      {
        (isLoading) ?
        <LoadingScreen /> :
        <div id='libraryContainer'>
          <br />
          <Box display="flex" justifyContent="center" sx={{ marginTop: 8 }}>
            <GridCardsWatchedMovies moviesWatchedData={savedMovies}/>
          </Box>
          {
            (savedMovies[0].imdbID === "") && // In case it has no saved movie
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
    </div>
  )
}

export default LibraryPage