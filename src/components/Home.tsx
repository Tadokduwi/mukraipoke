import axios from "axios"
import React from "react";
import { Link } from "react-router-dom";
// import PokeAPI from "pokedex-promise-v2"
import { Pokemon} from "../Interface/pokemon.interface"
import ScrollToTop from 'react-scroll-to-top';



const Home = () => {

// 
  // const [poke, setPoke] = React.useState<Array<PokemonURL>>([])
  const [pokemonsData, setPokemonsData] = React.useState<Array<Pokemon>>([]);

  //Pagination
  const [, setDisplayPokemons] = React.useState<Array<Pokemon>>([])

  //Search
  const [searchQuery, setSearchQuery] = React.useState('')

  const fetchData = async () => {
    const results = await Promise.all(
      Array(800)
        .fill(null)
        .map((_, i) => axios.get(`${import.meta.env.VITE_API}/pokemon/${i + 1}`))
    )
    const pokemonData = results.map((res) => res.data)
    setPokemonsData(pokemonData)
    setDisplayPokemons(pokemonData.slice(0, 9))
  }

  React.useEffect(() => {
    fetchData();
  }, []);

  const getData = async () => {
    await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=800`)
      .then((res) => {
        console.log(res.data.results[0]);
        // setPoke(res.data.results)

      })
  }

  React.useEffect(() => {
    getData()
  }, [])


  //FilteredPokemon
  const filteredPokemons = pokemonsData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())

  )

  //
  //Pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      const newCurrentPage = currentPage - 1;
      const startIndex = (newCurrentPage - 1) * 12;
      const endIndex = startIndex + 12;
      setDisplayPokemons(pokemonsData.slice(startIndex, endIndex));
      setCurrentPage(newCurrentPage);
    }
  };

  const handleNext = () => {
    const totalPages = Math.ceil(pokemonsData.length / 12);
    if (currentPage < totalPages) {
      const newCurrentPage = currentPage + 1;
      const startIndex = (newCurrentPage - 1) * 12;
      const endIndex = startIndex + 12;
      setDisplayPokemons(pokemonsData.slice(startIndex, endIndex));
      setCurrentPage(newCurrentPage);
    }
  };

  return (
    <div className="">
      <div>
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><a>Homepage</a></li>
                <li><a >Portfolio</a></li>
                <li><a href="/about">About</a></li>
              </ul>
            </div>
          </div>
          <div className="navbar-center">
            <a href="/" className="btn btn-ghost text-xl">MUKRAI POKEMON</a>
          </div>
          <div className="navbar-end">
            <div className="pl-">
              <input
                className="input input-bordered w-40 text-center "
                type="text"
                placeholder="Search Pokemon"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div role="tablist" className="tabs tabs-bordered">
        <a role="tab" className="tab" onClick={handlePrevious}>Page {currentPage - 1}</a>
        <a role="tab" className="tab tab-active">Page {currentPage}</a>
        <a role="tab" className="tab" onClick={handleNext}>Page {currentPage + 1}</a>
      </div>
      <div className="grid grid-cols-3 gap-4 flex ">
        {filteredPokemons.slice((currentPage - 1) * 12, currentPage * 12).map((pokemon) => (
          <div className="" key={pokemon.name}>
            <Link to={`https://www.youtube.com/shorts/SXHMnicI6Pg`}>
              <div className="card w-96 glass flex flex-col rounded-lg shadow-md w-full m-20 overflow-hidden sm:w-72 hover:translate-y-1 " >
                <figure><img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name} /></figure>
                <div className="card-body">
                  <p>#{pokemon.id}</p>
                  <h2 className="card-title">{pokemon.name}</h2>
                  <h1 className="">{pokemon.types.map((type) => type.type.name).join(', ')}</h1>
                  {/* <h1>{pokemon.url}</h1> */}
                </div>
              </div>
            </Link>
          </div>
        ))}
        {/* Scroll To Top import มา  */}
        <ScrollToTop smooth className="btn btn-circle btn-outline animate-bounce" />
      </div>
    </div>
  )
}

export default Home
