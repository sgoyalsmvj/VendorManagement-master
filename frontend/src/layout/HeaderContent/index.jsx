import React from "react";
import { useDispatch } from "react-redux";

import { Layout, Avatar, Menu, Dropdown } from "antd";

import { UserOutlined } from "@ant-design/icons";
import { logout } from "@/redux/auth/actions";
import uniqueId from "@/utils/uniqueId";
import adminimg from '../../assets/adminimg.png';


const { Header } = Layout;

export default function HeaderContent() {
  const dispatch = useDispatch();
 // how to fetch data from database. kuki i want access of user's image and his email etc.

  const menu = (
    <div
      style={{ border: "1px solid black", padding: "20px", display: "flex", margin: "20px" ,borderRadius:'15px',color:'white',boxShadow:'0px 0px 10px  #002140',background:'white'}}
    >
      <div style={{margin:'10px',marginRight:'20px',}}>
        <img src={adminimg} style={{width:'100px',borderRadius:'100%'}} alt="adminimg" />
      </div>
      <div style={{ display: "flex", flexDirection: "column" ,flexWrap:'wrap',justifyContent:'center',alignItems:'center'}}>
        <h1 style={{ fontSize: 20, marginBottom: 20 }}>Hello Admin!</h1>
        <button style={{border:'none',outline:'none',backgroundColor:'rgb(255 40 40',padding:'5px 10px'}} key={`${uniqueId()}`} onClick={() => dispatch(logout())}>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <Header className="site-layout-background" style={{ padding: 0, background: "none" }}>
      <Dropdown overlay={menu} placement="bottomRight" arrow trigger={["click"]}>
        <Avatar icon={<UserOutlined />} />
      </Dropdown>
    </Header>
  );
}
