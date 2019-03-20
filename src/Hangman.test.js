import React from 'react';
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from './Hangman';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Hangman />, div);
  ReactDOM.unmountComponentAtNode(div);
});
