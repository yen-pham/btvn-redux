import React, { useEffect, Fragment } from "react";
import { connect } from "react-redux";
import { getEmployeesAction } from "./redux/actions";
import   "./App.css";
import "antd/dist/antd.css";
import { Row } from "antd";
import Employees from "./Component/Employees";
import EmployeeDetail from "./Component/EmployeeDetail";
import ModalEmployee from "./Component/ModalEmployee";

 const App=({getEmployees,employees,loading})=> {
  useEffect(() => {
    getEmployees(1);
    getEmployees(2);

  }, []);
  return (
    <Fragment>
      <Row justify="center">
        {/* <Col span={24}> */}

        <Employees/>
         {/* </Col> */}
         <EmployeeDetail/>
         <ModalEmployee/>
      </Row>
      </Fragment>
  );
}

const mapStateToProps = state => ({
  employees: state.employees,
  loading: state.loading
});

const mapDispatchToProps = dispatch => ({
  getEmployees: (page) => dispatch(getEmployeesAction(page))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
