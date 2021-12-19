import HomeScreen from './pages/Home'
import Characters from './pages/Characters'
import EpisodeCard from './pages/Episodes'
import RickMorty from './images/Rick_And_Morty.svg'
import styled from 'styled-components'
import { Link, NavLink, Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { loadFromLocal, saveToLocal } from './lib/localStorage'

function App() {
  const localStorageEpisodes = loadFromLocal('_Episodes')
  const [episodes, setEpisodes] = useState(localStorageEpisodes ?? [])

  //---> Episodes <----

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/episode/')
      .then((response) => response.json())
      .then((data) => {
        const allEpisodes = data.results.map((episode) => ({
          id: episode.id,
          name: episode.name,
          air_date: episode.air_date,
          epsiode_no: episode.episode,
          episode_characters: episode.characters,
        }))
        setEpisodes(allEpisodes)
      })
  }, [])

  useEffect(() => {
    saveToLocal('_Episodes', episodes)
  }, [episodes])

  const ChractersInEpisodes = episodes.map((character) => {
    return character
  })

  console.log(ChractersInEpisodes)

  //---> Characters / Favourites <----

  const localStorageCharacters = loadFromLocal('_characters')
  const [characters, setCharacters] = useState(localStorageCharacters ?? [])

  const localStorageFavouriteCharacters = loadFromLocal(
    '_isFavouriteCharacters'
  )
  const [favouriteCharacters, setFavouriteCharacters] = useState(
    localStorageFavouriteCharacters ?? []
  )

  useEffect(() => {
    fetch('https://rickandmortyapi.com/api/character')
      .then((response) => response.json())
      .then((data) => {
        const allCharacters = data.results.map((character) => ({
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

  useEffect(() => {
    saveToLocal('_favouriteCharacters', favouriteCharacters)
  }, [favouriteCharacters])

  useEffect(() => {
    saveToLocal('_characters', characters)
  }, [characters])

  function isCharacterInListOfFavourites(favouriteCharacterToAdd) {
    return favouriteCharacters.some(
      (everyFavouriteProduct) =>
        everyFavouriteProduct.id === favouriteCharacterToAdd.id
    )
  }

  function removeCharacterFromListOfFavourites(character) {
    return favouriteCharacters.filter(
      (everyFavouriteProduct) => everyFavouriteProduct.id !== character.id
    )
  }

  function addToFavourites(favouriteCharacterToAdd) {
    if (isCharacterInListOfFavourites(favouriteCharacterToAdd)) {
      const favouritesToKeep = removeCharacterFromListOfFavourites(
        favouriteCharacterToAdd
      )
      setFavouriteCharacters(favouritesToKeep)
    } else {
      setFavouriteCharacters([...favouriteCharacters, favouriteCharacterToAdd])
    }
  }

  function setupCharacter(char) {
    return (
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
    )
  }

  // --> Return <--

  return (
    <div className='App'>
      <header>
        <Link to='/home'>
          <RickMortyLogo
            src={RickMorty}
            alt='Title Treatment from Rick and Morty©'
          />
        </Link>
        <NavBar>
          <StyledLink to='characters'><NavBarLink>Characters</NavBarLink></StyledLink>
          <StyledLink to='favourites'><NavBarLink>Favourites</NavBarLink></StyledLink>
          <StyledLink to='episodes'><NavBarLink>Episodes</NavBarLink></StyledLink>
        </NavBar>
      </header>

      <Routes>
      <Route
          path='home'
          element={<HomeScreen />}
        />
        <Route
          path='characters'
          element={characters.map((char) => setupCharacter(char))}
        />

        <Route
          path='favourites'
          element={favouriteCharacters.map((char) => setupCharacter(char))}
        />

        <Route
          path='episodes'
          element={episodes.map((episode) => (
            <EpisodeCard
              episode={episode}
              key={episode.id}
              id={episode.id}
              name={episode.name}
              air_date={episode.air_date}
              episode_no={episode.epsiode_no}
              episode_chracters={episode.characters}
            />
          ))}
        />
      </Routes>
    </div>
  )
}

export default App

const RickMortyLogo = styled.img`
  size: 10px;
  margin: 2rem;
`
const NavBar = styled.ul `
display: flex;
flex-direction: row;
justify-content: center;
margin: 1rem;
padding: 1rem;
`

const NavBarLink = styled.li `
list-style: none;
margin: 1rem;
padding: 0.5rem 0.7rem;
border-radius: 5px;
background-color: #157887;
font-size: 1.2rem;
color: var(--light);
box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

&:hover {
  background-color: #11B0C8;
}
`

const StyledLink = styled(NavLink)`
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;