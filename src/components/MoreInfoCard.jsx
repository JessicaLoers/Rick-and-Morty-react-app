import styled from 'styled-components'
import { useState } from 'react'

function CardInfo({ gender, status, species }) {
  const [cardVisibility, setCardVisibilty] = useState(false)

  const charHuman = species !==  "Alien"

  //console.log(species)

  function toggleCard() {
    setCardVisibilty(!cardVisibility)
  }

function isAlive (status) {

  let isLiveString = ""

  switch (status) {
  case "Alive":
    isLiveString = "Yeah, I'm alive"
  break;
  case "unknown":
    isLiveString = "Nobody knows, if I'm still alive"
  break;
  case "Dead":
    isLiveString =  "Sorry, I'm dead"
  break;
}
return isLiveString 
}


  function CardVis({ cardVisibility }) {
    const cardClass = cardVisibility ? '' : 'hidden'
    return (
      <InfoList className={cardClass}>
        <li>Species: {species}</li>
        <li>Gender: {gender}</li>
        <li>{isAlive(status)}</li>
      </InfoList>
    )
  }

  const buttonText = cardVisibility
    ? ' show less about me'
    : ' show more about me'

  return (
    <InfoCard>
      <Button species={charHuman} onClick={toggleCard}>{buttonText}</Button>
      <CardVis cardVisibility={cardVisibility} />
    </InfoCard>
  )
}
export default CardInfo

const InfoCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fcfcfc81;
  width: 80vw;
  border-radius: 5px;
  margin: 10px 20px 25px 20px;
  padding: 10px 20px 10px 20px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`

const Button = styled.button`
  background: ${(props) => props.species ? "#cb978d": "#add652"};
  font-family: inherit;
  font-size: 1.2rem;
  font-weight: bold;
  color: #085763;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);

  &:hover {
    background: ${(props) => props.species ? "#b57c71": "#8aac41"};
    color: ${(props) => props.species ? "#80564d": "#748f3b"};
  }
`

const InfoList = styled.ul`
  font-family: inherit;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  list-style: none;
  margin: 1rem;
`

// const MoreInfo = styled.ul `
//   display: none;
// `
