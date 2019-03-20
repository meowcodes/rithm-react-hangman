import React from 'react';
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import App from './App';

// smoke test
it('renders without crashing', () => {
  mount(<App />);
});

// snapshot test
it("matches snapshot", function() {
  let wrapper = mount(<App />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});