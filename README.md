## Important Points
1. UI is most predictable when its described as a PURE FUNCTION of the application STATE. <- Poineered by REACT!
2. Redux complements this idea by another idea, that is, the state mutations in the app need to be described as a PURE FUNCTION that takes the prev state and the action being dispatched and returns the next state of the app.
3. Even in large applications, there is still just a single function that manages how the next state is calculated based on the previous state of the whole application and the action being dispatched. It does not have to be slow.
4. This function has to be pure. This function is called the "Reducer."

## Redux
1. Store is a primitive in redux. It contains the state, the dispatcher, and the subscriber.
2. store.getState() returns the current state.
3. store.subscibe(callback) executes the callback whenever the state changes. This callback should update the DOM/UI
   so that it uses the new state. 

## Reducer Testing
1. It is important that the reducer to be a pure function.
2. So no mutations should be made on its inputs.
3. This should be enforced in the tests by Object.freeze().
4. Object.freeze() should be used to test against accidental mutations of reducer inputs

## Redux, UI and New state
1. After new state is calculated, UI needs to be updated so that it uses the new state.
2. UI updating == updating the DOM.
3. React is great at updating the DOM.
4. Simplest way is to use ReactDOM.render(<RootComponent state={store.getState()}>)

## Reducer Composition
1. A function becomes hard to understand if it does to many things, it should ideally concern itself with only one thing.
2. A single reducer function becomes very hard to understand if it contains the logic for all the calculations of the next state.
3. This is not a problem unique to Redux. Any time a function does too many things, you want to extract other functions from it, and call them so that every function only addresses a single concern.
4. Reducers are also normal JavaScript functions, so they can call other reducers to delegate and abstract away handling of updates of some parts of this tree they manage. 
5. Different reducers specify how different parts of the state tree are updated in response to actions.
6. This pattern can be applied many times, and while there is still a single top level reducer managing the state of your app, you will find it convenient to express it as many reducers call on each other, each contribution to a part of the applications state tree.

## Combining Reducers and Initializing the state.
1. As more data is introduced to the app state, the app reducer grows.
2. To store a new peice of information in the app state, you don't need to change the existing reducers.
3. You can use the reducer composition pattern and create a new reducer that calls the existing reducers to manage parts of its state and combines the results in a single state object.
4. When the top-level/app reducer is run for the first time, it will pass 'undefined' as the state of the child reducers because the initial state of the combined reducer is an empty object, so all its fields are 'undefined'. 
5. This gets the child reducers to return their initial states and populates the state object for the first time.
6. When an action comes in, the top-level/app reducer calls the child reducers with the parts of the state that they manage and the action and combines the results into the new state object.
7. The initial state of the combined reducer now contains the initial states of independent reducers. Any time an action comes in those reducers handle the action independently.
8. Redux comes with combineReducers utility that combines reducers and creates a new reducer which returns a new state object combined from the results of the reducers.

## Presentational Components and Container Components
1. Presentaional components don't specify any behaviors, and are only concerned with how things look or how they render.
2. Container components actually pass the data from the store and specify the behavior for the presentaional components
3. Behaviour means dispatching an action.
