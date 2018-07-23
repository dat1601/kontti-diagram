import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import PointsMapping from './pointsMapping';

function SubText(props) {
  return (
    <div className={"sub-text-div " + props.addClassName.subTextDiv}>
      <div className="sub-text">
        <strong className="bold-text">{props.title}</strong>
      </div>
    </div>
  );
}

function MainText(props) {
  return (
    <div className={'main-text-div ' + props.addClassName.mainText}>
      <div className="main-text">
        <strong>
          <PointsMapping id={props.id} topic={props.topic} message={props.message} />
        </strong>
      </div>
    </div>
  );
}

function PopUpWrapper(props) {
  return <div className={'place-wrapper ' + props.addClassName.subText}>{props.children}</div>;
}

export default function popUp(props) {
  return (
    <div className="loop-container-popup">
      <PopUpWrapper {...props} >
        <SubText addClassName={props.addClassName} title={props.title} />
        <Popup
          trigger={open => (
            <div className="popup-trigger">
              <MainText addClassName={props.addClassName} id={props.id} topic={props.topic} message={props.message} />
            </div>
          )}
          position={props.position}
          closeOnDocumentClick
          contentStyle={{ width: 'auto' }}
        >
          <div className="content-div">
            <iframe
              src={
                'https://iot.research.hamk.fi/visu/d-solo/KI1KYAHiz/toe-diagram?panelId=' +
                props.panelId +
                '&orgId=4&refresh=5s&from=now-6h&to=now&theme=light'
              }
              title={props.title}
              width="450"
              height="200"
              frameborder="0"
            />
          </div>
        </Popup>{' '}
      </PopUpWrapper>
    </div>
  );
}