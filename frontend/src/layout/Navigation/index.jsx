import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import {
  CustomerServiceOutlined,
  FileSyncOutlined,
  DashboardOutlined,
  TeamOutlined,
} from "@ant-design/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const auth = JSON.parse(localStorage.getItem("auth"));
  const permissions = auth ? auth.permissions : null;

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <>
      <Sider 
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        style={{
          zIndex: 10,
        }}
      >
        <h2
          style={{
            fontSize: 30,
            padding: 10,
            color: "white",
            marginTop: 8,
            textAlign: "center",
          }}
        >
          AKORITA
        </h2>

        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            <Link to="/">Dashboard</Link>
          </Menu.Item>

          {(permissions === "superadmin" ||
            (permissions &&
              permissions.includes &&
              permissions.includes("vendor"))) && (
            <Menu.Item key="2" icon={<CustomerServiceOutlined />}>
              <Link to="/vendor">Vendor</Link>
            </Menu.Item>
          )}

          {(permissions === "superadmin" ||
            (permissions &&
              permissions.includes &&
              permissions.includes("job"))) && (
            <Menu.Item key="21" icon={<TeamOutlined />}>
              <Link to="/lead">Jobs</Link>
            </Menu.Item>
          )}

          {(permissions === "superadmin" ||
            (permissions &&
              permissions.includes &&
              permissions.includes("service"))) && (
            <Menu.Item key="3" icon={<FileSyncOutlined />}>
              <Link to="/product">Services</Link>
            </Menu.Item>
          )}

          {(permissions === "superadmin" ||
            (permissions &&
              permissions.includes &&
              (permissions.includes("admin") ||
                permissions.includes("role")))) && (
            <SubMenu
              key="admin"
              title="Admin Management"
              icon={<TeamOutlined />}
            >
              {(permissions === "superadmin" ||
                (permissions &&
                  permissions.includes &&
                  permissions.includes("admin"))) && (
                <Menu.Item key="adminrole">
                  <Link to="/admin">Admin</Link>
                </Menu.Item>
              )}

              {(permissions === "superadmin" ||
                (permissions &&
                  permissions.includes &&
                  permissions.includes("role"))) && (
                <Menu.Item key="role">
                  <Link to="/Role">Admin Roles & Permissions</Link>
                </Menu.Item>
              )}

              {permissions === "superadmin" && (
                <Menu.Item key="report">
                  <Link to="/report">Report</Link>
                </Menu.Item>
              )}
            </SubMenu>
          )}
        </Menu>
      </Sider>
    </>
  );
}

export default Navigation;
