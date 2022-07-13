import React from 'react'
import { createRoot } from 'react-dom/client'
import './options.css'

import {Typography, TextField} from '@mui/material'
import {Container} from '@mui/material';

const App = (): JSX.Element => {
  return (
    <React.Fragment>
      <Container maxWidth="lg">
      <Typography variant="h1" component="h1">Dysis</Typography>
      <Typography variant="h2" component="h2">Study Participation</Typography>
      <form>
        <TextField id="standard-basic" label="Participant name" variant="standard" />
      </form>
      </Container>
    </React.Fragment>
  )
}

const container = document.createElement('div')
document.body.appendChild(container)
const root = createRoot(container)
root.render(<App />)
