import { ADD_TICKET, REMOVE_TICKET, CLEAR_TICKETS } from "../constants";

const ticketsItems = (state = [], action) => {
     switch (action.type) {
          case ADD_TICKET:
               return [...state, action.payload]
          case REMOVE_TICKET:
               return state.filter(ticketsItem => ticketsItem !== action.payload)
          case CLEAR_TICKETS:
               return state = []
     }


     return state
}

export default ticketsItems