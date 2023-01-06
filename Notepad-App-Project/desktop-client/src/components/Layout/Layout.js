import React from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/AddOutlined'
import AppBar from '@material-ui/core/AppBar';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolderOutlined';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Collapse from '@material-ui/core/Collapse';
import MenuIcon from '@material-ui/icons/Menu';
import SaveIcon from '@material-ui/icons/SaveOutlined'
import SaveAltIcon from '@material-ui/icons/SaveAltOutlined'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import * as actionTypes from '../../store/actions';
import { connect } from 'react-redux';
import fakeData from '../../fakedata';

const mapStateToProps = state => {
  return {
    mobileOpen: state.mobileOpen,
    foldersOpen: state.foldersOpen
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleMobileOpen: () => dispatch({
      type: actionTypes.CHANGE_MOBILE_OPEN
    }),
    handleFolderOpen: (index) => dispatch({
      type: actionTypes.CHANGE_FOLDER_OPEN,
      index: index
    }),
    handleNewFolder: () => dispatch({
      type: actionTypes.ADD_FOLDER_TO_DRAWER
    }),
  }
}

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerIcon: {
    height: '64px'
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    minHeight: '64px'
  },
  title: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  notePreview: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <IconButton color="inherit" className={classes.drawerIcon}>
          <AddIcon fontSize="large" />
        </IconButton>
        <IconButton color="inherit" className={classes.drawerIcon}>
          <CreateNewFolderIcon fontSize="large" />
        </IconButton>
        <IconButton color="inherit" className={classes.drawerIcon}>
          <SaveAltIcon fontSize="large" />
        </IconButton>
        <Divider />
      </div>
      <List
        component="nav"
      >
        {fakeData.folders.map((folder, index) => {
        if (folder.name !== "Misc") {
          return (
            <div>
            <ListItem button onClick={() => props.handleFolderOpen(index)}>
              <ListItemText primary={folder.name} />
              {props.foldersOpen[index] ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={props.foldersOpen[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {folder.contents.map((note) => {
                  return (
                    <ListItem button className={classes.nested}>
                      <ListItemText primary={note.name} />
                    </ListItem>
                  )
                })}
              </List>
            </Collapse>
            </div>
          )
        } else {
          return (
            <div>
              {folder.contents.map((note) => {
                return (
                  <ListItem button>
                    <ListItemText primary={note.name} />
                  </ListItem>
                )
              })}
            </div>
          )
        }
      })}
        <ListItem button>
          <ListItemText
            primary="New Note"
          />
          <ListItemSecondaryAction>
            <AddIcon />
          </ListItemSecondaryAction>
        </ListItem>
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={props.handleMobileOpen}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            Notepad
          </Typography>
          <IconButton color="inherit">
            <SaveIcon fontSize="large" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden mdUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={props.mobileOpen}
            onClose={props.handleMobileOpen}
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
        <Hidden smDown implementation="css">
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
        <Typography paragraph>
          Replace This Typography With A Slate Editor Component
        </Typography>
      </main>
    </div>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default connect(mapStateToProps, mapDispatchToProps)(ResponsiveDrawer);