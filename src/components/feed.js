import {useState, React, useEffect} from 'react';
import PostCard from './postCard';
import NavBar from './navbar';
import './feed.css'

// const LOGIN = 'avianbot';
// const KEY = 'TekDM7Yef4WALQmM5sE28b4G'

// async function getResponse() {
//     let page = 1;
//     let url = 'https://danbooru.donmai.us/posts.json?'+
//     'page=' + page +'&limit=12'
//     +'&login='+LOGIN+'&api_key='+KEY;
    
//     let response = await fetch(url,
//         {method:"GET", mode:"cors"}
//     )
//     return await response.json();
// }

// //THE LIST OF POST CARDS
// function postFeed(data){
//     return (
//         <div id='list'>
//             {data.map((post) => {
//                 return(<div key = 'id'><PostCard {...post}/></div>)
//             })}
//         </div>
//     )
// }


export default function Feed() {

    // const [response, setResponse] = useState({});
    // const [loading, setLoading] = useState(true);

    // useEffect(()=> {
    //     getResponse().then(
    //         (response) => {
    //             setLoading(false);
    //             setResponse(response);
    //         }
    //     )
    // },[]);

    // return (
    //     <div id='feed'>
    //         {!loading && postFeed(response)}
    //         <NavBar></NavBar>
    //     </div>

    // );
}
