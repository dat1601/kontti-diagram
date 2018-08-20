import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import diagram from '../../images/main-diagram-7.svg';
import * as actions from './redux/actions';
import Popup from 'reactjs-popup';
import Loop from '../loop-container/Loop';
import Sidebar from './SideBar';
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import dashboardStyle from "../../assets/layout/dashboardStyle.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardRoutes from './route.js';

const switchRoutes = (
  <Switch>
    {dashboardRoutes.childRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false
    };
    this.resizeFunction = this.resizeFunction.bind(this);
  }
  
  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  getRoute() {
    return this.props.location.pathname !== "/maps";
  }
  resizeFunction() {
    if (window.innerWidth >= 960) {
      this.setState({ mobileOpen: false });
    }
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
    window.addEventListener("resize", this.resizeFunction);
  }
  componentDidUpdate(e) {
    if (e.history.location.pathname !== e.location.pathname) {
      this.refs.mainPanel.scrollTop = 0;
      if (this.state.mobileOpen) {
        this.setState({ mobileOpen: false });
      }
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.resizeFunction);
  }

  render() {
    const { classes, ...rest } = this.props;
    return (
      <div className={"home-default-page" + classes.wrapper}>
        <Sidebar
          routes={dashboardRoutes}
          logoText={"TOE-hanke"}
          logo={reactLogo}
          image={rekitLogo}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className="main-content">
          
          <div className="title-row w-row">
            <div className="logo-container w-col w-col-9">
              <h3 className="heading">Energy cycle</h3>
            </div>
            <div className="w-col w-col-3" />
          </div>
          <Loop />
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
)(withStyles(dashboardStyle)(DefaultPage));
