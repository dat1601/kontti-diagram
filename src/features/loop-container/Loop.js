import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import diagram from '../../images/main-diagram-7.svg';

import RenderPoints from './RenderPoints';

export class Loop extends Component {
  static propTypes = {
    loopContainer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="loop-container-loop">
        <div className="loop-container">
          <div className="loop-wrapper">
            <RenderPoints />

            <div className="place-wrapper loop-1">
              <div className="main-text-div loop-icon">
                <div className="main-text">
                  <strong>1</strong>
                </div>
              </div>
            </div>
            <div className="place-wrapper loop-1 loop-3">
              <div className="main-text-div loop-icon">
                <div className="main-text">
                  <strong>3</strong>
                </div>
              </div>
            </div>
            <div className="place-wrapper loop-1 loop-2">
              <div className="main-text-div loop-icon">
                <div className="main-text">
                  <strong>2</strong>
                </div>
              </div>
            </div>

            <div className="div-block">
              <img src={diagram} alt="Diagram" className="diagram" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    loopContainer: state.loopContainer,
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
)(Loop);
