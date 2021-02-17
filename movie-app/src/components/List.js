import React, { useEffect, useState } from 'react';

import {Link} from 'react-router-dom';

import Movie from './Movie';


const List = () =>{
  const [list ,setList] = useState([]);

  useEffect(()=>{
      getList('http://localhost:8000/api/movies/')
  }, []);
  const getList = async (API)=> {
    const listResp = await fetch(API);
    const listR = await listResp.json();
    console.log(listR)
    setList(listR.results);
  }

    return(<>
      
      <div className="movie-container">
        {list.map(item=> (
        <Movie key={item.id} {...item}/>
        ))}


      </div>
      </>

    );

};

export default List;
