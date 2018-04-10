import axios from 'axios'

const ADDSAVE = 'ADDSAVE';
const SETSAVED = 'SETSAVED';

const addSave = () => ({type: ADDSAVE})
export const setSaved = (count) => ({type: SETSAVED, count})

export default function(state = 0, action) {
  switch (action.type) {
    case ADDSAVE:
      return state + 1;
    case SETSAVED:
      return action.count
    default:
      return state;
  }
}

export const saveThing = (thing, userId) => dispatch =>
  axios.post(`/api/users/${userId}/thing`, {content: thing})
    .then(res => res.data)
    .then(thing => {
      dispatch(addSave())
    })
    .catch(console.error)
