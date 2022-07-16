import React, { useEffect, useState } from 'react'

import {Typography, TextField, Button, FormGroup, Checkbox, FormControlLabel} from '@mui/material'
import {Container} from '@mui/material';

import './DysisOptions.css'

import {DysisRequest} from '../contentScript/DysisRequest';

export const DysisOptions = (): JSX.Element => {

  const [participant, setParticipant] = useState({
    name: '',
    installationDate: '',
    agreedToTerms: false,
    submitted: true,
  });

  useEffect(() => { 
    chrome.storage.local.get([
      "dysisParticipantName",
      "dysisInstallationDate",
      "dysisParticipantAgreedToTerms",
      "dysisParticipantSubmitted"
    ], (res) => {
      setParticipant({
        name: res.dysisParticipantName,
        installationDate: res.dysisInstallationDate,
        agreedToTerms: res.dysisParticipantAgreedToTerms,
        submitted: res.dysisParticipantSubmitted,
      })
  })}, []);
  

  const handleChange = (event) => {
    setParticipant({ ...participant, [event.target.name]: event.target.value });
  };

  const canSubmit = () => {
    return (participant.agreedToTerms && participant.name !== '' && !participant.submitted);
  }

  const handleSubmit = () => {
    console.log('Submitted')
    setParticipant({ ...participant, submitted: true})
    chrome.storage.local.set({
      dysisParticipantName: participant.name,
      dysisParticipantAgreedToTerms: participant.agreedToTerms,
      dysisParticipantSubmitted: true,
    });
    DysisRequest.post(
      'tracking/create',
      {
        "participantName": participant.name,
      }
    )
  }
  
  const toggleButton = () => {
    setParticipant({ ...participant, agreedToTerms: (participant.agreedToTerms ? false : true)})
  }

  return (
    <React.Fragment>
      <Container maxWidth="lg">
      <Typography variant="h1" component="h1">Dysis</Typography>
      <Typography variant="h2" component="h2">Study Participation</Typography>
      <FormGroup>
        <TextField id="form-participant-input-name" label="Participant name" variant="standard" value={participant.name} disabled={participant.submitted} onChange={handleChange} name="name"/>
        <FormControlLabel label ="Agree to study terms" control={<Checkbox checked={participant.agreedToTerms} disabled={participant.submitted} onChange={toggleButton} />}></FormControlLabel>
        <Button id="form-participant-button" onClick={handleSubmit} disabled={!canSubmit()}>Submit</Button>
      </FormGroup>
      </Container>
    </React.Fragment>
  )
}
