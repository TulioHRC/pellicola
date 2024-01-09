import React, { useEffect, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  const [searchInput, setSearchInput] = useState('');
  const [movies, setMovies] = useState({"Search": []});

  const searchData = async (changedInputValue: string) => {
    setSearchInput(changedInputValue);

    try {
      const data = await fetch(`https://www.omdbapi.com/?s=${changedInputValue}&apikey=${process.env.REACT_APP_OMDb_API_KEY}`)
      if(data.ok) {
        setMovies(await data.json())
      }
      else console.error('Error with api data: ', data.statusText)
    } catch(error) {
      console.error('Error making fetch: ', error);
    }
  } 

  const handleSaveMovie = async (event: any, movieJSONstrinfyed: string) => {
    event.preventDefault(); // Prevents it from reloading the page

    try {
      const res = await fetch(`${process.env.BACKEND_URL}/api`, {
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

  return (
    <div>
        <h2>Main Page</h2>
        <input type="text" id="searchInput" value={searchInput} onChange={(event) => { searchData(event.target.value) }} />
        <br />
        <Link to="/library">Library</Link>
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