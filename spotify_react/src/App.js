
import { useRef, useState,useEffect } from 'react';
import './styles.css'

function App () {

  const [song, setSong] = useState([
    { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
    { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
    { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"},
    ])
let a,b
    console.log("soy todas las canciones",song)
  const [pos, setPos] = useState(0);
  console.log("soy pos:", pos)
  const [audio] = useState( 
    typeof Audio !== "undefined" && new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3"),
    typeof Audio !== "undefined" && new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/hurry-starman.mp3"),
    typeof Audio !== "undefined" && new Audio("https://assets.breatheco.de/apis/sound/files/mario/songs/overworld.mp3"),
  )
  //typeof Audio !== "undefined" && new Audio("songURL+song[pos].url")); 
  //this will prevent rendering errors on NextJS since NodeJs doesn't recognise HTML tags neither its libs.
  const [isPlaying, setIsPlaying] = useState(false);
  //console.log("soy la cancion:",song[0].url)
  const songURL = "https://assets.breatheco.de/apis/sound/";
  let audioRef = useRef();
  let botonizRef = useRef();
  let botonderRef = useRef();
  let botoncenRef = useRef();
  console.log("soy audioref", audioRef)
  console.log("soy boton iz",botonizRef)
  console.log("soy boton der",botonderRef)
  console.log("soy boton cen",botoncenRef)
  
  const selectAudio = (audio,pos) => {
    if(audioRef.current)
    {audioRef.current.src= audio.url
     //audio.url = true
    setPos(pos)}
  
  }
  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);
 // const [play,setPlay] = useState(false)
 
  
//function playS(a=1){
//  setPlay(
//  {play:true},
//  {pause:false}
//  )
//}
//
//function pauseS(b=0){
//  setPlay(
//    {pause: true},
//    {play: false}
//  )
//}

  return (
    <>
      <div className='titulo'><h2 className='my-2 py-2'>Spotify-React</h2></div>
      <div className=" card d-flex w-100 flex-column">
        {
          song.length > 0 ?
          song.map((aud, index1) => {
            return (
              <div className="songs my-1 w-100" key={index1}>
                <audio  controls>
        
                <source className="base w-100" src={ songURL + song[index1].url} ref={audioRef} type="audio/mpeg" onClick={() => selectAudio(aud, pos)}/>         
                 </audio>
                 
              </div>
              
            )
           
          })
          : song
        }
      </div> 
      <div className='botones d-flex flex-row'> 
      <source ref={audioRef} src={songURL + song[pos].url} type="audio/mpeg" onClick={() => audio.play()}/> 
      <button  ref={botonizRef} className=" bot_izq my-1 inv fa-solid fa-play" src={songURL + song[pos].url} onClick={() => setPos(pos => pos === 0 ? song.length - 1 : pos - 1)+ audio.play()}></button>
      <button ref={botoncenRef}src={songURL + song[pos].url} onClick={() => setPos(pos => pos === song.length - 1 ? 0 : pos + 1)+ audio.pause()} className={"bot_der my-1 der fa-solid fa-play fa-2x " +('click' ? "bot_paus my-1 fa-solid fa-pause fa-1x" : null  )}>
      </button> 
      <button ref={botonderRef} className=" bot_der my-1 der fa-solid fa-play"src={songURL + song[pos].url} onClick={() => setPos(pos => pos === song.length - 1 ? 0 : pos + 1)+ audio.play()}></button> 
       </div>     
    </>
  );
}

export default App;






















/*
import { useRef, useState ,useEffect} from 'react';
import './styles.css'

function App() {

  const [song, setSong] = useState([
    { "id":1, "category":"game", "name":"Mario Castle", "url":"files/mario/songs/castle.mp3" },
    { "id":2, "category":"game", "name":"Mario Star", "url":"files/mario/songs/hurry-starman.mp3"},
    { "id":3, "category":"game", "name":"Mario Overworld", "url":"files/mario/songs/overworld.mp3"},
    ])
  const [pos, setPos] = useState(0);
  //console.log("soy la cancion:",song[0].url)
  const songURL = "https://assets.breatheco.de/apis/sound/";
  let audioRef = useRef();
  const selectAudio = (audio,pos) => {
    audioRef.current.src = audio.url;
    setPos(pos)
   // audioRef.current.name= audio;
   // audioRef.current.url= audio
  }
 /* useEffect(() => {
      audioRef.current.type.name='Leopardo';
    
  }, [])*/
 /* const captValor = () => {
    console.log(audioRef.current.type.value);
    return (audioRef.current.type.value);
  }
  return (
    <>
      <div className='titulo'><h2 className='my-2 py-2'>Spotify-React</h2></div>
      <div className=" card d-flex w-100 flex-column">
        {
          song.length > 0 ?
          song.map((aud, index) => {
            return (
              <div className="songs my-1 w-100" key={index}>
                <audio  controls>
        
                <source className="base w-100" src={aud.url} ref={audioRef} type="audio/mpeg" onClick={() => selectAudio(aud, index)}/>
                <source ref={audioRef} src={songURL + song[pos].url}/>
                
                 </audio>
                 
              </div>
              
            )
           
          })
          : song
        }
      </div> 
      <div className='botones d-flex flex-row'>
      <button className=" bot_izq my-1 inv fa-solid fa-play" ref={audioRef} onClick={() => selectAudio(songURL, song[setPos(pos => pos === 0 ? song.length - 1 : pos - 1)].url)}></button>
      <button className=" bot_paus my-1 fa-solid fa-pause" ref={audioRef} onClick={() => selectAudio( songURL, song[setPos(pos => pos === song.length - 1 ? 0 : pos + 1)].url)}></button> 
      <button className=" bot_der my-1 der fa-solid fa-play" ref={audioRef} onClick={() => selectAudio( songURL, song[setPos(pos => pos === song.length - 1 ? 0 : pos + 1).url])}></button> 
      </div>     
    </>
  );
}

export default App;*/

