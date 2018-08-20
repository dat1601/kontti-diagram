import React from 'react';
import { shallow } from 'enzyme';
import { NewPopUp } from '../../../src/features/loop-container/NewPopUp';

describe('loop-container/NewPopUp', () => {
  it('renders node with correct class name', () => {
    const props = {
      loopContainer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NewPopUp {...props} />
    );

    expect(
      renderedComponent.find('.loop-container-new-pop-up').length
    ).toBe(1);
  });
});
