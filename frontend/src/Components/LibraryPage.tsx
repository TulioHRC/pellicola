import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const getSavedMovies = async () => {
      try {
        const data = await fetch('api');
      if(data.ok) setSavedMovies(await data.json())
      else console.error('Error with the data: ', data.statusText)
      } catch (error) { 
        console.error('Error while fetching server: ', error)
      }
    }

    getSavedMovies();
  })

  return (
    <div>
        <h2>Library</h2>
        <Link to="/">Main</Link>
        <ul>
          {
            savedMovies.map((movie) => {
              return <h1>{JSON.stringify(movie)}</h1>
            })
          }
        </ul>
    </div>
  )
}

export default LibraryPage