import React from 'react';
import { AiFillPlusSquare as Add } from "react-icons/ai";
import axios from 'axios';
import {Link} from 'react-router-dom';
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const IMG_URL ="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80";
const setVoteClass = (vote) =>{
  if(vote >=8){
    return "green";
  }else if(vote>=6){
    return "orange";
  }else{
    return "red";
  }
};



const Movie = ({title,poster_path,overview,vote_average,id,},props) =>{
  const addList =async (id)=> {
    const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=8b4b0174722bbea08c34b312c86a7586`);
    const m ={

          title: data.data.title,
          backdrop_path: data.data.backdrop_path || "",
          poster_path:data.data.poster_path || "",
          homepage: data.data.homepage || "",
          imdb_id: data.data.imdb_id || "",
          overview: data.data.overview || "",
          runtime: data.data.runtime || 0,
          release_date: data.data.release_date || "",
          tagline: data.data.tagline || "",
          vote_average: data.data.vote_average || 0.0,
          genres:[]
    };
    console.log(m)

    data.data.genres.map(genre=>(
      m['genres'].push(genre['id']),
      console.log(genre),
      axios.post(`http://127.0.0.1:8000/api/genre`, genre)
        .then(res => {
            console.log(res.data);

        })

    ))
    axios.post(`http://127.0.0.1:8000/api/movies/`, m)
      .then(res=>{
        console.log(res.data)
      })



  };

  return(
    <div className="movie">
          <img src={poster_path ? (IMG_API + poster_path):IMG_URL} alt={title}/>

          <div className="movie-info">
            <h3>{title}</h3>
            <span className={`tag  ${setVoteClass(vote_average)}`}>
              {vote_average}
            </span>
          </div>

          <div className="movie-over">
              <h2>Overview</h2>
              <p>{overview}</p>
              <Link to={{
                pathname:`movie/${id}`,
                data:id
              }} style={{ textDecoration: 'none' }}><p className="see-detail">See detail...</p></Link>
              <p className="add-list" onClick={()=>addList(id)}>Add list</p>
          </div>
    </div>

  );
};

export default Movie;
