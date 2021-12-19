import styled from 'styled-components'
import rickmorty from '../images/rickmorty.png'

function HomeScreen() {
  return (
    <HomeContainer>
      <HomeImage src={rickmorty} alt='image of rick and morty' />
    </HomeContainer>
  )
}

export default HomeScreen

const HomeContainer = styled.div`
  display: flex;
  justify-content: center;
`

const HomeImage = styled.img`
  display: flex;
  justify-content: center;
  max-width: 80vw;
  transition: transform 750ms;
  &:hover {
    transform: translateY(-30px);
  }
`
