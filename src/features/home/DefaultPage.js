import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import reactLogo from '../../images/react-logo.svg';
import rekitLogo from '../../images/rekit-logo.svg';
import diagram from '../../images/main-diagram-7.svg';
import * as actions from './redux/actions';
import Popup from 'reactjs-popup';
import Loop from '../loop-container/Loop';

export class DefaultPage extends Component {
  static propTypes = {
    home: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-default-page">
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
)(DefaultPage);
