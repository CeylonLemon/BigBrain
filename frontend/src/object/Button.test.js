import { AddButton } from './Button';
import { shallow } from 'enzyme';
import React from 'react';
describe('AddButton', () => {
  // const noop = () => {};

  it('triggers onClick event handler when clicked', () => {
    const onClick = jest.fn();
    shallow(<AddButton onClick={onClick}/>).simulate('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
})
