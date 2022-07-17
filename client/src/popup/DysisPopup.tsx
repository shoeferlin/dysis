import React from 'react';

import {Typography, Grid} from '@mui/material';

import './DysisPopup.css'

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';

import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';

export const DysisPopup = (): JSX.Element => {

  return (
    <React.Fragment>
      <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center">
        <Typography 
          variant="h4" 
          gutterBottom
          component="h4">
          Dysis
        </Typography>
        <Typography 
          variant="body1" 
          gutterBottom
          component="p">
          Know who you are discussing with.
        </Typography>
      </Grid>
      <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
      }}
    >
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <HandshakeOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Behavior"
          secondary={
            <React.Fragment>
              <div>Displays behavioral values retrieved through analysis of previous behavior</div>
              <h4>Toxicity</h4>
              <p>"A rude, disrespectful, or unreasonable comment that is likely to make people leave a discussion."</p>
            </React.Fragment>
          }/>
      </ListItem>
      <Divider 
        variant="inset"
        component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <InterestsOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Interets"
          secondary="Displays interests topics proxied through subreddit activity"/>
      </ListItem>
      <Divider
        variant="inset"
        component="li" />
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <InsertChartOutlinedIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary="Activity"
          secondary="Displays metric scores gained through processing of past submissions"/>
      </ListItem>
    </List>
    </React.Fragment>
  )
   
}