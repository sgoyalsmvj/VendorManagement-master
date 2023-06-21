import React, { useEffect, useState } from "react";
import { Form, Input, Checkbox, Select, Space } from "antd";
import useFetch from "@/hooks/useFetch";
import { request } from "@/request";

const { Option } = Select;

export default function RoleForm({ isUpdateForm = false }) {
  const [jobs, setJob] = useState();
  const [vendors, setVendor] = useState();
  const [services, setService] = useState();
  const options = [
    { label: 'Service', value: 'service' },
    { label: 'Vendor', value: 'vendor' },
    { label: 'Job', value: 'job' },
    { label: 'Admin', value: 'admin' },
    { label: 'Role', value: 'role' }
  ];
  const dashboard = [
    { label: 'Pending to Schedule', value: 'schedule' },
    { label: 'Pending to Start', value: 'start' },
    { label: 'Pending to Close', value: 'close' },
    { label: 'Audit And Checkout', value: 'audit' },
    { label: 'Pending From Finance', value: 'finished' }
  ]

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
      {label:'Advance Payment Processed',value:'advance payment processed'},
      { label: 'Payment Done', value: 'payment done' },

    ]
  };

  const fetchedJobs = useFetch(() => request.list("job", {}));

  useEffect(() => {
    if (fetchedJobs.result) {
      setJob((prev) => {
        const job = [];
        fetchedJobs.result.map((j) => {
          const { title, _id } = j;
          job.push({ label: title, value: _id });
        })
        return job;
      })
    }
  }, [fetchedJobs.result]);


  const fetchedVendor = useFetch(() => request.list("vendor", {}));

  useEffect(() => {
    if (fetchedVendor.result) {
      setVendor((prev) => {
        const vendor = [];
        fetchedVendor.result.map((j) => {
          const { vendorname, _id } = j;
          vendor.push({ label: vendorname, value: _id });
        })
        return vendor;
      })
    }
  }, [fetchedVendor.result]);

  const fetchedServices = useFetch(() => request.list("product", {}));

  useEffect(() => {
    if (fetchedServices.result) {
      setService((prev) => {
        const service = [];
        fetchedServices.result.map((j) => {
          const { productName, _id } = j;
          service.push({ label: productName, value: _id });
        })
        return service;
      })
    }
  }, [fetchedServices.result]);

  return (
    <>
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
        <Input />
      </Form.Item>

      <Form.Item
        label="Departments"
        name="departments"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          mode="multiple"
          placeholder="---Select---"
        >
          <Option value="design">Design</Option>
          <Option value="audit">Audit</Option>
          <Option value="r&m">R&M</Option>
          <Option value="project">Project</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="View"
        name="view"
        rules={[
          {
            required: false,

          },
        ]}
      >
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item
        label="Create"
        name="create"
        rules={[
          {
            required: false,

          },
        ]}
      >
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item
        label="Update"
        name="update"
        rules={[
          {
            required: false,

          },
        ]}
      >
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item
        label="Delete"
        name="delete"
        rules={[
          {
            required: false,

          },
        ]}
      >
        <Checkbox.Group options={options} />
      </Form.Item>

      <Form.Item
        label="Announcement"
        name="announcement"
        rules={[
          {
            required: false,

          },
        ]}
      >
        <Checkbox.Group options={[{ label: 'Announcement', value: 'announcement' }]} />
      </Form.Item>

      {dashboard.map(d => {
        return (<Form.Item label={d.label} name={d.value}>
          <Checkbox.Group options={dOptions[d.value]} />
        </Form.Item>)
      })}

      <Form.Item label="Jobs" name="jobs">
        <Select
          showSearch
          mode="multiple"
          placeholder="---Select---"
          options={jobs}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        ></Select>
      </Form.Item>

      <Form.Item label="Services" name="services">
        <Select
          showSearch
          mode="multiple"
          placeholder="---Select---"
          options={services}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        ></Select>
      </Form.Item>

      <Form.Item label="Vendors" name="vendors">
        <Select
          showSearch
          mode="multiple"
          placeholder="---Select---"
          options={vendors}
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        ></Select>
      </Form.Item>

    </>

  );
}
