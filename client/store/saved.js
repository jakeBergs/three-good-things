import axios from 'axios';

const ADDSAVE = 'ADDSAVE';

const addSave = () => ({type: ADDSAVE})

export default function(state = 0, action) {
  switch (action.type) {
    case ADDSAVE:
      return state + 1;
    default:
      return state;
  }
}

export const saveThing = (thing, userId) => dispatch => ({
  // axios.post
})
