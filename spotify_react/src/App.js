
import { useRef, useState, useEffect } from 'react';
import './styles.css'

function App () {

  const [songs, setSongs] = useState([]) // arreglo vacio para contener canciones x medio de la consulta fetch
  const [isPlaying, setPlaying] = useState(false); // setemos en estado false el play
  const [isLoading, setIsLoading] = useState(true); // indicador de carga de consulta fetch
  const [activaSong,setactivaSong] =useState(''); // controolamos cada cancion que se activa
 
  const songURL = "https://assets.breatheco.de/apis/sound/";
  let audioRef = useRef(); //sacamos referencia del audio
  let posRef = useRef();// sacamos refenecia de la posicion

  const avanzaBoton = (avanza) => {  // funcion que nos permite avanzar con boton de play
    if (audioRef.current) {
      audioRef.current.pause();
    }
  
    if (avanza === 'backward') {
      if (posRef.current > 0) {
        posRef.current--;
      } else {
        posRef.current = songs.length - 1;
      }
    } else if (avanza === 'forward') {
      if (posRef.current < songs.length - 1) {
        posRef.current++;
      } else {
        posRef.current = 0;
      }
    }
  
    const activaSong = songs[posRef.current];//asignamos una posicion a la cancion
   //console.log(activaSong)
    const allUrl = songURL + activaSong.url; //enviamos toda la url de play
    //console.log(allUrl)
    const otroAudio = new Audio(allUrl);  //creamos nuevo audio
    //console.log(otroAudio)
    otroAudio.play(); //creamos nuevo audio
    //console.log(otroAudio.play())
    audioRef.current = otroAudio; //pasamos referencia a nuevo audio 
   // console.log("soy todas las canc:",songs)
    setactivaSong(activaSong.id+' '+activaSong.name);
 //   console.log("lista de lector",setactivaSong(activaSong.id+' '+activaSong.name))
    setPlaying(true);//estado de play activado
  };
  
  const PlayBoton = () => {   // funcion que controla la activacion o detencion de cancion seleccionada
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
    setPlaying(!isPlaying);
  };
  

const cancionClick = (name, url) => {  // rescatamos de la refencia los datos de la cancion mas la url para pintar tabla y
  if (audioRef.current) {         // se activa cada cancion de la tabla al hacer click
    audioRef.current.pause();
  }

  const allUrl = songURL + url;
  //console.log(allUrl)
  const otroAudio = new Audio(allUrl);
  //console.log(otroAudio)
  otroAudio.play();
  //console.log(otroAudio.play())
  audioRef.current = otroAudio;
  setactivaSong(name); // capturamos el nombe de la cancion activada
  //console.log(setactivaSong(name))
  setPlaying(true);
  posRef.current = songs.findIndex((song) => song.url === url);
  //console.log(posRef.current)
};

useEffect(() => {     //hooks que realiza la consulta fetch y setea la data en setSongs
  const recuperaSongs = async ()=>{
   try{
     const response =  await fetch("https://assets.breatheco.de/apis/sound/songs");
     const info2= await response.json();
           setSongs(info2);
           setIsLoading(false);//  carga finalizada
       }catch(error){
         console.log(error);
       }       
     }
     recuperaSongs()

     }, []);

 // se pinta la tabla de canciones con formato previa mente definido en style junto con los botones
  return (
    <>
      <div className='titulo'><h2 className='py-2 mx-5 w-50'>Spotify-React</h2></div>
      <div className=" card d-flex w-100 flex-column">
              <div>
                <table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titulo</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {songs.map((song) => (
                            <tr className="song" key={song.url} onClick={() => cancionClick(song.name, song.url)}>
                                <td>{song.id}</td>
                                <td>{song.name}</td>
                                <td>{song.url}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
          
      </div> 
      
      <div className='botones d-flex flex-row'>
      
            <button className="btn btn-dark m-2" onClick={() => avanzaBoton('backward')}><i className="fa-solid fa-backward"></i></button>
            <button className="btn btn-dark m-2" onClick={PlayBoton}>{isPlaying ? <i className="fa-solid fa-pause"></i> : <i className="fa-solid fa-play"></i>}</button>
            <button className="btn btn-dark m-2" onClick={() => avanzaBoton('forward')}><i className="fa-solid fa-forward"></i></button>
            <div className="song m-4">{activaSong}</div>
             
        </div>
             
           
    </>
  );
}

export default App;

