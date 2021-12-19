import styled from 'styled-components'

function EpisodeCard({
  // id,
  name,
  air_date,
  episode_no,
  episode_chracters,
}) {
  // const episodeName = episode_chracters
  // console.log(episodeName)

  return (
    <section>
      <Episode>
        <EpisodeName>{name}</EpisodeName>
        <InfoList>
          <li>Number: {episode_no}</li>
          <li>On Air since: {air_date}</li>
          <li>{episode_chracters}</li>
        </InfoList>
      </Episode>
    </section>
  )
}

export default EpisodeCard

const Episode = styled.div`
  color: var(--light);
  display: flex;
  align-items: center;
  flex-direction: column;
  position: relative;
  background: #b9404f;
  border-radius: 5px;
  margin: 10px 20px 25px 20px;
  padding: 10px 20px 10px 20px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2);
`

const EpisodeName = styled.h2`
  text-align: center;
  font-size: 1.4rem;
`

const InfoList = styled.ul`
  font-family: inherit;
  font-size: 0.9rem;
  text-align: center;
  list-style: none;
  margin: 1rem;
`
