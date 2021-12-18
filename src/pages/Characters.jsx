import styled from 'styled-components'
import CardInfo from '../components/MoreInfoCard'


function Characters({
  char,
  name,
  species,
  image,
  gender,
  status,
  onAddToFavourites,
  isFavouriteCharacters,
}) {
  const charHuman = species !== 'Alien'

  return (
    <section>
      <CharCard species={charHuman}>
        <CharName>{name}</CharName>
        <CharImage src={image} />
        <CardInfo gender={gender} status={status} species={species} />
        <span onClick={() => onAddToFavourites(char)}>
          {isFavouriteCharacters(char) ? 'yes' : 'no'}
        </span>

      </CharCard>
    </section>
  )
}
export default Characters

// Styling

const CharCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  background: ${(props) => (props.species ? '#cb8a7c' : '#add652')};
  border-radius: 5px;
  margin: 10px 20px 25px 20px;
  padding: 10px 20px 10px 20px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`

const CharImage = styled.img`
  width: 80vw;
  border-radius: 5px;
  margin: 1rem;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`

const CharName = styled.h2`
  text-align: center;
`
