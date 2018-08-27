import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import FloatingButton from './FloatingButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import { menu } from 'react-icons-kit/feather/menu';
import { chevronLeft } from 'react-icons-kit/feather/chevronLeft';
import { withBaseIcon } from 'react-icons-kit';
import { grid } from 'react-icons-kit/feather/grid';
import { mail } from 'react-icons-kit/feather/mail';
import { user } from 'react-icons-kit/feather/user';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';

const drawerWidth = 240;

const SideIconContainer = withBaseIcon({ size: 20, style: { color: 'white' } });

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: 'transparent',
    color: 'white',
  },

  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  hideFAB: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },

  whiteFont: {
    color: 'white',
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  mobileDrawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    background: '#2D353C',
    color: 'white',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: '#2D353C',
    color: 'white',
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    color: 'white',
    ...theme.mixins.toolbar,
  },
  toolbarClose: {
    justifyContent: 'center',
    transition: theme.transitions.create('justify-content', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    transitionDelay: '0.5s',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    float: 'right',
    color: 'white',
    overflow: 'auto',
  },
});

const DrawerContent = props => (
  <List component="nav">
    <ListItem button>
      <ListItemIcon>
        <SideIconContainer icon={grid} />
      </ListItemIcon>
      <ListItemText primary="Dashboard" classes={{ primary: props.classes.whiteFont }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SideIconContainer icon={mail} />
      </ListItemIcon>
      <ListItemText primary="Inbox" classes={{ primary: props.classes.whiteFont }} />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SideIconContainer icon={user} />
      </ListItemIcon>
      <ListItemText primary="Sign in" classes={{ primary: props.classes.whiteFont }} />
    </ListItem>
  </List>
);

export class NewSideBar extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    // this.handleDrawerOpen = this.handleDrawerOpen.bind(this);
    // this.handleDrawerClose = this.handleDrawerClose.bind(this);
    this.handleDrawer = this.handleDrawer.bind(this);
  }

  /*  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };*/

  handleDrawer = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    const { classes, theme } = this.props;

    return (
      <div className="home-new-side-bar">
        {' '}
        <div className={classes.root}>
          <Hidden smDown>
            <Drawer
              variant="permanent"
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  !this.state.open && classes.drawerPaperClose,
                ),
              }}
              open={this.state.open}
            >
              <div
                className={classNames(classes.toolbar, !this.state.open && classes.toolbarClose)}
              >
                <IconButton onClick={this.handleDrawer}>
                  {!this.state.open ? (
                    <SideIconContainer icon={menu} />
                  ) : (
                    <SideIconContainer icon={chevronLeft} />
                  )}
                </IconButton>
              </div>
              <Divider light />
              <DrawerContent classes={classes} />
            </Drawer>
          </Hidden>
          <Hidden mdUp>
            <Drawer
              variant="temporary"
              anchor={'right'}
              open={this.state.open}
              onClose={this.handleDrawer}
              classes={{
                paper: classes.mobileDrawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <DrawerContent classes={classes} />
            </Drawer>
          </Hidden>
          <div className={classes.hideFAB}>
            <FloatingButton className={classes.hideFAB} onClick={this.handleDrawer}>
              <SideIconContainer icon={menu} />
            </FloatingButton>
          </div>
          <main className={classes.content}>
            <div className="child content">{this.props.children}</div>
          </main>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    home: state.home,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles, { withTheme: true })(NewSideBar));
