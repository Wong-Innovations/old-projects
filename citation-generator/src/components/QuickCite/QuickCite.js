import React from 'react';
import Grid from '@material-ui/core/Grid';
import Preview from '../Preview/Preview';
import Typography from '@material-ui/core/Typography';
import QuickCiteFormGroup from './QuickCiteFormGroup';
import QuickCiteResults from './QuickCiteResults';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  return {
    results: state.quickciteResults,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    updateResultsHandler: (newResults) => dispatch({
      type: actionTypes.EDIT_QUICKCITE_RESULTS,
      results: newResults,
    }),
	}
}

const QuickCite = (props) => {
  return (
    <div>
      {/* QuickSite Fields */}
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={1}
      >
        <Grid item style={{height:'50px'}} xs={12}/>
        <Grid item xs={12}>
          <Typography variant="h6" style={{width: '100%', textAlign: 'center', fontSize: '30px'}} gutterBottom>
            Just paste and click to create complete citations in seconds!
          </Typography>
        </Grid>
        <Grid item style={{height:'50px'}} xs={12}/>
        <Grid item xs={12}>
          <QuickCiteFormGroup />
        </Grid>
        {(props.results.length === 0)? null : <Grid item xs={12}><QuickCiteResults /></Grid>}
        {/* Preview Item */}
        <Grid item xs={12}><Preview /></Grid>
      </Grid>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickCite);