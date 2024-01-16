import React, { useEffect, useState } from 'react'
import { TextField, Box, Grid, Card, CardContent, Typography, Button, CardMedia, Backdrop } from '@mui/material'
import LoadingScreen from './LoadingScreen';
import BasicSnackbar from './BasicSnackbar';
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import getMovieFromOmbdAPI from '../utils/getMovieFromOmdbAPI';

function MainPage() { 
  const [searchInputText, setSearchInputText] = useState('');
  const [movies, setMovies] = useState({"Search": []});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isMovieAlreadySavedFound, setIsMovieAlreadySavedFound] = useState(false);
  const [movieSavedSnackBarActive, setMovieSavedSnackBarActive] = useState(false);

  const searchAPIData = async (changedInputTextValue: string) => {
    setIsLoading(true);
    setSearchInputText(changedInputTextValue);

    try {
      const data = await fetch(`https://www.omdbapi.com/?s=${changedInputTextValue}&apikey=${process.env.REACT_APP_OMDb_API_KEY}`);
      if(data.ok)
        setMovies(await data.json());
      else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch(error) {
      console.error('Error while fetching: ', error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }
  
  const isMovieAlreadySaved = async (movieToSave: {"imdbID": ""}) => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
      if(data.ok) {
        const dataJSON = await data.json();
        for(let i = 0; i < dataJSON.length; i++)
          if(dataJSON[i].imdbID == movieToSave.imdbID) 
            return true;
      } else {
        console.error('Error with data: ', data.statusText);
        throw new Error(data.statusText);
      }
    } catch (error) { 
      console.error('Error while fetching: ', error);
      setIsError(true);
    } 
    return false;
  }

  const saveMovie = async (movieImdbID: string) => {
    try {
      const movie = await getMovieFromOmbdAPI(movieImdbID, `${process.env.REACT_APP_OMDb_API_KEY}`);
      if(movie.imdbID == movieImdbID){
        const movieJSONstringfyed = await JSON.stringify(movie);
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json'},
          body: movieJSONstringfyed
        })
  
        if(res.ok) setMovieSavedSnackBarActive(true);
        else {
        console.error('Error with data sent: ', res.statusText);
        throw new Error(res.statusText);
        } 
      } else {
        console.error('Error with data sent: ', movie.statusText);
        throw new Error(movie.statusText);
      }
    } catch(error) { 
      console.error('Error while fetching: ', error)
      setIsError(true);
    }
  }

  const handleSaveMovie = async (event: any, movieJSONstrinfyed: string) => {
    setIsLoading(true);
    event.preventDefault(); // Prevents it from reloading the page

    if(await isMovieAlreadySaved(await JSON.parse(movieJSONstrinfyed)) == true) // Restrictive
      setIsMovieAlreadySavedFound(true);
    else {
      const movieJSON = await JSON.parse(movieJSONstrinfyed);
      await saveMovie(movieJSON.imdbID);
    } 

    setSearchInputText(""); // Resets the search input
    searchAPIData("");
    setIsLoading(false);
  }

  useEffect(() => {
    CSSnavBarButtonsSelect(true);
  })

  const AlreadySavedBackdrop = () => {
    return(
      <Backdrop open={isMovieAlreadySavedFound} onClick={(event: any) => {if (event.target === event.currentTarget) setIsMovieAlreadySavedFound(false);}}>
        <Box backgroundColor="white" padding={2} borderRadius={8} display="flex" flexDirection="column" alignItems="center">
          <Typography variant="h6" color="textPrimary" gutterBottom>
            This movie is already saved in your library.
          </Typography>
          <Box display="flex" justifyContent="center" marginTop={2}>
            <Button variant="contained" color="primary" sx={{ marginRight: 2 }} onClick={() => setIsMovieAlreadySavedFound(false)}>
              Ok
            </Button>
          </Box>
        </Box>
      </Backdrop>
    )
  }

  const GridCardsMovies = ({moviesData}: { moviesData: {"Search": []}}) => {
    return (
      <Grid container spacing={3}>
        {moviesData.Search &&
          moviesData.Search.map((movie: { imdbID: string; Title: string; Year: string, Poster: string }) => (
            <Grid item key={movie.imdbID} xs={12} sm={6} md={4} lg={4}>
              <Card>
                <CardContent>
                  <CardMedia component="img" height="340" image={movie.Poster} alt={movie.Title}/>
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

  return (
    <div>
      <AlreadySavedBackdrop />
      <BasicSnackbar isVariable={movieSavedSnackBarActive} severity="success" message="Movie saved!" setIsVariable={setMovieSavedSnackBarActive} />
      <BasicSnackbar isVariable={isError} severity="error" message="An error had occured! Try again later..." setIsVariable={setIsError} />
      
      <br />
      <div id="searchInputBox">
        <Box display="flex" justifyContent="center" sx={{ marginTop: 8 }}>
          <TextField type="text" id="searchInput" value={searchInputText} onChange={(event: any) => searchAPIData(event.target.value)} variant="outlined" 
            placeholder="Search..." autoComplete="off" sx={{width: "300px" }}/>
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
    </div>
  );
}

export default MainPage