import './App.css';
import Paint from './components/Paint'
import Name from './components/Name'

function App() {
  return (
    <div className="App">
      <header><Name /></header>
      <main><Paint /></main>
    </div>
  )
}

export default App;
