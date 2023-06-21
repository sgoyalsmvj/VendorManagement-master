import React from "react";
import { useEffect } from "react";
import { useState } from "react";

import { DatePicker, Form, Input, Select, Space } from "antd";
import { request } from "@/request";
import useFetch from "@/hooks/useFetch";

import SelectAsync from "@/components/selectasyn";
import PopupSelect from "@/components/PopupSelect";
import moment from "moment";

const { Option } = Select;

export default function JobForm({ isUpdateForm = false, form }) {
  // const [vendors, setVendors]=useState('Carpenter');
  const [service, setService] = useState([]);
  const [customService, setCustomService] = useState([]);
  const [vendoroptions, setVendorOptions] = useState([]);
  const [budget, setBudget] = useState(0);
  const [quantity, setQuantity] = useState({});
  const [vendorPrice, setVendorPrice] = useState({});
  const [serviceFetch, setResult] = useState();
  const [client, setClient] = useState("");

  const entity = "vendor";
  const { TextArea } = Input;

  const fetched = useFetch(() => request.list("product", {}));

  useEffect(() => {
    setResult(() => {
      return fetched.result;
    });
  }, [fetched.result]);

  const fetchvendors = () => {
    return request.list(entity, {});
  };

  const changeEnd = (date, dateString) => {
    form.setFieldsValue({
      enddate: dateString,
    });
  };

  const changeStart = (date, dateString) => {
    form.setFieldsValue({
      startdate: dateString,
    });
  };

  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        vendorprice: vendorPrice,
        customservice: customService,
        budget: budget,
        service: [
          ...service.map((ser) => {
            return ser[0];
          }),
        ],
        quantity: quantity,
        client: client,
      });
    }
  }, [vendorPrice, customService, budget, service, quantity, client]);

  const { result, isLoading, isSuccess } = useFetch(fetchvendors);
  var newvendor = [];
  useEffect(() => {
    if (Array.isArray(result)) {
      result.forEach((item) => {
        newvendor.push({ value: item.name, label: item.name });
      });
    }
    setVendorOptions(newvendor);
  }, [result]);

  return (
    <>
      <Form.Item
        label="Job Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please input your job tittle!",
          },
        ]}
      >
        <Input type="text" />
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
        <Select mode="multiple" placeholder="---Select---">
          <Option value="design">Design</Option>
          <Option value="audit">Audit</Option>
          <Option value="r&m">R&M</Option>
          <Option value="project">Project</Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Client HQ Name"
        name="client"
        rules={[
          {
            required: true,
            message: "Please input your client name!",
          },
        ]}
      >
        <Select placeholder="---Select---" value={client} onChange={setClient}>
          {serviceFetch &&
            serviceFetch.length > 0 &&
            serviceFetch.map((service) => {
              const name = service.client;
              return (
                <Option key={service._id} value={name} label={name}>
                  <Space>{name}</Space>
                </Option>
              );
            })}
        </Select>
      </Form.Item>

      <Form.Item
        label=" Client  HQ Phone No."
        name="hqphone"
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        label=" Client HQ E-mail"
        name="hqemail"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Client Site Name"
        name="sitename"
        rules={[
          {
            required: true,
            message: "Please input your client name!",
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        name="managerphone"
        label=" Client Site Phone No."
        rules={[
          {
            required: true,
            message: "Please input your phone!",
          },
        ]}
      >
        <Input type="Number" />
      </Form.Item>
      <Form.Item
        label=" Client Site E-mail"
        name="clientemail"
        rules={[
          {
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item name="service" label="Services" style={{ marginBottom: 0 }}>
        <div>
          {service.length > 0 ? (
            <div style={{ display: "flex", gap: "24px", marginBottom: "8px" }}>
              <p style={{ width: "50%", margin: 0 }}>Name</p>
              <p style={{ width: "50%", margin: 0 }}>Quantity</p>
            </div>
          ) : (
            ""
          )}
          {service.map((s) => (
            <div
              key={s[0]}
              style={{
                marginBottom: "8px",
                display: "flex",
                gap: "24px",
              }}
            >
              <Input value={s[1]} />
              <Input value={quantity[s[0]]} />
            </div>
          ))}
        </div>
        <PopupSelect
          service={service}
          setService={setService}
          quantity={quantity}
          setQuantity={setQuantity}
          budget={budget}
          setBudget={setBudget}
          vendorPrice={vendorPrice}
          setVendorPrice={setVendorPrice}
          customService={customService}
          setCustomService={setCustomService}
          result={serviceFetch}
          setResult={setResult}
          client={client}
        />
      </Form.Item>

      <Form.Item name="quantity" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Form.Item name="vendorprice" style={{ display: "none" }}>
        <Input />
      </Form.Item>
      <Form.Item name="customservice" style={{ display: "none" }}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Job Location"
        name="location"
        rules={[
          {
            required: true,
            message: "Please input the city name",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Vendors"
        name="vendorname"
        // rules={[
        //   {
        //     required: true,
        //     message: "Please select the Vendor",
        //   },
        // ]}
      >
        <SelectAsync
          entity={"vendor"}
          displayLabels={["vendorname"]}
          outputValue={"vendorname"}
        ></SelectAsync>
      </Form.Item>

      <Form.Item label="Start Date" name="startdate">
        <Space direction="vertical">
          <DatePicker onChange={changeStart} />
        </Space>
      </Form.Item>

      <Form.Item label="End Date" name="enddate">
        <Space direction="vertical">
          <DatePicker onChange={changeEnd} />
        </Space>
      </Form.Item>

      <Form.Item label="Budget" name="budget">
        <Input value={budget} disabled />
      </Form.Item>
    </>
  );
}
