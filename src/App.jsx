import Characters from './pages/Characters'
import Favourites from './pages/Favourites'
import RickMorty from './images/Rick_And_Morty.svg'
import styled from 'styled-components'
import { Link, NavLink, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from './lib/localStorage'


function App() {

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        const allCharacters = data.results.slice(0, 10).map((character) => ({
          id: character.id,
          name: character.name,
          species: character.species,
          image: character.image,
          gender: character.gender,
          status: character.status,
          origin: character.origin.name,
          location: character.location.name,
        }))

        setCharacters(allCharacters)
      })
  }, [])

  const localStorageFavouriteCharacters = loadFromLocal('_isFavouriteCharacters')
  const [favouriteCharacters, setFavouriteCharacters] = useState(
    localStorageFavouriteCharacters ?? [])

  useEffect(() => {
    saveToLocal('_favouriteCharacters', favouriteCharacters);
  }, [favouriteCharacters]);


  const localStorageCharacters = loadFromLocal('_characters');
  const [characters, setCharacters] = useState( localStorageCharacters ??[])

  useEffect(() => {
    saveToLocal('_characters', characters);
  }, [characters]);


  function isCharacterInListOfFavourites(favouriteCharacterToAdd) {
    return favouriteCharacters.some(
      (everyFavouriteProduct) =>
        everyFavouriteProduct.id === favouriteCharacterToAdd.id
    );
  }

  function removeCharacterFromListOfFavourites(character) {
    return favouriteCharacters.filter(
      (everyFavouriteProduct) => everyFavouriteProduct.id !== character.id
    );
  }

  function addToFavourites(favouriteCharacterToAdd) {
    if (isCharacterInListOfFavourites(favouriteCharacterToAdd)) {
      const favouritesToKeep = removeCharacterFromListOfFavourites(
        favouriteCharacterToAdd
      );
      setFavouriteCharacters(favouritesToKeep);
    } else {
      setFavouriteCharacters([...favouriteCharacters, favouriteCharacterToAdd]);
    }
  }


console.log(isCharacterInListOfFavourites(characters))



  return (
    <div className='App'>
      {/* header --> Characters und Favs, Home  */}

      <header>
        <Link to='/home'>
          <RickMortyLogo
            src={RickMorty}
            alt='Title Treatment from Rick and Morty©'
          />
        </Link>
        
        <NavLink to='characters'>Characters</NavLink>
        <NavLink to='favourites'>Favourites</NavLink>
    
      </header>

<Routes>
<Route path="characters" element={characters.map((char) => (
        <Characters
          char={char}
          key={char.id}
          id={char.id}
          name={char.name}
          species={char.species}
          image={char.image}
          gender={char.gender}
          status={char.status}
          origin={char.origin}
          location={char.location}
          onAddToFavourites={addToFavourites}
          isFavouriteCharacters={isCharacterInListOfFavourites}
        />
      ))} />



<Route path="favourites" element={
<Favourites
/>}/>


</Routes>      

    </div>


  )
}


<>

  </>






export default App

const RickMortyLogo = styled.img`
  size: 10px;
  margin: 2rem;
`
