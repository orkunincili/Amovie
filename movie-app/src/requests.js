
const API_KEY="8b4b0174722bbea08c34b312c86a7586";

const urls={

   FEATURED_API:`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`,
   IMG_API :`https://image.tmdb.org/t/p/w1280`,
   SEARCH_API :`https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&query=`
}


export default 'requests';
