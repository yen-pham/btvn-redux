import React, { Fragment } from "react";

import { Row, Col, Avatar } from "antd";
import { connect } from "react-redux";
const EmployeeDetail =({employee,ad})=> {
// console.log(employee);
  return employee && (
    <Fragment>
    <Col span={12}>
    <Row justify="center">
      <Col span={20}>
        <Row justify="center" >
        <Row justify="center" className="moreInf">

          <Avatar className="ava"
            src={employee.avatar}
            size={150}
          />
          </Row>
          <Col span={24}>
          <Row justify="center" className="infs">
          <h1>{employee.first_name+" "+employee.last_name}</h1>
            <table className="table">
              <tbody>
                <tr>
                  <td className="inf"> 
                    <b> First Name:</b>
                  </td>
                  <td>{employee.first_name}</td>
                </tr>
                <tr>
                <td className="inf"> 
                    <b> Last Name:</b>
                  </td>
                  <td>{employee.last_name}</td>
                </tr>
                <tr>
                <td className="inf"> 
                    <b> Email:</b>
                  </td>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                <td className="inf"> 
                    <b> Company:</b>
                  </td>
                  <td>{ad.company}</td>
                </tr>
                <tr>
                <td className="inf"> 
                    <b> Text:</b>
                  </td>
                  <td>{ad.text}</td>
                </tr>
              </tbody>
            </table>
            </Row>
          </Col>
        </Row>
        <Row justify="center"></Row>
      </Col>
    </Row>
  </Col>
  </Fragment>

  )
}
const mapStateToProps = state => ({
  employee: state.employee,
  ad:state.ad
});
export default connect(
  mapStateToProps,
  null
)(EmployeeDetail);