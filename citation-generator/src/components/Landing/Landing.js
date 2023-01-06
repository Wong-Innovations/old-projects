import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import * as actionTypes from '../../store/actions';

const useStyles = makeStyles(theme => ({
  button: {
		margin: theme.spacing(1),
		width:'250px',
    backgroundColor: '#2196f3',
    '&:hover': {
      backgroundColor: '#1976d2',
    },
  },
}));

const mapStateToProps = state => {
  return {
    pageLocation: state.pageLocation,

  };
}

const mapDispatchToProps = dispatch => {
  return {
    changePageLocationHandler: (newPage) => dispatch({
      type: actionTypes.EDIT_PAGE_LOCATION,
      page: newPage,
    })
  };
}

const Landing = (props) => {
	const classes = useStyles();

	return (
		<div>
			<Grid
				container
				direction="column"
				justify="flex-start"
				alignItems="center"
			>
				<Grid item style={{height:'70px'}}/>
				<Grid item>
					<Typography variant="h3" gutterBottom>
						Never lose points again, with AutoBib<span style={{fontSize:'24px', position:'relative', bottom:'20px', fontWeight: 'bold'}}>®</span>
					</Typography>
				</Grid>
				<Grid item style={{height:'70px'}}/>
				<Grid item>
					<Grid
						container
						spacing={4}
						direction="row"
						justify="center"
					>
						<Grid item xs>
							<Paper
								style={{width:'400px', height:'350px', padding:'25px 70px'}}
							>
								<Grid
									container
									spacing={1}
									direction="column"
									justify="flex-end"
									alignItems="center"
									style={{height:'100%'}}
								>
									<Grid item>
										svg
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											onClick={() => props.changePageLocationHandler('QuickCite')}
										>
											<Typography variant="h6">Try It Out</Typography>
										</Button>
									</Grid>
									<Grid item>
										<Typography align="center">
											Generate Ciations in seconds with our QuickCite feature!
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>
						<Grid item xs>
							<Paper
								style={{width:'400px', height:'350px', padding:'25px 70px'}}
							>
								<Grid
									container
									spacing={1}
									direction="column"
									justify="flex-end"
									alignItems="center"
									style={{height:'100%'}}
								>
									<Grid item>
										svg
									</Grid>
									<Grid item>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
											onClick={() => props.changePageLocationHandler('MLA8')}
										>
											<Typography variant="h6">Generate Citations</Typography>
										</Button>
									</Grid>
									<Grid item>
										<Typography align="center">
											Choose a format and generate an annotated bibliography with ease.
										</Typography>
									</Grid>
								</Grid>
							</Paper>
						</Grid>

					</Grid>
				</Grid>
				
			</Grid>
		</div>
	)
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);