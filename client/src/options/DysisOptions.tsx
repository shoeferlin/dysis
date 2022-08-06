import React, { useEffect, useState } from 'react'

import {
  Typography,
  TextField,
  Button,
  FormGroup,
  Checkbox,
  FormControlLabel,
  Container,
  Grid,
  Box,
  Modal
} from '@mui/material'

import {DysisRequest} from '../DysisRequest';

export const DysisOptions = (): JSX.Element => {

  const [participant, setParticipant] = useState({
    firstName: '',
    lastName: '',
    id: null,
    agreedToTerms: false,
    submitted: false,
    installationDate: 'string',
  });

  useEffect(() => {
    chrome.storage.local.get([
      'dysisParticipantFirstName',
      'dysisParticipantLastName',
      'dysisParticipantID',
      'dysisParticipantAgreedToTerms',
      'dysisParticipantSubmitted',
      'dysisInstallationDate',
    ], (res) => {
      setParticipant({
        firstName: res.dysisParticipantFirstName,
        lastName: res.dysisParticipantLastName,
        id: res.dysisParticipantID,
        agreedToTerms: res.dysisParticipantAgreedToTerms,
        submitted: res.dysisParticipantSubmitted,
        installationDate: res.dysisInstallationDate,
      })
  })}, []);

  const handleChange = (event: any) => {
    setParticipant({ ...participant, [event.target.name]: event.target.value });
  };

  const canSubmit = () => {
    return (
      participant.agreedToTerms 
      && participant.firstName !== '' 
      && participant.lastName !== ''
      && !participant.submitted);
  }

  const handleSubmit = async ()  => {
    const response = await DysisRequest.post(
      'tracking/create',
      {
        'participantFirstName': participant.firstName.trim(),
        'participantLastName': participant.lastName.trim(),
        'participantAgreedToTerms': participant.agreedToTerms,
        'participantSubmitted': true,
        'participantInstallationDate': participant.installationDate,
      }
    )
    setParticipant({ ...participant, submitted: true});
    if (response) {
      chrome.storage.local.set({
        dysisParticipantFirstName: participant.firstName.trim(),
        dysisParticipantLastName: participant.lastName.trim(),
        dysisParticipantID: response.data.participantID,
        dysisParticipantAgreedToTerms: participant.agreedToTerms,
        dysisParticipantSubmitted: true,
      });
    }
    handleOpen();
  }

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false);
  }
  
  const toggleButton = () => {
    setParticipant({ ...participant, agreedToTerms: (participant.agreedToTerms ? false : true)})
  }

  return (
    <React.Fragment>
      <Container 
        maxWidth="lg">
        <Typography 
          variant="h1" 
          component="h1">
          Dysis
        </Typography>
        <Typography
          variant="h2"
          component="h2">
          Study Participation
        </Typography>
        <FormGroup>
          <TextField
            id="form-participant-input-fist-name"
            label="Participant first name"
            variant="standard"
            value={participant.firstName}
            required={true} 
            disabled={participant.submitted}
            onChange={handleChange} 
            name="firstName"/>
          <TextField
            id="form-participant-input-last-name"
            label="Participant last name"
            variant="standard"
            value={participant.lastName}
            required={true} 
            disabled={participant.submitted}
            onChange={handleChange}
            name="lastName"/>
          <TextField id="form-participant-input-last-name"
            label="Extension installation date"
            variant="standard"
            value={new Date(participant.installationDate).toLocaleString()}
            disabled={true}
            onChange={handleChange}
            name="installationDate"/>
          <FormControlLabel 
            label ="Agree to study terms"
            control={
              <Checkbox 
              checked={participant.agreedToTerms}
              disabled={participant.submitted}
              onChange={toggleButton}/>
            }></FormControlLabel>
          <Grid 
            justifyContent="flex-end">
            <Button
              id="form-participant-button"
              onClick={handleSubmit}
              disabled={!canSubmit()}>{participant.submitted ? "Submitted" : "Submit"}</Button>
          </Grid>
          <Typography
            marginTop={2}
            variant="caption"
            display="block"
            gutterBottom 
            color='lightgray'>
            If you want to withdraw from the study please contact your study coordinator.
          </Typography>
        </FormGroup>
      </Container>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="DYSIS STUDY"
        aria-describedby="Successfully enrolled"
      >
        <Box sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '1px solid grey',
          borderRadius: '5px',
          boxShadow: 24,
          p: 4,
          textAlign: 'center',
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            DYSIS STUDY
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Successfully enrolled in study
          </Typography>
        </Box>
      </Modal>
    </React.Fragment>
  )
}

export default { DysisOptions };
