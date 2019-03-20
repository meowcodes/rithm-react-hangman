import React from 'react';
import { mount } from "enzyme";
import toJson from "enzyme-to-json";
import Hangman from './Hangman';

// smoke test
it('renders without crashing', () => {
  mount(<Hangman />);
});

// snapshot test
it("matches snapshot", function() {
  let wrapper = mount(<Hangman />);
  let serialized = toJson(wrapper);
  expect(serialized).toMatchSnapshot();
});

// image test - wrong guess
it("changes image if wrong letter guessed", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });
  
  // image should change
  let imageSrc = wrapper.find('img').prop('src');
  expect(imageSrc).toEqual('1.jpg');
});

// word test - wrong guess
it("does not change hangman-word if wrong letter guessed", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });
  

  let hangmanWord = wrapper.find('p.Hangman-word').first();
  expect(hangmanWord.matchesElement(<p class="Hangman-word">_____</p>));
});

// image test - correct guess
it("does not change image if correct letter guessed", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='a']")
    .simulate("click", { target: { value: "a" } });
  
  // image should change
  let imageSrc = wrapper.find('img').prop('src');
  expect(imageSrc).toEqual('0.jpg');
});

// word test - correct guess
it("changes hangman-word if correct letter guessed", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='a']")
    .simulate("click", { target: { value: "a" } });
  

  let hangmanWord = wrapper.find('p.Hangman-word').first();
  expect(hangmanWord.matchesElement(<p class="Hangman-word">a____</p>));
});

// check state change when guess made
it("changes state when guess is made", function() {
  let wrapper = mount(<Hangman />);

  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });

  let set = new Set()
  set.add('b')
  expect(wrapper.state().guessed).toEqual(set);
});

// testing keyboard
it("disables keys when guessed", function() {
  let wrapper = mount(<Hangman />);

  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });

    let bBtn = wrapper.find("button[value='b']")
    expect(bBtn.matchesElement(<button key="b" value="b" disabled={true}>b</button>));
})
