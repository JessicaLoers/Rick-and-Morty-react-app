import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --primary:#063F47;
  --light : #fcfcfc;
}

body {
  font-family: 'Poppins', sans-serif;
  background-color:#e4a1e8;
  color: var(--primary);
}



h2 {
  font-size: 2rem;
}


.hidden {
  /* visibility: hidden; */
  display: none;
}

`;
