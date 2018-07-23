import React from 'react';
import { shallow } from 'enzyme';
import { Loop } from '../../../src/features/loop-container/Loop';

describe('loop-container/Loop', () => {
  it('renders node with correct class name', () => {
    const props = {
      loopContainer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Loop {...props} />
    );

    expect(
      renderedComponent.find('.loop-container-loop').length
    ).toBe(1);
  });
});
