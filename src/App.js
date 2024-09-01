import './App.css';
import './bootstrap.min.css'
import SearchBar from './components/searchbar';
import {react, useState, useEffect} from 'react'
import NavBar from './components/navbar';
import Modal from './components/modal';

const LOGIN = 'avianbot';
const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

async function getResponse() {
    let page = 1;
    let url = 'https://danbooru.donmai.us/posts.json?'+
    'page=' + page +'&limit=12&tags=rating:G'
    +'&login='+LOGIN+'&api_key='+KEY;
    
    let response = await fetch(url,
        {method:"GET", mode:"cors"}
    )
    return await response.json();
}

function App() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
      getResponse().then(
          (response) => {
              setLoading(false);
              setResponse(response);
          }
      )
  },[]);

  //THE LIST OF POST CARDS
  function postFeed(data){
    return (
        <div id='list'>
            {data.map((post) => {
                return(<div key = {post.id}>{PostCard(post)}</div>)
            })}
        </div>
    )
  }

  const clicked = () => {
    console.log("Clicked");
    openModal();
  }

  const PostCard = (post)=> {
    return (
        <div>
            <div className = "card border-primary mb-3" id ='card' onClick={clicked} >
                <div className='card-body'>
                    <img src={post.preview_file_url} alt=''></img>
                </div>
                <div className='card-footer'>{post.tag_string_artist}</div>
            </div>
        </div>

    );
  }

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    if (!modalOpen) {
      setModalOpen(true);
    } 
  }

  return (
    <div className="App">
      {modalOpen && 
        <div id='modalBackdrop' onClick={
          ()=>{if (modalOpen) setModalOpen(false)}
        }></div>}
    
      <h1>DanViewer</h1>
      <hr></hr>
      <SearchBar></SearchBar>
      <hr></hr>
      <div id='feed'>
            {!loading && postFeed(response)}
      </div>
      {modalOpen && <Modal></Modal>}
      <NavBar></NavBar>
    </div>
  );
}

export default App;
