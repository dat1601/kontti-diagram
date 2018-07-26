import React from 'react';
import _ from 'lodash';

export default function pointMapping(props) {
  let result = [];
  let unit = [];
  const title = props.title;

  function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  unit = title.includes('TE')
    ? '°C'
    : title.includes('FE')
      ? 'l/min'
      : title.includes('PE')
        ? 'bar'
        : title.includes('PWM')
          ? '%'
          : title.includes('RPM')
            ? 'rpm'
            : title.includes('QQ')
              ? 'kWh'
              : '';

  result = props.message ? props.message[props.id] : result;

  switch (props.id) {
    case 'AK_FE002':
      result = result / 60;
      break;
    case 'AK_QQ_D':
      result = result / 1000;
      break;
    case 'K_HV001':
    case 'K_HV004':
    case 'K_HV007':
      result = result === 1 ? 'on' : 'off';
      break;
    case 'fVolumeflow':
    case 'f1Volumeflow':
      result = (result * 1000) / 60;
      break;
    case 'fPumpLiquidTemp':
    case 'f1PumpLiquidTemp':
      result = result - 273.15;
      break;
    default:
      break;
  }

  // result = props.points.find(element => element.id === props.id);

  var output;
  if (result || result === 0) {
    //console.log(result);
    output = <span>{isNaN(result) ? result : round(result, 3) + ' ' + unit}</span>;
  } else {
    //console.log('null');
    output = <span>loading</span>;
  }

  return output;
}
