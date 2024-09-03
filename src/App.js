import './App.css';
import './bootstrap.min.css'
// import SearchBar from './components/searchbar';
import {react, useState, useEffect} from 'react'
import NavBar from './components/navbar';
import Modal from './components/modal';

const LOGIN = 'avianbot';
const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

async function getResponse(tagstring, page) {
    let url = 'https://danbooru.donmai.us/posts.json?'+
    'page=' + page +'&limit=12&tags=' + tagstring
    +'&login='+LOGIN+'&api_key='+KEY;
    
    let response = await fetch(url,
        {method:"GET", mode:"cors"}
    )
    return await response.json();
}

function App() {
  const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState('G,');
  const [page, setPage] = useState(1);

  useEffect(()=> {
      getResponse('rating:' + rating, 1).then(
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

  const PostCard = (post)=> {
    return (
          <div className = "card border-primary mb-3" id ='card' onClick={()=>{openModal(post)}} >
              <div className='card-body'>
                  <img src={post.preview_file_url} alt=''></img>
              </div>
              <div className='card-footer'>{post.tag_string_artist}</div>
          </div>

    );
  }

  const [modalOpen, setModalOpen] = useState(false);
  const [openedPost, setOpenedPost] = useState('');

  function openModal(post) {
    if (!modalOpen) {
      setModalOpen(true);
      setOpenedPost(post);
    } 
  }

  const [tagString, setTagString] = useState("");

  const searchbar = () => {
    return (
      <div id='searchbar'>
        <input type='text' className='form-text' onChange={(e)=>{setTagString(e.target.value)}} placeholder='Enter up to two tags, space separated'></input>
        <button className='btn btn-primary' 
          onClick={()=>submitSearch()}>Search</button>
          <div id='checkboxes'>
            <div><input type='checkbox' defaultChecked="true"></input> General</div>
            <div><input type='checkbox'></input> Sensitive</div>
          </div>
          <div id='checkboxes'>
            <div><input type='checkbox'></input> Questionable </div>
            <div><input type='checkbox'></input> Explicit </div>
          </div>
      </div>
    )
  }
  function submitSearch(){
    setLoading(true);
    getResponse('rating:' + rating + " " + tagString, 1)
      .then((response) => {
        setLoading(false);
        console.log(response);
        
        if (response.length > 0) {
          setResponse(response);
          setPage(1);
        } else {
          alert("No results found!")
        }
      })
  }

  return (
    <div className="App">
      {modalOpen && 
        <div id='modalBackdrop' onClick={
          ()=>{if (modalOpen) setModalOpen(false)}
        }></div>}
    
      <h1>DanViewer</h1>
      <hr></hr>
      {searchbar()}
      <hr></hr>
      <div id='feed'>
            {!loading && postFeed(response)}
      </div>
      {modalOpen && <Modal {...openedPost}></Modal>}
      <NavBar></NavBar>
    </div>
  );
}

export default App;
