import React from 'react';
import { shallow } from 'enzyme';
import { NewSideBar } from '../../../src/features/home/NewSideBar';

describe('home/NewSideBar', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <NewSideBar {...props} />
    );

    expect(
      renderedComponent.find('.home-new-side-bar').length
    ).toBe(1);
  });
});
