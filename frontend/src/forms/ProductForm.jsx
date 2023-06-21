import React from "react";
import { Form, Input } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { UploadProps } from 'antd';
import { Button, message, Upload, Select } from 'antd';
import { useEffect } from "react";
import { useState } from "react";

export default function ProductForm({ isUpdateForm = false }) {
  const [vendorPrice, setVenderPrice] = useState(0);
  const [clientPrice, setClientPrice] = useState(0);
  const [grossmargin, setGrossMargin] = useState(0);

  useEffect(() => { grossMarginCalculation(clientPrice, vendorPrice) }, [grossmargin, clientPrice, vendorPrice]);

  const onVenderPriceChange = (v) => {
    setVenderPrice(v);
  }

  const onClientPriceChange = (q) => {
    setClientPrice(q);
  }

  const grossMarginCalculation = (cPrice, vPrice) => {
    if (cPrice === vPrice) {
      setGrossMargin(0 + '%');
    } else {
      const per = Math.floor(((cPrice - vPrice) / vPrice) * 100);
      setGrossMargin(per + '%');
    }
  }
  return (
    <>
      <Form.Item
        label="Service Name"
        name="productName"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="text" />
      </Form.Item>
      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
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
        label="Unit"
        name="unit"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <select style={{
          width: "100%",
          borderWidth: 1,
          borderColor: 'lightgrey',
          height: 34,
        }}
          placeholder="---Select---"
        >
          <option value="Runningfeet">Running Feet</option>
          <option value="Runningmeter">Running Meter</option>
          <option value="squarefeet">Square Feet</option>
          <option value="squaremeter">Square Meter</option>
          <option value="kilogram">Kilogram</option>
          <option value="nos">Nos</option>
          <option value="lumsum">Lumsum</option>
        </select>
      </Form.Item>

      <Form.Item
        label="Client HQ Name"
        name="client"
      >
        <Input type="text" />
      </Form.Item>

      <Form.Item
        label=" Client Price"
        name="price"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number"
          value={clientPrice}
          onChange={(e) => onClientPriceChange(e.target.value)}
        />
      </Form.Item>

      <label>Gross Margin</label>
      <div style={{
        borderWidth: 1,
        borderColor: 'lightgrey',
        borderStyle: 'solid',
        width: '100%',
        height: 29,
        paddingLeft: 10,
        marginBottom: 19,
      }}>
        <p>{grossmargin}</p>
      </div>
      <Form.Item
        label=" VendorPrice"
        name="vendorPrice"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input type="number"
          value={vendorPrice}
          onChange={(e) => onVenderPriceChange(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Attachment if any"
        name="upload"
      >
        <Input type="File" />
      </Form.Item>
    </>
  );
}
