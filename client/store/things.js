import axios from 'axios';
import {setSaved} from './saved'

const GET_THINGS = 'GET_THINGS'

/**
 * ACTION CREATORS
 */
const getThings = things => ({type: GET_THINGS, things})

/**
 * THUNK CREATORS
 */
export const loadThings = userId => dispatch => {
  axios.get(`/api/users/${userId}/things/today`)
    .then(res => res.data)
    .then(things => {
      console.log(things)
      Promise.resolve(dispatch(getThings(things)))
        .then(() => dispatch(setSaved(things.length)))
    })
    .catch(console.error)
};


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
    default:
      return state
  }
}
