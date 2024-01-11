import React, { useEffect, useState } from 'react'
import { TextField, Box, Grid, Card, CardContent, Typography, Button, CardMedia, Alert, Backdrop } from '@mui/material'
import LoadingScreen from './LoadingScreen';
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import "../styles/Components/MainPage.css"


function MainPage() { 
  const [searchInput, setSearchInput] = useState('');
  const [movies, setMovies] = useState({"Search": []});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMovieAlreadySavedFound, setIsMovieAlreadySavedFound] = useState(false);

  const searchData = async (changedInputValue: string) => {
    setIsLoading(true);
    setSearchInput(changedInputValue);

    try {
      const data = await fetch(`https://www.omdbapi.com/?s=${changedInputValue}&apikey=${process.env.REACT_APP_OMDb_API_KEY}`);
      if(data.ok) {
        setMovies(await data.json());
      }
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch(error) {
      console.error('Error making fetch: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  const isMovieAlreadySaved = async (movie: {"imdbID": ""}) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
      if(data.ok) {
        const dataJSON = await data.json();
        console.log(movie);
        console.log(JSON.stringify(dataJSON));
        for(let i = 0; i < dataJSON.length; i++)
          if(dataJSON[i].imdbID === movie){
            console.log("oi")
            return true;
          }
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch (error) { 
      console.error('Error while fetching server: ', error);
      setIsError(true);
    } finally {
      return false;
    }
  }

  const handleSaveMovie = async (event: any, movieJSONstrinfyed: string) => {
    setIsLoading(true);
    if(await isMovieAlreadySaved(await JSON.parse(movieJSONstrinfyed))){ // Restrictive
      setIsMovieAlreadySavedFound(true);
      return;
    }
    event.preventDefault(); // Prevents it from reloading the page

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: movieJSONstrinfyed
      })

      if(res.ok) console.log('Data sent!')
      else {
        console.error('Error with data sent: ', res.statusText);
        throw new Error(res.statusText);
      }
    } catch(error) { 
      console.error('Error while fetching: ', error)
      setIsError(true);
    } finally {
      setSearchInput(""); // Resets the search input
      searchData("");
      setIsLoading(false);
    }
  }

  useEffect(() => {
    CSSnavBarButtonsSelect(true);
  })

  const GridCardsMovies = ({moviesData}: { moviesData: {"Search": []}}) => {
    return (
      <Grid container spacing={3}>
        {moviesData.Search &&
          moviesData.Search.map((movie: { imdbID: string; Title: string; Year: string, Poster: string }) => (
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
                  <form onSubmit={(event: any) => handleSaveMovie(event, JSON.stringify(movie))}>
                    <Button type="submit" variant="outlined" color="primary">
                      Save to library
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    )
  }

  const AlreadySavedBackdrop = () => {
    return(
      <Backdrop open={isMovieAlreadySavedFound} onClick={(event: any) => {if (event.target === event.currentTarget) setIsMovieAlreadySavedFound(false)}}>
        <Box backgroundColor="white" padding={2} borderRadius={8} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" color="textPrimary" gutterBottom>
            This movie is already saved in your library.</Typography>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => setIsMovieAlreadySavedFound(false)}>
              ok</Button>
          </Box>
        </Box>
      </Backdrop>
    )
  }

  return (
    <div>
      <AlreadySavedBackdrop />
      <br />
      <div id="searchInputBox">
        <Box display="flex" justifyContent="center" sx={{ marginTop: 8 }}>
          <TextField type="text" id="searchInput" value={searchInput} onChange={(event: any) => searchData(event.target.value)} variant="outlined" 
            placeholder="Search..." sx={{width: "300px" }}/>
        </Box>
      </div>
      {
        isLoading ?
        <LoadingScreen /> :
        <div>
          <br />
          <GridCardsMovies moviesData={movies}/>
        </div>
        
      }
      {
        isError &&
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="30vh">
          <Alert severity='error' position="flex" justifyContent="center">
            An error had occured! Try again later...
          </Alert>
        </Box>
      }
    </div>
  );
}

export default MainPage