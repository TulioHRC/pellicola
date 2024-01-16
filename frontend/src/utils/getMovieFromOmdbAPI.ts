const getMovieFromOmbdAPI = async (imdbID: string, apikey: string) => {
    try {
        const data = await fetch(`https://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${apikey}`);
        console.log(data)
        if(data.ok)
            return (await data.json());
        else{
          console.error('Error with data: ', data.statusText);
          throw new Error(data.statusText);
        }
      } catch(error) {
        throw new Error('Error while fetching OMDB API: '+ error);
      }
}

export default getMovieFromOmbdAPI;