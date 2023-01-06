import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
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

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

const QuickCiteResults = (props) => {
  const classes = useStyles();


  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="stretch"
      spacing={2}
      >
        {props.results.map((result) => (
          <Grid item>
            <Paper className={classes.paper}>
              <Grid container spacing={2}>
                <Grid item>
                  <ButtonBase className={classes.image}>
                    <img className={classes.img} alt="temp" src={result.thumbnail} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography gutterBottom variant="subtitle1" noWrap>
                        {result.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {(result.authors)? result.authors[0] : null}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {(result.industryIdentifiers)? result.industryIdentifiers[0].type : null}
                        :
                        {(result.industryIdentifiers)? result.industryIdentifiers[0].identifier : null}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {(result.publishedDate)? result.publishedDate : null}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1"></Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        ))}
      </Grid>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(QuickCiteResults);