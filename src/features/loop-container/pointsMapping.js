import React from 'react';
import _ from 'lodash';

export default function pointMapping(props) {
  var result = [];

  switch (props.topic) {
    case 'hamk/iot/valkeakoski/kontti/ui/TE':
      result.value = props.message[props.id];
      result.unit = 'C';
      break;
    default:
      break;
  }

  // result = props.points.find(element => element.id === props.id);

  var output;
  if (result) {
    console.log(result.timestamp);
    output = <span>{result.value + ' ' + result.unit}</span>;
  } else {
    console.log('null');
    output = <span>loading</span>;
  }

  return output;
}
