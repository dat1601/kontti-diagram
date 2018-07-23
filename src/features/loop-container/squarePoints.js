import React from 'react';
import PopUp from './popUp';

export default function SquarePoints (props) {
 const handValves = props.info.map(element => (
      <div className="loop-container-hand-valve" key={element.title}>
        <PopUp
          addClassName={element.addClassName}
          title={element.title}
          id={element.id}
          points={props.points}
          panelId={element.panelId}
          position={element.position}
          topic={props.topic}
          message={props.message}
        />
      </div>
    ));
    return handValves;
}