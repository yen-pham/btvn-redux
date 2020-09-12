import {
  GET_EMPLOYEES,
  GET_EMPLOYEES_SUCCESS,
  GET_EMPLOYEES_FAIL,
  SHOW_EMPLOYEE,
  DELETE_EMPLOYEE,
  SHOW_MODAL,
  CLOSE_MODAL,
  CREATE_EMPLOYEE,
  UPDATE_EMPLOYEE,
  SEARCH_EMPLOYEE
} from "./constants";

const initialState = {
  employees: [],
  ad:null,
  loading: false,
  employee:null,
  employeeUpdate:null,
  showModal: false,
  searchResult:[]
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_EMPLOYEES:
      return {
        ...state,
        loading: true
      };
    case   GET_EMPLOYEES_SUCCESS    :
      return {
        ...state,
        loading: false,
        employees: [...state.employees,...action.payload.data],
        ad:action.payload.ad
      };
    case GET_EMPLOYEES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case SHOW_EMPLOYEE:
      return {
        ...state,
        employee: state.employees.find(employee=> employee.id===action.payload)
      };
    case DELETE_EMPLOYEE:
      return {
        ...state,
        employees: state.employees.filter(employee=> employee.id!==action.payload),
        employee: action.id===state.employee && null
      };
    case SHOW_MODAL:
      // console.log(action.payload);
      return {
        ...state,
        showModal:true,
        employeeUpdate : action.payload && action.payload
      };
    case CLOSE_MODAL:
     
      return {
        ...state,
        showModal:false,
        employeeUpdate : null
      };
    case CREATE_EMPLOYEE:
      let id= (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase();
      return {
        ...state,
        employees :[...state.employees,{id,...action.payload}],
      };
    case UPDATE_EMPLOYEE:
      let employees = state.employees;
      employees[employees.findIndex(employee=> employee.id===action.payload.id)]=action.payload;
      return {
        ...state,
        employees:[...employees],
        employeeUpdate:null
      };
    case SEARCH_EMPLOYEE:
    return {
        ...state,
        searchResult:[...state.employees.filter(em=> (em.first_name+em.last_name).toUpperCase().search(action.payload.toUpperCase())>-1)]
      };

    default:
      return state;
  }
}


export default rootReducer;
