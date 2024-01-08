import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  const [movies, setMovies] = useState({"Search": []});

  const searchData = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const data = await fetch(`https://www.omdbapi.com/?s=${event.target.value}&apikey=${process.env.REACT_APP_OMDb_API_KEY}`)
      if(data.ok) {
        setMovies(await data.json())
      }
      else console.error('Error with api data: ', data.statusText)
    } catch(error) {
      console.error('Error making fetch: ', error);
    }
  }

  const handleSaveMovie = async (event: React.FormEvent<HTMLFormElement>, movieJSON: string) => {
    event.preventDefault() // Prevents it from reloading the page

    try {
      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: movieJSON
      })

      if(res.ok) console.log('Data sent!')
      else console.error('Error while sending: ', res.statusText)
    } catch(error) { 
      console.error('Error while fetching: ', error)
    }
  }

  return (
    <div>
        <h2>Main Page</h2>
        <input type="text" id="searchInput" onChange={searchData} />
        <br />
        <Link to="/library">Library</Link>
        <ul>
          {
            movies.Search &&
            movies.Search.map((movie) => {
              return(
                <li id={movie['imdbID']} key={movie['imdbID']}>
                  <h1>{JSON.stringify(movie)}</h1>
                  <form onSubmit={((event) => handleSaveMovie(event, JSON.stringify(movie)))} >
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