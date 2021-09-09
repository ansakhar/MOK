import React, {useState, useEffect} from 'react'
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import axios from 'axios';
import './App.css';




//******************** MoviesList **********************
function MoviesList() {
  const [movies, setMovies] = useState([]) 
  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=603e62528453c34a5e4037ae303defc8&append_to_response=videos')
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        setTimeout(() => {
           alert(`Can't load movies.`)
        }, 3000);
      })
  }, [])


  if (movies.length === 0) {
    return(
      <div style={{flex: 1, padding: 20}}>
        <p>Loading, please wait...</p>
      </div>
    )
  } else {
      const movieItems = movies.map((movie,index) =>
        <MovieItem key={index} movie={movie}/>
      );
  
    return(
      <div style={{flex: 1, padding: 20}}>
        {movieItems}
      </div>
    )
  }
}


//******************** MovieItem **********************
function MovieItem(props) {

  Modal.setAppElement('#root');

  //require('default-passive-events');

  const [movie, setMovie] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

useEffect(() => {
  axios
    .get('https://api.themoviedb.org/3/movie/'+props.movie.id+'?api_key=603e62528453c34a5e4037ae303defc8&append_to_response=videos')
    .then(response => {
      setMovie(response.data)
    })
}, [props.movie.id])

const videoOnReady = (event) => {
  // access to player in all event handlers via event.target
  console.log("videoOnReady", event);
  event.target.pauseVideo();
}

const videoPressed = (event) => {
  event.preventDefault();
  console.log("videoPressed", event);
  setIsOpen(true);
}

function closeModal(event) {
  event.preventDefault()
  //console.log("closeModal");
  setIsOpen(false);
}

let IMAGEPATH = 'http://image.tmdb.org/t/p/w500'
let imageurl = IMAGEPATH + props.movie.poster_path;

// get genres
var genres = "";  
if (movie !== undefined && movie.genres !== undefined) {
  for (var i=0;i<movie.genres.length;i++) {
    genres += movie.genres[i].name+" ";
  }
}

// get first youtube video
var video = "";
var videoLink ="";
if (movie !== undefined && movie.videos !== undefined && movie.videos.results !== undefined) {
  video = <span id="v" style={{color:'blue', cursor:'pointer'}} onClick={(e) => videoPressed(e)}>{movie.videos.results[0].name}</span>
  videoLink = movie.videos.results[0].key
}

  return(
    
    <div className="Movie">
    <img src={imageurl} alt="poster"></img>
    <p className="MovieTitle">{props.movie.original_title} : {props.movie.release_date}</p>
      <p className="MovieText">{props.movie.overview}</p>
      <span className="GenresText">Genres: {genres}</span><br/>
      <span className="VideosText">Video: {video}</span>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Movie's video Modal"
      >
        <YouTube videoId={videoLink} opts={opts} onReady={(e) => videoOnReady(e)} />
      </Modal>
    </div>
  )
}

//********************     App    **********************
function App() {
  return (
    <div className="App">
      <MoviesList/>
    </div>
  );
}

export default App;
