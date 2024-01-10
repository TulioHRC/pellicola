import React, { useEffect, useState } from 'react'
import { TextField, Box, Grid, Card, CardContent, Typography, Button } from '@mui/material'
import CSSnavBarButtonsSelect from '../utils/CSSfunctions';
import "../styles/Components/MainPage.css"


function MainPage() {
  const [searchInput, setSearchInput] = useState('');
  const [movies, setMovies] = useState({"Search": []});

  const searchData = async (changedInputValue: string) => {
    
    setSearchInput(changedInputValue);

    try {
      const data = await fetch(`https://www.omdbapi.com/?s=${changedInputValue}&apikey=${process.env.REACT_APP_OMDb_API_KEY}`);
      if(data.ok) {
        setMovies(await data.json());
      }
      else console.error('Error with api data: ', data.statusText)
    } catch(error) {
      console.error('Error making fetch: ', error);
    }
  } 

  const handleSaveMovie = async (event: any, movieJSONstrinfyed: string) => {
    event.preventDefault(); // Prevents it from reloading the page

    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: movieJSONstrinfyed
      })

      if(res.ok) console.log('Data sent!')
      else console.error('Error while sending: ', res.statusText)
    } catch(error) { 
      console.error('Error while fetching: ', error)
    }

    setSearchInput(""); // Resets the search input
    searchData("");
  }

  useEffect(() => {
    CSSnavBarButtonsSelect(true);
  })

  return (
    <div>
      <br />
      <div id="searchInputBox">
        <Box display="flex" justifyContent="center" sx={{ marginTop: 8 }}>
          <TextField type="text" id="searchInput" value={searchInput} onChange={(event: any) => searchData(event.target.value)} variant="outlined" 
            placeholder="Search..." sx={{width: "300px" }}/>
        </Box>
      </div>
      <br />
      <ul>
        {
          movies.Search &&
          movies.Search.map((movie: {"imdbID": string;}) => {
            return(
              <li id={movie['imdbID']} key={movie['imdbID']}>
                <h1>{JSON.stringify(movie)}</h1>
                <form onSubmit={((event: any) => handleSaveMovie(event, JSON.stringify(movie)))} >
                  <button name="save">Save to library</button>
                </form>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
}

export default MainPage