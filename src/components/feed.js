import {useState, React, useEffect} from 'react';
import PostCard from './postCard';
import NavBar from './navbar';
import './feed.css'

const LOGIN = 'avianbot';
const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

async function getResponse(params) {
    let page = 1;
    let url = 'https://danbooru.donmai.us/posts.json?'+
    'page=' + page +'&limit=12'
    +'&login='+LOGIN+'&api_key='+KEY;
    
    let response = await fetch(url,
        {method:"GET", mode:"cors"}
    )
    return await response.json();
}

//THE LIST OF POST CARDS
function postFeed(data){
    return (
        <div id='list'>
            {data.map((post) => {
                return(<div key = 'id'><PostCard {...post}/></div>)
            })}
        </div>
    )
}

function openModal() {
    console.log("Open Modal");
    // if (modalOpen) {
    //     setModalOpen(false);
    // } else setModalOpen(true);
}

export default function Feed() {

    const [response, setResponse] = useState({});
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState({});

    useEffect(()=> {
        getResponse().then(
            (response) => {
                setLoading(false);
                setResponse(response);
            }
        )
    },[]);

    return (
        <div id='feed'>
            {/* Posts: {response.length} */}
            {!loading && postFeed(response)}
            <NavBar></NavBar>
        </div>

    );
}
