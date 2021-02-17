import React, { useEffect, useState }from 'react';

import {Link} from 'react-router-dom';

import Movie from './Movie';
import Detail from './Detail';
import Newest from './Newest';

const FEATURED_API="https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8b4b0174722bbea08c34b312c86a7586&page=1";
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = "https://api.themoviedb.org/3/search/movie?&api_key=8b4b0174722bbea08c34b312c86a7586&query="

const Home = () =>{
  const [movies ,setMovies] = useState([]);
  const [searchTerm, setSearchTerm] =useState("");
  useEffect(()=>{
      getMovies(FEATURED_API)
  }, []);
  const getMovies = async (API)=> {
    const moviessResp = await fetch(API);
    const moviesR = await moviessResp.json();
    console.log(moviesR)
    setMovies(moviesR.results);
  }
  const handleOnSubmit = (e) =>{
    e.preventDefault();

    if(searchTerm){
      getMovies(SEARCH_API + searchTerm)
      setSearchTerm('');
    }



  };
  const handleOnChange = (e) =>{
    setSearchTerm(e.target.value);

  }
    return(<>
      <header>
      <div className="menu">
        <p>Home</p>
        <p>List</p>
      </div>
        <form onSubmit={handleOnSubmit}>
          <input className="search"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}/>
        </form>
      </header>
      <Newest/>
      <h3>Movies</h3>
      <div className="movie-container">
        {movies.map(movie=> (
        <Movie key={movie.id} {...movie}/>
        ))}


      </div>
      </>

    );

};

export default Home;
