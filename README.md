# Intuit frontend dev assignment

## Instructions
Your assignment is to
* Implement your own version of FSM (Finite State Machine) as a JavaScript
library for React.js applications.
* Write a simple React.js use case application for demonstrating the library
usage.

## Code organization
* src/lib contains a finite state machine class with associated tests
* FsmPlayground is a react component to demonstrate usage of the class

## UI usage
* New states can be added either via the "Add state" button or via pressing the <kbd>Enter</kbd>/<kbd>Return</kbd> key
* New tranisitions can be added either via the "Add transition" button or via pressing the <kbd>Enter</kbd>/<kbd>Return</kbd> key
* Click the button for a transition will run the transition. Note how the current state (in **bold**) changes accordingly