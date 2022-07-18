import React from 'react';

import {Typography, Avatar, Grid, Box, Slider} from '@mui/material';

import HandshakeOutlinedIcon from '@mui/icons-material/HandshakeOutlined';

import {DysisTag} from './DysisTag';
import { borderRadius } from '@mui/system';

export const DysisPopupBehavior = (): JSX.Element => {

  const styleDysisTagLegendBehavior = {
    borderRadius: '8px',
    margin: '3px',
    padding: '2px 4px',
    color: 'white',
    backgroundColor: 'rgb(99, 99, 99)'
  }

  const textLegendBehaviorLabels = [
    {
      name: 'toxicity',
      definition: 'A rude, disrespectful, or unreasonable comment that is likely to make people leave a discussion.',
    },
    {
      name: 'severe toxicity',
      definition: 'A very hateful, aggressive, disrespectful comment or otherwise very likely to make a user leave a discussion or give up on sharing their perspective. This attribute is much less sensitive to more mild forms of toxicity, such as comments that include positive uses of curse words.',
    },
    {
      name: 'insult',
      definition: 'Insulting, inflammatory, or negative comment towards a person or a group of people.',
    },
    {
      name: 'identity attack',
      definition: 'Negative or hateful comments targeting someone because of their identity.',
    },
    {
      name: 'threat',
      definition: 'Describes an intention to inflict pain, injury, or violence against an individual or group.',
    }
  ]
  
  return (
    <Grid container item
      spacing={0}
      direction={"column"}
      alignItems={"center"}>
      <Avatar>
        <HandshakeOutlinedIcon/>
      </Avatar>
      <Typography 
        variant="h5" 
        gutterBottom
        component="h5">
        Behavior
      </Typography>
      <Typography 
        variant="body1" 
        gutterBottom
        component="p"
        align="center">
        Cras mattis consectetur purus sit amet fermentum. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.
      </Typography>
      {textLegendBehaviorLabels.map(label => {
        return (
          <Grid container direction={"row"} alignItems="center" columns={12} marginBottom={1} spacing={0}>
            <Grid item xs={4}>
              <span style={styleDysisTagLegendBehavior}>{label.name}</span>
            </Grid>
            <Grid item xs={8}>
              <Typography
                variant="body2">
                "{label.definition}"
              </Typography>
            </Grid>
          </Grid>
        )
      })}
    </Grid>
  )
}