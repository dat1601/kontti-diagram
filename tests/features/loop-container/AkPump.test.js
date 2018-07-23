import React from 'react';
import { shallow } from 'enzyme';
import { AkPump } from '../../../src/features/loop-container/AkPump';

describe('loop-container/AkPump', () => {
  it('renders node with correct class name', () => {
    const props = {
      loopContainer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AkPump {...props} />
    );

    expect(
      renderedComponent.find('.loop-container-ak-pump').length
    ).toBe(1);
  });
});
