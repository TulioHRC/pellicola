import React, { useEffect, useState } from 'react'
import { Typography, IconButton, Box, Grid, Card, CardContent, Button, CardMedia } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff';
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import LoadingScreen from './LoadingScreen';
import "../styles/Components/LibraryPage.css"


function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([{"imdbID": ""}]);
  const [isLoading, setIsLoading] = useState(false);

  const getSavedMovies = async () => {
    setIsLoading(true);
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
      if(data.ok) {
        const data2 = await data.json();
        setSavedMovies(data2);}
      else console.error('Error with the data: ', data.statusText);
    } catch (error) { 
      console.error('Error while fetching server: ', error);
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
      else console.error('Error with data: ', data.statusText);
    } catch(error) {
      console.error('Error while fetching: ', error);
      setIsLoading(false);
      // await Error message
    } finally {
      setIsLoading(false);
    }

    getSavedMovies(); // Updates library
  } 

  useEffect(() => {
    setIsLoading(true);
    CSSnavBarButtonsSelect(false);

    getSavedMovies();
    setIsLoading(false);
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
                    <Button type="submit" variant="outlined" color="primary" sx={{color: "red", borderColor: "red"}}>
                      Delete Watched Movie
                    </Button>
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
        isLoading ?
        <LoadingScreen /> :
        <div>
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