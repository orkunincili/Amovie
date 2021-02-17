import React,{useState,useEffect} from 'react';
import axios from 'axios';
import '../Newest.css';
import {BsDot} from "react-icons/bs";


const IMG_API = "https://image.tmdb.org/t/p/w1280";
const Newest =()=>{
      const [newest,setNewest]=useState([]);

      function getNewest(){
        axios.get("http://localhost:8000/api/movies/newest/")
        .then(res=>{
          setNewest(res.data);
          console.log(res.data);
        })
      };
      useEffect(()=>{
          getNewest();
      }, []);


      return(
        <div>
          <div className="backdrop-poster">
            <img id="newest-backdrop-img" src={IMG_API+newest.backdrop_path}/>
            <div className="shadow"></div>
          </div>
          <div className="newest-info">
              <h1>{newest.title}</h1>
              <div>
                <span>{newest.runtime} min</span>
                <BsDot/>
                <span>{newest.vote_average}</span>
              </div>
              <div className="newest-buttons">
                  <button>See detail</button>
                  <button>IMDb page</button>
              </div>
          </div>


        </div>
      );


}
export default Newest;
