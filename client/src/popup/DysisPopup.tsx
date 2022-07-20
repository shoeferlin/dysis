import React from 'react';

import {Typography, Grid, Divider, Link, Button} from '@mui/material';
import {createTheme, ThemeProvider} from '@mui/material/styles';

import {DysisPopupBehavior} from './DysisPopupBehavior';
import {DysisPopupInterests} from './DysisPopupInterests';
import {DysisPopupActivity} from './DysisPopupActivity';

const theme = createTheme({
  typography: {
    // Tell MUI what's the font-size on the html element is.
    htmlFontSize: 20,
  },
});

export const DysisPopup = (): JSX.Element => {

  const createNewTab = (link: string): void => {
    chrome.tabs.create({url: link})
  }

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
              style={{fontWeight: 600}}
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
          {/* Notice: Links do not work in Browser Extensions, instead an event listener has to be added and then chrome.tabs.create has to be called */}
          <Grid item xs={12} margin={1} textAlign="center">
              <Typography
              variant="body1"
              component="p"
              alignContent="center">
              Browser extension built by Simon Höferlin <Link href="#" onClick={() => createNewTab('https://github.com/shoeferlin/')}>(GitHub)</Link>
              </Typography>
              <Typography
              variant="caption"
              component="p"
              alignContent="center">
              Behavioral analytics powered by <Link href="#" onClick={() => createNewTab('https://perspectiveapi.com/')}>Perspective API</Link>
              </Typography>
          </Grid>
        </Grid>
      </ThemeProvider>
    </React.Fragment>
  )
   
}