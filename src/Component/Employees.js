import React, { Fragment } from "react";

import { Row, Col, List, Avatar, Skeleton, Typography, Input, Button } from "antd";
import { connect } from "react-redux";
import { showEmployee, deleteEmployee, showModal, searchEmployee } from "../redux/actions";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useState } from "react";

const Employees = ({ employees, showEmployeeDetail, deleteEm,showMd,searchRs,searchEm }) => {
  //  console.log(employees);
  const [isSearch,setIsSearch] = useState(false)
  const searchHandle=(e)=>{
    searchEm(e);
    e? setIsSearch(true):setIsSearch(false);
  }
  return (
    <Fragment>
      <Col span={12}>
        <Row justify="center">
          <Col span={20}>
            <Typography.Title style={{ color: "blue" }}>
              Employees
            </Typography.Title>
            <Col span={24}>
              <Input.Search
                placeholder="Search Employee"
                // onSearch={(value) => console.log(value)}
                // onChange={setIsSearch(true)}
                onSearch={searchHandle}
                style={{ width: 200, marginRight:"20%" }}
              />
              <Button type="primary" onClick={()=>showMd()}>
                <PlusCircleOutlined />
                Create
              </Button>
            </Col>
            <List
              className="demo-loadmore-list"
              itemLayout="horizontal"
              // loadMore={loadMore}
              dataSource={isSearch ?searchRs: employees}
              renderItem={(item, key) => (
                <List.Item
                  actions={[
                    <a key="list-loadmore-edit" id={key} onClick={(employee)=>showMd(item)}>
                      update
                    </a>,
                    <a
                      key="list-loadmore-more"
                      onClick={(id) => deleteEm(item.id)}
                    >
                      delete
                    </a>,
                  ]}
                >
                  <Skeleton avatar title={false} loading={item.loading} active>
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={
                        <a onClick={(id) => showEmployeeDetail(item.id)}>
                          {item.first_name + " " + item.last_name}
                        </a>
                      }
                      // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </Skeleton>
                </List.Item>
              )}
            />
          </Col>
        </Row>
      </Col>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  employees: state.employees,
  loading: state.loading,
  searchRs: state.searchResult
});
const mapDispatchToProps = (dispatch) => {
  return {
    showEmployeeDetail: (id) => {
      dispatch(showEmployee(id));
    },
    deleteEm: (id) => {
      dispatch(deleteEmployee(id));
    },
    showMd: (employee) => {
      dispatch(showModal(employee));
    },
    searchEm: (searchKey) => {
      dispatch(searchEmployee(searchKey));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Employees);
