import React from "react";
import { Button, Dropdown, Menu, Table } from "antd";

import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

import {
  EllipsisOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

function DropDownRowMenu({ row }) {
  const Show = () => { };
  function Edit() { }
  function Delete() { }
  return (
    <Menu style={{ width: 130 }}>
      <Menu.Item icon={<EyeOutlined />} onClick={Show}>
        Show
      </Menu.Item>
      <Menu.Item icon={<EditOutlined />} onClick={Edit}>
        Edit
      </Menu.Item>
      <Menu.Item icon={<DeleteOutlined />} onClick={Delete}>
        Delete
      </Menu.Item>
    </Menu>
  );
}

export default function RecentTable({ ...props }) {
  let { entity, dataTableColumns, name, moveToNextTable } = props;
  const dOptions = {
    schedule: [
      { label: 'Requirement Received', value: 'requirement received' },
      { label: 'Site Visit Done', value: 'site visit done' },
      { label: 'Vendor BOQ Received', value: 'vendor boq received' },
      { label: 'Client BOQ Received', value: 'client boq received' },
      { label: 'Email Confimation Received', value: 'email confirmation received' },
      { label: 'PO Received', value: 'po received' },
      { label: 'Vendor Allotted', value: 'vendor allotted' },
    ],
    start: [
      { label: 'Team Aligned', value: 'team aligned' },
      { label: 'Delay From Client', value: 'delay from client' },
    ],
    close: [
      { label: 'Work Done', value: 'work done' },
      { label: 'Updated BOQ Sent', value: 'updated boq sent' },
      { label: 'Admin Approval', value: 'admin approval' },
    ],
    audit: [
      { label: 'Client Updated BOQ Sent', value: 'client updated boq sent' },
      { label: 'Update Approval', value: 'updated po received' },
      { label: 'Sent for invoicing', value: 'sent for invoicing' },
    ],
    finished: [
      { label: 'Invoice Sent', value: 'invoice sent' },
      { label: 'Payment Received', value: 'payment received' },
      { label: 'Invoice Received', value: 'invoice received' },
      { label: 'Payment Done', value: 'payment done' },
    ]
  };

  dataTableColumns = [
    ...dataTableColumns,
    {
      title: "",
      render: (row) => {
        return (
          <Button onClick={() => moveToNextTable(row)}>Next</Button>
        )
      },
    },
  ];

  const asyncList = () => {
    return request.list(entity);
  };
  const { result, isLoading, isSuccess } = useFetch(asyncList);
  const items = () => {
    if (isSuccess && result) {

      return result.filter(res => {
        return dOptions[name].some(j => {
          if (res['status'] == 'pending' && j.value == 'requirement received') {
            return true;
          }
          return j['value'] == res['status']
        })
      });
    };
    return [];
  };
  return (
    <>
      <Table
        columns={dataTableColumns}
        rowKey={(item) => item._id}
        dataSource={isSuccess && items()}
        pagination={false}
        loading={isLoading}
      />
    </>
  );
}
