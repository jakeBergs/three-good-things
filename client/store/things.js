import axios from 'axios';
import setSaved from './saved'

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
      Promise.resolve(dispatch(getThings(things)))
        .then()
    })
};


export default function (state = ['', '', ''], action) {
  switch (action.type) {
    case GET_THINGS:
      return [...action.things, action.things.map()]
    default:
      return state
  }
}
