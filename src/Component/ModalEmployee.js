import { Modal, Button, Form, Upload, Input } from "antd";
import React, { Component, useState, Fragment, useEffect } from "react";
import { UploadOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { showModal, closeModal, updateEmployees } from "../redux/actions";
import { connect } from "react-redux";

// class ModalEmployee extends Component {
const ModalEmployee = ({visible, closeMd,upEmployees,employeeUp}) => {
  const [imgUp, setImgUp] = useState([]);
  // const [visible, setVisible] = useState(false);
  const [preImg, setPreImg] = useState({
    previewVisible: false,
    previewImage: "",
  });
  const [employee, setEmployee] = useState({
    last_name: "",
    first_name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    employeeUp && setEmployee(employeeUp);
    employeeUp && setImgUp([
     { thumbUrl: employeeUp.avatar,
      uid: '-1',
      status: 'done',
    }
    ])  
  }, [employeeUp]);  
  const onChange = (e) => {
    let em = employee;
    em[e.target.name] = e.target.value;
    setEmployee({...em});
  };

  // const showModal = () => {
  //   setVisible(true);
  // };

  const handleOk = (e) => {
   
    // console.log(employee);
    upEmployees(employee);
    closeMd();
    setImgUp([...[]]);
    setEmployee({...{
      last_name: "",
      first_name: "",
      email: "",
      avatar: "",
    }})

    // setVisible(false);
  };
  const normFile = (e) => {
    let ava = Array.isArray(e) ? e : e && e.fileList;
    setImgUp(ava);
    let em = employee;
    em.avatar = ava.length>0 ? ava[0].thumbUrl:'';
    setEmployee(em);

  };

  const handleCancel = (e) => {
    // setVisible(false);
    closeMd();
    setImgUp([...[]]);
    setEmployee({...{
      last_name: "",
      first_name: "",
      email: "",
      avatar: "",
    }})
  };
  const handlePreview = (file) => {
    setPreImg({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };
  const handleCancelPre = () => {
    setPreImg({
      previewImage: "",
      previewVisible: false,
    });
  };
  // console.log(imgUp);

  return (
    <Fragment>
      
      <Modal
        title={employeeUp? "Update Employee" : "Create Employee"}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...{
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
          }}
        >
          <Form.Item
            label="First Name"
            // valuePropName={imgUp}
            // getValueFromEvent={normFile}
          >
            <Input name="first_name" onChange={onChange}  value={employee.first_name}/>
          </Form.Item>
          <Form.Item
            label="Last Name"
            // valuePropName={imgUp}
            // getValueFromEvent={normFile}
          >
            <Input name="last_name" onChange={onChange}  value={employee.last_name} />
          </Form.Item>
          <Form.Item
            label="Email"
            // valuePropName={imgUp}
            // getValueFromEvent={normFile}
          >
            <Input name="email" onChange={onChange}  value={employee.email}/>
          </Form.Item>
          <Form.Item
            name="avatar"
            label="Avatar"
            valuePropName={imgUp}
            getValueFromEvent={normFile}
          >
            <Upload
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              listType="picture"
              fileList={imgUp}
              onPreview={handlePreview}
              // defaultFileList= {imgUp}
            >
              {imgUp.length < 1 && (
                <Button icon={<UploadOutlined />}>Upload</Button>
              )}
            </Upload>
          </Form.Item>
          <Modal
            visible={preImg.previewVisible}
            onCancel={handleCancelPre}
            footer={null}
          >
            <img
              alt="example"
              style={{ width: "100%" }}
              src={preImg.previewImage}
            />
          </Modal>
        </Form>
      </Modal>
    </Fragment>
  );
};
const mapStateToProps = (state) => ({
  visible: state.showModal,
  employeeUp:state.employeeUpdate
});
const mapDispatchToProps = (dispatch) => {
  return {
    closeMd: () => {
      dispatch(closeModal());
    },
    upEmployees: (employee) => {
      dispatch(updateEmployees(employee));

    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEmployee);
