import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { crud } from "@/redux/crud/actions";
import { useCrudContext } from "@/context/crud";
import { selectCreatedItem } from "@/redux/crud/selectors";

import { Button, Form } from "antd";
import Loading from "@/components/Loading";

const permissions = JSON.parse(localStorage.getItem('auth')).permissions;

export default function CreateForm({ config, formElements, setForm }) {

  let { entity } = config;
  const dispatch = useDispatch();
  const { isLoading, isSuccess } = useSelector(selectCreatedItem);
  const { crudContextAction } = useCrudContext();
  const { panel, collapsedBox, readBox } = crudContextAction;
  const [form] = Form.useForm();



  const onSubmit = (fieldsValue) => {
    dispatch(crud.create(entity, fieldsValue));
  };

  useEffect(() => {
    if (isSuccess) {
      readBox.open();
      collapsedBox.open();
      panel.open();
      form.resetFields();
      dispatch(crud.resetAction("create"));
      dispatch(crud.list(entity));
    }
    if (entity == "job") {
      setForm(form);
    }
  }, [isSuccess]);

  return (
    <Loading isLoading={isLoading}>
      {permissions == 'superadmin' || permissions['create'].includes(entity == 'product' ? 'service' : entity) ?
        (<Form form={form} layout="vertical" onFinish={onSubmit}>
          {formElements}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>) :
        (<>You don't have authorization to create new {(entity == 'product') ? 'services' : { entity }}</>)}
    </Loading>
  );
}
