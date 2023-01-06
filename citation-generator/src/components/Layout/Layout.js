import React from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/Aux';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import BookIcon from '@material-ui/icons/ChromeReaderModeTwoTone';
import HomeIcon from '@material-ui/icons/HomeTwoTone';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as actionTypes from '../../store/actions';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    position: 'fixed',
    width: '100%',
    zIndex: '1400',
    backgroundColor: '#2196f3',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
		flexGrow: 1,
    padding: theme.spacing(3),
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

let ResponsiveDrawer = (props) => {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen);
  }

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {['Home'].map((text, index) => (
          <ListItem button key={text} onClick={() => props.changePageLocationHandler(text)}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
        <Divider />
      <List>
        {['MLA8', 'MLA7', 'APA', 'Chicago'].map((text, index) => (
          <ListItem button key={text} onClick={() => props.changePageLocationHandler(text)}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['QuickCite'].map((text, index) => (
          <ListItem button key={text} onClick={() => props.changePageLocationHandler(text)}>
            <ListItemIcon><BookIcon /></ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Aux>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap>
            AutoBib
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="Mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
				{props.children}
      </main>
    </Aux>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);