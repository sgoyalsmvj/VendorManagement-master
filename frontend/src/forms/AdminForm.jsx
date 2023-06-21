import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

const { Option } = Select;

export default function AdminForm({ isUpdateForm = false }) {
  const [roles, setRoles] = useState();
  const [admins, setAdmins] = useState();

  const fetchedRoles = useFetch(() => request.list("role", {}));
  const fetchedAdmins = useFetch(() => request.list("admin", {}));

  useEffect(() => {
    setAdmins(() => fetchedAdmins.result)
  }, [fetchedAdmins.result])

  useEffect(() => {
    setRoles(() => fetchedRoles.result)
  }, [fetchedRoles.result]);

  return (
    <>
      <Form.Item
        label="E-mail"
        name="email"
        rules={[
          {
            required: true,
            message: "Please input your Email!",
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>
      {!isUpdateForm && (
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input type="password" autoComplete="off" />
        </Form.Item>
      )}

      <Form.Item
        label="name"
        name="name"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label="surname"
        name="surname"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input autoComplete="off" />
      </Form.Item>

      <Form.Item
        label="Manager"
        name="manager"
      >
        <Select
          placeholder="---Select---"
        >
          {admins && admins.map(admin => (<Option value={capitalize(admin.name) + " " + capitalize(admin.surname)}>{capitalize(admin.name) + " " + capitalize(admin.surname)}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Manage"
        name="manage"
      >
        <Select
          mode="multiple"
          placeholder="---Select---"
        >
          {admins && admins.map(admin => (<Option value={capitalize(admin.name) + " " + capitalize(admin.surname)}>{capitalize(admin.name) + " " + capitalize(admin.surname)}</Option>))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Role"
        name="rolename"
        rules={[
          {
            required: true,
            message: "Please input your Role name!",
          },
        ]}
      >
        <Select
          placeholder="---Select---"
        >
          {roles && roles.map(role => (<Option value={role.rolename}>{capitalize(role.rolename)}</Option>))}
        </Select>
      </Form.Item>
    </>
  );
}

function capitalize(string) {
  if (!string) return "";
  return string[0].toUpperCase() + string.substring(1);
}
