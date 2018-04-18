import axios from 'axios';
import {setSaved, addSave} from './saved'

const GET_THINGS = 'GET_THINGS'
const ADD_THING = 'ADD_THING'

/**
 * ACTION CREATORS
 */
const getThings = things => ({type: GET_THINGS, things})
const addThing = thing => ({type: ADD_THING, thing})

/**
 * THUNK CREATORS
 */
export const loadThings = userId => dispatch => {
  axios.get(`/api/users/${userId}/things/today`)
    .then(res => res.data)
    .then(things => {
      // console.log(things)
      Promise.resolve(dispatch(getThings(things.map(thing => thing.content))))
        .then(() => dispatch(setSaved(things.length)))
    })
    .catch(console.error)
};

export const saveThing = (content, userId) => dispatch =>
axios.post(`/api/users/${userId}/thing`, {content})
  .then(res => res.data)
  .then(thing => {
    console.log(thing.content)
    Promise.resolve(dispatch(addThing(thing.content)))
      .then(() => dispatch(addSave()))
  })
  .catch(console.error)

export default function (state = ['', '', ''], action) {
  let newState = [...state]
  switch (action.type) {
    case GET_THINGS:
      newState = [...action.things];
      while (newState.length !== 3){
        newState.push('')
      }
      console.log('new State', newState)
      return newState
    case ADD_THING:
      newState = state.filter(thing => thing !== '')
      newState.push(action.thing);
      while (newState.length !== 3){
        newState.push('')
      }
      return newState
    default:
      return state
  }
}
