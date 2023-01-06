import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import HelpIcon from '@material-ui/icons/HelpOutline';
import Popover from '@material-ui/core/Popover';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

let ToolTip = (props) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  let handlePopoverOpen = event => {
    setAnchorEl(event.currentTarget);
  }

  let handlePopoverClose = () => {
    setAnchorEl(null);
  }

  const open = Boolean(anchorEl);

  return (
    <TextField
      id="outlined-full-width"
      fullWidth
      label={props.label}
      value={props.value}
      onChange={props.onChange}
      placeholder={props.placeholder}
      variant="outlined"
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <HelpIcon
              className={classes.icon}
              color="action"
              onMouseEnter={handlePopoverOpen}
              onMouseLeave={handlePopoverClose}
            />
            <Popover
              id="mouse-over-popover"
              className={classes.popover}
              classes={{
                paper: classes.paper,
              }}
              open={open}
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'center',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              onClose={handlePopoverClose}
              disableRestoreFocus
            >
              <Typography>{props.children}</Typography>
            </Popover>
          </InputAdornment>
        ),
        shrink: true,
      }}
    />
  );
}

export default ToolTip;
