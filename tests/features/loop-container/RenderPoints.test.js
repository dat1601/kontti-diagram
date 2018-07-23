import React from 'react';
import { shallow } from 'enzyme';
import { RenderPoints } from '../../../src/features/loop-container/RenderPoints';

describe('loop-container/RenderPoints', () => {
  it('renders node with correct class name', () => {
    const props = {
      loopContainer: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <RenderPoints {...props} />
    );

    expect(
      renderedComponent.find('.loop-container-render-points').length
    ).toBe(1);
  });
});
