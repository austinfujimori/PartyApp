import { ADD_TICKET, REMOVE_TICKET, CLEAR_TICKETS } from "../constants";

export const addTicket = (payload) => {
     return {
          type: ADD_TICKET,
          payload
     }
}


export const removeTicket = (payload) => {
     return {
          type: REMOVE_TICKET,
          payload
     }
}


export const clearTickets = () => {
     return {
          type: CLEAR_TICKETS
     }
}