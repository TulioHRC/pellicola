import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function MainPage() {
  const [movies, setMovies] = useState({});

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

  return (
    <div>
        <h2>Main Page</h2>
        <input type="text" id="searchInput" onChange={searchData} />
        <br />
        <Link to="/library">Library</Link>
        <ul>
          {
            JSON.stringify(movies)
          }
        </ul>
    </div>
  );
}

export default MainPage