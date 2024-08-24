import './App.css';
import SearchBar from './components/searchbar';
import Feed from './components/feed';


function App() {


  return (
    <div className="App">
      <h1>DanViewer</h1>
      <hr></hr>
      <SearchBar></SearchBar>
      <Feed/>
    </div>
  );
}

export default App;
