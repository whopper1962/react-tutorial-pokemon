import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialUrl = 'https://pokeapi.co/api/v2/pokemon';

  const [loading, setLoading] = useState(true);

  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);

  // getData
  const fetchPokemonData = async (url) => {
    const result = await getAllPokemon(url);
    setNextUrl(result.next);
    setPrevUrl(result.previous);
    loadPokemon(result.results);
    setLoading(false);
  };

  // created
  useEffect(() => {
    fetchPokemonData(initialUrl);
  }, []);

  // get details
  const loadPokemon = (data) => {
    Promise.all(
      data.map((elem) => {
        return getAllPokemon(elem.url);
      })
    ).then((res) => {
      setPokemonData(res);
    });
  };

  const handlePrevPage = () => {
    if (!prevUrl) return;
    setLoading(true);
    fetchPokemonData(prevUrl);
    setLoading(false);
  };

  const handleNextPage = () => {
    if (!nextUrl) return;
    setLoading(true);
    fetchPokemonData(nextUrl);
    setLoading(false);
  };

  return (
    <>
      <Navbar/>
      <div className="App">
        { loading ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              { pokemonData.map((data, index) => {
                return (
                  <Card
                    key={index}
                    pokemon={data}
                  />
                );
              }) }
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>Prev</button>
              <button onClick={handleNextPage}>Next</button>
            </div>
          </>
        ) }
      </div>
    </>
  );
}

export default App;
