import './App.css';
import './bootstrap.min.css'
import SearchBar from './components/searchbar';
import Feed from './components/feed';


function App() {


  return (
    <div className="App">
      <h1>DanViewer</h1>
      <hr></hr>
      <SearchBar></SearchBar>
      <hr></hr>
      <Feed/>
    </div>
  );
}

export default App;
