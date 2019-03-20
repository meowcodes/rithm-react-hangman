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

// image test - out of wrong guess
it("removes image if out of wrong guesses", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });
  
  wrapper
    .find("button[value='x']")
    .simulate("click", { target: { value: "x" } });
  
  wrapper
    .find("button[value='w']")
    .simulate("click", { target: { value: "w" } });
  
  wrapper
    .find("button[value='d']")
    .simulate("click", { target: { value: "d" } });
  
  wrapper
    .find("button[value='k']")
    .simulate("click", { target: { value: "k" } });
  wrapper
    .find("button[value='z']")
    .simulate("click", { target: { value: "z" } });
  wrapper
    .find("button[value='m']")
    .simulate("click", { target: { value: "m" } });
  
  // image should change
  let imageSrc = wrapper.find('img').prop('src');
  expect(imageSrc).toEqual(undefined);
});

// functionality test - out of wrong guess, stops responding
it("stops responding if out of wrong guesses", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });
  
  wrapper
    .find("button[value='x']")
    .simulate("click", { target: { value: "x" } });
  
  wrapper
    .find("button[value='w']")
    .simulate("click", { target: { value: "w" } });
  
  wrapper
    .find("button[value='d']")
    .simulate("click", { target: { value: "d" } });
  
  wrapper
    .find("button[value='k']")
    .simulate("click", { target: { value: "k" } });
  wrapper
    .find("button[value='z']")
    .simulate("click", { target: { value: "z" } });
  wrapper
    .find("button[value='m']")
    .simulate("click", { target: { value: "m" } });
  wrapper
    .find("button[value='a']")
    .simulate("click", { target: { value: "a" } });
  
  // Hangman-word should NOT change
  let hangmanWord = wrapper.find('p.Hangman-word').first().text()
  expect(hangmanWord).toEqual('_____');
  // keyboard should NOT change
  // let bBtn = wrapper.find("button[value='a']").html()
  // expect(bBtn.matchesElement(<button key="a" value="a" disabled={false}>a</button>));
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


// testing nWrong w/ wrong letter
it("changes <p> Number wrong: </p> if wrong letter guessed", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='b']")
    .simulate("click", { target: { value: "b" } });
  
  // Number wrong should change
  let hangmanWord = wrapper.find('p.wrong-guesses').first();
  expect(hangmanWord.matchesElement(<p class="wrong-guesses">Number wrong: 1</p>));
});

// testing nWrong w/ correct letter
it("doesn't change <p> Number wrong: </p> if correct letter guessed", function() {
  let wrapper = mount(<Hangman />);
  
  wrapper
    .find("button[value='a']")
    .simulate("click", { target: { value: "a" } });
  
  // Number wrong should not change
  let hangmanWord = wrapper.find('p.wrong-guesses').first();
  expect(hangmanWord.matchesElement(<p class="wrong-guesses">Number wrong: 0</p>));
});