import React, { useEffect, useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import "../styles/Components/LibraryPage.css"

function LibraryPage() {
  const [savedMovies, setSavedMovies] = useState([{"imdbID": ""}]);

  const getSavedMovies = async () => {
    try {
      const data = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api`);
    if(data.ok) setSavedMovies(await data.json());
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

    getSavedMovies(); // Updates list
  } 

  useEffect(() => {
    // Basic CSS change of NavBar buttons styles
    const mainPageButton = document.getElementById("mainPageButton");
    const libraryPageButton = document.getElementById("libraryPageButton");
    if(mainPageButton && libraryPageButton){
      mainPageButton.style.textDecoration = "none";
      libraryPageButton.style.textDecoration = "underline";
    };

    getSavedMovies();
  });

  return (
    <div>
        <h2>Library</h2>
        <Link to="/">Main</Link>
        <ul>
          {
            (savedMovies[0].imdbID != "")  && // Prevents it from showing non-relevant data
            savedMovies.map((movie: any) => {
              return (
                <li id={movie.imdbID} key={movie.imdbID}>
                  <h3>{JSON.stringify(movie)}</h3>
                  <form onSubmit={((event: any) => handleDeleteWatchedMovie(event, JSON.stringify(movie)))}>
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