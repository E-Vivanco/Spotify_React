//import logo from './logo.svg';
//import './App.css';
import { useRef, useState ,useEffect} from 'react';
import './styles.css'

function App() {

  const [song, setSong] = useState([
    {"id":1,"categoria":"Wild","name":"Alligator","url":"./assets/audio/alligator.mp3"},
    {"id":1,"categoria":"Wild","name":"Bison","url":"./assets/audio/bison.mp3"},
    {"id":1,"categoria":"Wild","name":"Cobra","url":"./assets/audio/cobra.mp3"},
    {"id":1,"categoria":"Wild","name":"Elefant","url":"./assets/audio/Elefant.mp3"},
    {"id":1,"categoria":"Wild","name":"Leopardo","url":"./assets/audio/Leopard-1.mp3"},
  ])

  let audioRef = useRef();
  const selectAudio = audio => {
    audioRef.current.src = audio;
  }
 /* useEffect(() => {
      audioRef.current.type.name='Leopardo';
    
  }, [])*/
  const captValor = () => {
    console.log(audioRef.current.type.value);
    return (audioRef.current.type.value);
  }
  return (
    <>
      <div className='titulo'><h2 className='my-2 py-2'>Spotify-React</h2></div>
      <div className=" card d-flex w-100 flex-column">
        {
          song.map((aud, index) => {
            return (
              <div className="songs my-1 w-100" key={index}>
                <audio  controls>
                <source className="base w-100" src={aud.url} type="audio/ogg" onClick={() => selectAudio(aud.url)+ captValor(aud.name)} />
                 </audio>
              </div>
              
            )
          })
        }
      </div> 
      <div className='botones d-flex flex-row'>
      <div><i class="inv fa-solid fa-play my-3"></i></div>  
      <div><i class="fa-solid fa-pause my-3 "></i></div>
      <div><i class="der fa-solid fa-play my-3"></i></div>
      </div>     
    </>
  );
}

export default App;

