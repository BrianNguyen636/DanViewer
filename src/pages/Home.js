import {react, useState, useEffect} from 'react'

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

export default function Home() {
    const [response, setResponse] = useState({});
  const [loading, setLoading] = useState(true);
  // const [ratingString, setRatingString] = useState('G,');
  const [page, setPage] = useState(1);

  useEffect(()=> {
      getResponse('rating:' + 'g,', 1).then(
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

  const searchbar = () => {
    return (
      <div id='searchbar'>
        <input type='text' id='searchBarText' className='form-text' placeholder='Enter up to two tags, space separated'></input>
        <button className='btn btn-secondary' 
          onClick={()=>submitSearch(document.getElementById("searchBarText").value)}>Search</button>
          <div id='checkboxes'>
            <div><input type='checkbox' defaultChecked="true" onChange={(e)=>setG(e.target.checked)}></input> General</div>
            <div><input type='checkbox' onChange={(e)=>setS(e.target.checked)}></input> Sensitive</div>
          </div>
          <div id='checkboxes'>
            <div><input type='checkbox' onChange={(e)=>setQ(e.target.checked)}></input> Questionable </div>
            <div><input type='checkbox' onChange={(e)=>setE(e.target.checked)}></input> Explicit </div>
          </div>
      </div>
    )
  }
  const [g, setG] = useState(true);
  const [s, setS] = useState(false);
  const [q, setQ] = useState(false);
  const [e, setE] = useState(false);

  function submitSearch(tags, page = 1){
    setLoading(true);
    let str = '';
    if (g) str+= 'g,';
    if (s) str+= 's,';
    if (q) str+= 'q,';
    if (e) str+= 'e';
    // console.log(str);
    getResponse('rating:' + str + " " + tags, page)
      .then((response) => {
        if (response.length > 0) {
          setResponse(response);
          setPage(page);
        } else {
          alert("No results found!")
        }
        setLoading(false);
        // console.log(response);
      })
  }


  function Modal(post) {
    let artists = post.tag_string_artist.split(" ");
    let series = post.tag_string_copyright.split(" ");
    let chars = post.tag_string_character.split(" ");
    let tagstring = post.tag_string_general.split(" ");
    // console.log(series);
    if (post.file_ext == 'mp4') {

    } 
    return (
        <div className='card' id='modal'>
            <div className='card' id='imageCard'>
                <img id="modalImg" alt ='' src={post.large_file_url}></img>
            </div>
            <a className='btn btn-secondary'href={post.file_url} target="_blank" id='viewButton'>View Original</a>
            <hr></hr>
            <div id='tags'>
              {tagList('Artist', artists)}
              <hr></hr>
              {tagList('Series', series)}
              <hr></hr>
              {tagList('Character', chars)}
              <hr></hr>
              {tagList('Tags', tagstring)}
            </div>
        </div>
    );
  }
  function tagList(label, tags) {
    return (
      <div className='tagList'>
        <h5>{label}</h5>
        {tags.map((e)=>{
            return(<button className='btn btn-primary' key={e} 
              onClick={()=>{
                setModalOpen(false);
                document.getElementById("searchBarText").value = e;
                submitSearch(e);
              }}>{e}</button>)
        })}
      </div>
    );
  }
  
  function getPage(page) {
    submitSearch(document.getElementById("searchBarText").value, page);
    setPage(page);
  }

  function NavBar() {
    return (
        <div id='navbar'>
            <ul className="pagination" id='navButtons'>
                <li className="page-item">
                    <button className="page-link" disabled={page <= 1} onClick={()=>getPage(page-1)}>&laquo;</button>
                </li>
                <li className="page-item" onClick={()=>{}}>
                    <button className="page-link">{page}</button>
                </li>
                {/* <li className="page-item">
                    <a className="page-link" href="/">2</a>
                </li> */}
                <li className="page-item">
                    <button className="page-link" onClick={()=>getPage(page+1)}>&raquo;</button>
                </li>
            </ul>
        </div>
    );
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
            {loading && <h1 id='loadingText'>LOADING...</h1>}
      </div>
      {modalOpen && Modal(openedPost)}
      {!loading && NavBar()}
    </div>
  );
}