import React, { useEffect, useState } from 'react'
import { Grid, Card, CardContent, Typography, Button, CardMedia } from '@mui/material'
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import "../styles/Components/LibraryPage.css"


function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([{"imdbID": ""}]);

  const getSavedMovies = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
      if(data.ok) {
        const data2 = await data.json();
        setSavedMovies(data2);}
      else console.error('Error with the data: ', data.statusText);
    } catch (error) { 
      console.error('Error while fetching server: ', error);
    }
  }

  const handleDeleteWatchedMovie = async (event: any, movieJSONstrinfyed: string) => {
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
    }

    getSavedMovies(); // Updates library
  } 

  useEffect(() => {
    CSSnavBarButtonsSelect(false);

    getSavedMovies();
  });

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
        <GridCardsWatchedMovies moviesWatchedData={savedMovies}/>
    </div>
  )
}

export default LibraryPage