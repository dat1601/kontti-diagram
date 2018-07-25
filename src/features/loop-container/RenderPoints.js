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
    this.props.actions.getPointsSchema();

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

    var returnMessage;
    var returnTopic;
    //callback
    client.on('message', function(topic, message) {
      // message is Buffer
      returnMessage = JSON.parse(message.toString());
      returnTopic = topic.toString();

      //  props.actions.mqtt(returnMessage, returnTopic);
      //  console.log(props.loopContainer.mqtt);

      switch (returnTopic) {
        case 'hamk/iot/valkeakoski/kontti/ui/p1':
          props.actions.mqttP1(returnMessage, returnTopic);
          break;
        case 'hamk/iot/valkeakoski/kontti/ui/p2':
          props.actions.mqttP2(returnMessage, returnTopic);
          break;
        case 'hamk/iot/valkeakoski/kontti/ui/TE':
          props.actions.mqttTe(returnMessage, returnTopic);
          break;
        case 'hamk/iot/valkeakoski/kontti/ui/HV':
          props.actions.mqttHv(returnMessage, returnTopic);
          break;
        case 'hamk/iot/valkeakoski/kontti/ui/solar/heat':
          props.actions.mqttSolar(returnMessage, returnTopic);
          break;
        default:
          break;
      }
    });
  }

  render() {
    const hv = this.props.loopContainer.mqttHV;
    const te = this.props.loopContainer.mqttTE;
    const solar = this.props.loopContainer.mqttSolar;
    const p1 = this.props.loopContainer.mqttP1;
    const p2 = this.props.loopContainer.mqttP2;
    // const mqtt = this.props.loopContainer.mqtt;

    return (
      <div className="loop-container-render-points">
        <SquarePoints
          info={this.props.loopContainer.pointsSchema}
          message={{ ...hv, ...te, ...solar, ...p1, ...p2 }}
        />
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
