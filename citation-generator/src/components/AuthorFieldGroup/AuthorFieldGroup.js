import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from '@material-ui/core/Grid';

const contribs = [
  {
    value: 'Author',
    label: 'Author',
  },
  {
    value: 'Edited',
    label: 'Editor',
  },
  {
    value: 'Translated',
    label: 'Translator',
  },
  {
    value: 'Illustrated',
    label: 'Illustrator',
  },
];

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  dense: {
    marginTop: theme.spacing(2),
  },
  addFab: {
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
}));

export default function AuthorFieldGroup(props) {
	const classes = useStyles();

  let button = (props.plusButton)? (
    <Fab
      aria-label="Add"
      className={classes.addFab}
      onClick={props.addAuthor}
    >
      <AddIcon style={{color: '#fff'}} />
    </Fab>
  ) : (
    <Fab aria-label="Delete" onClick={props.removeAuthor}>
      <DeleteIcon />
    </Fab>
  );

  return (
    <Grid
      container
      spacing={1}
      direction="row"
      justify="flex-start"
      alignItems="center"
      style={{marginTop: '10px'}}
    >
      <Grid item xs={2} sm={2}>
        <TextField
          id="outlined-select-contrib"
          select
          label="Role"
          // displayEmpty
          fullWidth
          value={props.valueObj.contrib}
          onChange={(e) => props.handleChange('contrib', e)}
          variant="outlined"
        >
          {contribs.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2} sm={2}>
        <TextField
          id="outlined-fname"
          fullWidth
          label="First"
          value={props.valueObj.fname}
          onChange={(e) => props.handleChange('fname', e)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2} sm={2}>
        <TextField
          id="outlined-mname"
          fullWidth
          label="Middle"
          value={props.valueObj.mname}
          onChange={(e) => props.handleChange('mname', e)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2} sm={2}>
        <TextField
          id="outlined-lname"
          fullWidth
          label="Last"
          value={props.valueObj.lname}
          onChange={(e) => props.handleChange('lname', e)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        <TextField
          id="outlined-suffix"
          fullWidth
          label="Suffix"
          value={props.valueObj.suffix}
          onChange={(e) => props.handleChange('suffix', e)}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={2} sm={1}>
        {button}
      </Grid>
		</Grid >
	)
}