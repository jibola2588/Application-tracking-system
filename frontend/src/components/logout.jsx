import React from 'react';
import {Modal } from 'antd';
const LogoutModal = (props) => {
console.log(props,'props is here')

const {isModalOpen,handleOk,handleCancel} = props;
  return (
    <>
      <Modal title="Log out" 
       visible={isModalOpen} 
      onOk={handleOk} onCancel={handleCancel}>
        <p>Confirmation to log out !</p>

      </Modal>
    </>
  );
};

export default LogoutModal;