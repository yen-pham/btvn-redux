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

export const getEmployeesPendingAction = () => ({
  type: GET_EMPLOYEES
});
export const getEmployeesSuccessAction = data => ({
  type: GET_EMPLOYEES_SUCCESS,
  payload: data
});
export const getEmployeesFailAction = error => ({
  type: GET_EMPLOYEES_FAIL,
  payload: error
});
export const getEmployeesAction = (page) => {
  return dispatch => {
    try {
      dispatch(getEmployeesPendingAction());
      return fetch(`https://reqres.in/api/users?page=${page}`, {
        method: "GET"
        
      })
        .then(res => res.json())
        .then(data => dispatch(getEmployeesSuccessAction(data)));
    } catch (error) {
      dispatch(getEmployeesFailAction(error));
    }
  };
};
export const showEmployee =(id)=>({
      type: SHOW_EMPLOYEE,
      payload: id
    })
export const deleteEmployee =(id)=>({
      type: DELETE_EMPLOYEE,
      payload: id
    })
export const showModal =(employee)=>({
      type: SHOW_MODAL,
      payload: employee
    })
export const closeModal =()=>({
      type: CLOSE_MODAL
    })
export const searchEmployee =(searchKey)=>({
      type: SEARCH_EMPLOYEE,
      payload:searchKey
    })
export const updateEmployees =(employee)=>(
  employee.id ?{
    type: UPDATE_EMPLOYEE,
    payload: employee
    }:{
      type: CREATE_EMPLOYEE,
      payload: employee
    })




