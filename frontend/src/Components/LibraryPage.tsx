import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([{"imdbID": ""}]);

  useEffect(() => {
    const getSavedMovies = async () => {
      try {
        const data = await fetch('/api');
      if(data.ok) setSavedMovies(await data.json());
      else console.error('Error with the data: ', data.statusText);
      } catch (error) { 
        console.error('Error while fetching server: ', error);
      }
    }

    getSavedMovies();
  });

  const handleDeleteWatchedMovie = async (event: React.FormEvent<HTMLFormElement>, movieJSONstrinfyed: string) => {
    event.preventDefault(); // Prevents it from reloading the page

    try {
      const data = await fetch('/api', {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: movieJSONstrinfyed
      });

      if(data.ok) console.log('Watched Movie deleted!');
      else console.error('Error with data: ', data.statusText);
    } catch(error) {
      console.error('Error while fetching: ', error);
    }
  }

  return (
    <div>
        <h2>Library</h2>
        <Link to="/">Main</Link>
        <ul>
          {
            savedMovies.map((movie) => {
              return (
                <li id={movie.imdbID} key={movie.imdbID}>
                  <h3>{JSON.stringify(movie)}</h3>
                  <form onSubmit={((event) => handleDeleteWatchedMovie(event, JSON.stringify(movie)))}>
                    <button name='delete'>Delete Watched Movie</button>
                  </form>
                </li>
              )
            })
          }
        </ul>
    </div>
  )
}

export default LibraryPage