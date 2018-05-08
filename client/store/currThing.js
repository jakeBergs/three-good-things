import axios from 'axios';

const GET_THING = 'GET_THING';
const RESET_THING = 'RESET_THING';

const getThing = thing => ({ type: GET_THING, thing });
const resetThing = () => ({ type: RESET_THING })

export const fetchThing = id => dispatch => {
  axios.get(`/api/things/${id}`)
    .then(res => res.data)
    .then(thing => dispatch(getThing(thing)))
    .catch(console.error)
}

export const updateThing = (id, description) => dispatch => {
  axios.put(`/api/things/${id}`, description)
    .then(res => res.data)
    .then(newThing => {
      console.log(newThing);
      dispatch(resetThing);
    })
}

export default function (state = {}, action) {
  switch (action.type) {
    case GET_THING:
      return action.thing
    case RESET_THING:
      return {}
    default:
      return state
  }
}
