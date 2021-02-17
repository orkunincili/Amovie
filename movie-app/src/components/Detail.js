import React, { useEffect, useState }from 'react';
import {RiNetflixFill,RiHome3Line} from "react-icons/ri";
import {SiImdb} from "react-icons/si";
import {BsDot} from "react-icons/bs";
import {GrAdd} from "react-icons/gr";
import axios from 'axios';
import '../Detail.css';
const IMG_API = "https://image.tmdb.org/t/p/w1280";
const IMG_URL ="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80";
const IMDB = "https://www.imdb.com/title/"
function Detail (props) {

  const [movie ,setMovie] = useState([]);
  const {id} = props.match.params || "";

  const getMovie = async (id) =>{
    try{
      const data = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=API_KEY`);
      setMovie(data.data)[]
      console.log(data.data);
    }catch(e){
      console.log(e)
    }
  };
  useEffect(()=>{
    getMovie(id);

  },[]);

  function addList () {

    const m ={

        title: movie.title,
        backdrop_path: movie.backdrop_path,
        homepage: movie.homepage || "",
        imdb_id: movie.imdb_id || "",
        overview: movie.overview,
        runtime: movie.runtime,
        release_date: movie.release_date,
        tagline: movie.tagline || "",
        vote_average: movie.vote_average,
        genres:[]
    };

    movie.genres.map(genre=>(
      m['genres'].push(genre['id']),
      axios.post(`http://127.0.0.1:8000/api/genres`, genre)
        .then(res => {
            console.log(res.data);

        })

    ))



    axios.post(`http://127.0.0.1:8000/api/movies/`, m)
      .then(res => {
          console.log(res.data);

      })


  };

  function Genre(list){
        var i="";
        var genres=[];
        for (i in movie.genres) {
            genres.push(movie.genres[i]['name']);

        }
        genres=genres.join(",")
        return genres
  }
  function HomePage(home_page){

    var home = String(home_page)

    if(home.match('netflix')){

        return(<div style={{color:'red'}} onClick={()=> window.open(home, "_blank")}>
          <RiNetflixFill size={32}/>

        </div>);

    }else{
      return(<div style={{color:'white'}} onClick={()=> window.open(home, "_blank")}>
        <RiHome3Line size={36}/>

      </div>);

    }




  }
    return(

        <div>
              <div className="backdrop" style={{backgroundImage:`url('${IMG_API + movie.backdrop_path}')`}}>
                  <div className="shadow"></div>
              </div>
              <div className="movie-detail-container">
                  <div className="poster">
                          <img src={movie.poster_path ? (IMG_API + movie.poster_path):IMG_URL} alt={movie.title}/>

                  </div>
                  <div className="movie-infos">
                      <h2 className="tagline">"{movie.tagline}"</h2>
                      <h2 className="title">{movie?.movie_name || movie?.movie_title || movie?.title || movie?.original_title}</h2>

                      <div className="subtext">
                        <p>{Genre()}</p>
                        <BsDot/>
                        <p>{movie.runtime} min</p>
                        <BsDot/>
                        <p>{movie.vote_average}</p>
                      </div>
                      <p>{movie.overview}</p>
                      <div className="icons">
                        <div>
                          {HomePage(movie.homepage)}
                        </div>
                        <div onClick={()=> window.open(IMDB+movie.imdb_id, "_blank")}>
                          <SiImdb size={32}/>
                        </div>
                        <button className="add-button" onClick={()=>addList()}>Add list</button>

                      </div>

                  </div>
              </div>



          </div>


    );

};

export default Detail;
