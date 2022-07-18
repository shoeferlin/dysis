import React from 'react';

import {Typography, Grid, Divider, Link} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {DysisPopupBehavior} from './DysisPopupBehavior';
import {DysisPopupInterests} from './DysisPopupInterests';
import {DysisPopupActivity} from './DysisPopupActivity';
import {DysisTag} from './DysisTag';

import './DysisPopup.css'

const theme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 20,
  },
});

export const DysisPopup = (): JSX.Element => {

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Grid container
          spacing={1}
          direction={"column"}
          alignItems={"center"}>
          <Grid item xs={12} 
            textAlign="center">
            <Typography
              variant="h4" 
              gutterBottom
              component="h4">
              Dysis
            </Typography>
            <Typography 
              variant="h6" 
              gutterBottom
              component="h6">
              Know who you are about to interact with online.
            </Typography>
          </Grid>
          <Grid item xs={12} width="100%" paddingBottom={"5px"} paddingTop={"5px"}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <DysisPopupBehavior></DysisPopupBehavior>
          </Grid>
          <Grid item xs={12} width="100%" paddingBottom={"5px"} paddingTop={"5px"}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <DysisPopupInterests></DysisPopupInterests>
          </Grid>
          <Grid item xs={12} width="100%" paddingBottom={"5px"} paddingTop={"5px"}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <DysisPopupActivity></DysisPopupActivity>
          </Grid>
          <Grid item xs={12} width="100%" paddingBottom={"5px"} paddingTop={"5px"}>
            <Divider variant="fullWidth" />
          </Grid>
          <Grid item xs={12}>
            <span>
              <Typography
              variant="body1"
              component="p"
              alignContent="center">
              Powered by <Link href="https://perspectiveapi.com/">Perspective API</Link>
              </Typography>
            </span>
          </Grid>
          <Grid item xs={12}>
            <DysisTag type='behavior' label='toxicity' value={60} unit='%'></DysisTag>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
   
}