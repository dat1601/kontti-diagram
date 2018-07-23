import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';
import SquarePoints from './squarePoints';

export class RenderPoints extends Component {
  static propTypes = {
    loopContainer: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    var mqtt = require('mqtt');

    var host = 'wss://iot.research.hamk.fi:443/mqtt';

    var options = {
      keepalive: 3600,
      protocolId: 'MQTT',
      protocolVersion: 4,
      clean: true,
      reconnectPeriod: 1000,
      connectTimeout: 30 * 1000,
      will: {
        topic: 'WillMsg',
        payload: 'Connection Closed abnormally..!',
        qos: 0,
        retain: false,
      },
      username: '',
      password: '',
      rejectUnauthorized: false,
    };

    var client = mqtt.connect(
      host,
      options,
    );

    

    // subscribe
    client.on('connect', function() {
      client.subscribe('hamk/iot/valkeakoski/kontti/ui/#');
    });

    //callback
    client.on('message', function(topic, message) {
      // message is Buffer
      this.returnMessage = JSON.parse(message.toString());
      this.returnTopic = topic.toString();
      //console.log(returnTopic);
      //console.log(returnMessage);
    });
  }

  componentDidMount() {
    this.props.actions.getPointsSchema();
    console.log(this.returnTopic);
      console.log(this.returnMessage);
  }

  render() {
    return (
      <div className="loop-container-render-points">
        <SquarePoints info={this.props.loopContainer.pointsSchema} topic={this.returnTopic} message={this.returnMessage} />
        <div>{this.returnMessage}</div>
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
)(RenderPoints);
