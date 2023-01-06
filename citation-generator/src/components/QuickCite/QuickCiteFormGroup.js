import React from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import GoogleBooks from 'google-books-search';

const formats = [
  {
    value: 'MLA8',
    label: 'MLA8',
  },
  {
    value: 'MLA7',
    label: 'MLA7',
  },
  {
    value: 'APA',
    label: 'APA',
  },
  {
    value: 'Chicago',
    label: 'Chicago',
  },
];

const mediums = [
  {
    value: 'Book',
    label: 'Book',
  },
  {
    value: 'Journal',
    label: 'Journal',
  },
  {
    value: 'Magazine',
    label: 'Magazine',
  },
  {
    value: 'Paper',
    label: 'Paper',
  },
  {
    value: 'Web',
    label: 'Web',
  },
];

const useStyles = makeStyles(theme => ({
  button: {
    height: '54px',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
}));

const mapStateToProps = state => {
  return {
    format: state.quickciteFormat,
    source: state.quickciteSource,
    medium: state.quickciteMedium,
    results: state.quickciteResults,
  };
}

const mapDispatchToProps = dispatch => {
  return {
		changeFormatHandler: (newFormat) => dispatch({
			type: actionTypes.EDIT_QUICKCITE_FORMAT,
			value: newFormat,
    }),
    changeSourceHandler: (newSource) => dispatch({
			type: actionTypes.EDIT_QUICKCITE_SOURCE,
			value: newSource,
    }),
    changeMediumHandler: (newMedium) => dispatch({
			type: actionTypes.EDIT_QUICKCITE_MEDIUM,
			value: newMedium,
    }),
    updateResultsHandler: (newResults) => dispatch({
      type: actionTypes.EDIT_QUICKCITE_RESULTS,
      results: newResults,
    }),
	}
}

const QuickCiteFormGroup = (props) => {
  const classes = useStyles();

  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={1}
    >
      <Grid item xs={1}>
        <TextField
          id="outlined-select-contrib"
          select
          label="Format"
          // displayEmpty
          fullWidth
          value={props.format}
          onChange={(e) => props.changeFormatHandler(e.target.value)}
          variant="outlined"
        >
          {formats.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="outlined-url"
          fullWidth
          label="Source"
          value={props.source}
          onChange={(e) => {props.changeSourceHandler(e.target.value)}}
          variant="outlined"
        />
      </Grid>
      <Grid item xs={1}>
        <TextField
          id="outlined-select-medium"
          select
          label="Medium"
          // displayEmpty
          fullWidth
          value={props.medium}
          onChange={(e) => props.changeMediumHandler(e.target.value)}
          variant="outlined"
        >
          {mediums.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={2}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={() => {
            GoogleBooks.search(props.source, (error, results) => {
              if ( ! error ) {
                props.updateResultsHandler(results);
              } else {
                console.log(error);
              }
            });
          }}
        >
          <Typography>
            Generate Citation
          </Typography>
        </Button>
      </Grid>
    </Grid>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickCiteFormGroup)