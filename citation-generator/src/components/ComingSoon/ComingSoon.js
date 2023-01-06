import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const ComingSoon = (props) => {
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="center"
			style={{ minHeight: '80vh' }}
		>
			<Grid item>
				<img src={process.env.PUBLIC_URL + './books-clipart.png'} alt="Books" style={{width: '200px', height: 'auto'}} />
			</Grid>
			<Grid item>
				<Typography>Sorry, this feature is currently being developed.</Typography>
			</Grid>
		</Grid>
	);
}

export default ComingSoon;
