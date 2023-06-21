import React from "react";
import CrudModule from "@/modules/CrudModule";
import CustomerForm from "@/forms/CustomerForm";

function Customer() {
  const entity = "vendor";
  const searchConfig = {
    displayLabels: ["company", "surname", "vendorname"],
    searchFields: "service,surname,vendorname",
    outputValue: "_id",
  };

  const panelTitle = "Vendor Panel";
  const dataTableTitle = "Vendor Lists";
  const entityDisplayLabels = ["service"];
  const readColumns = [
    {
      title: "Vendor Name",
      dataIndex: "vendorname",
    },
    {
      title: "Vendor Surname",
      dataIndex: "surname",
    },
    {
      title: "Service",
      dataIndex: "service",
    },
    {
      title: "Alternative Phone",
      dataIndex: "alternatephone",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];
  const dataTableColumns = [
    {
      title: "Vendor Name",
      dataIndex: "vendorname",
    },
    {
      title: "Vendor Surname",
      dataIndex: "surname",
    },
    {
      title: "Service",
      dataIndex: "service",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phone",
    },
  ];
  const ADD_NEW_ENTITY = "Add New Vendor";
  const DATATABLE_TITLE = "Vendor List";
  const ENTITY_NAME = "vendor";
  const CREATE_ENTITY = "Create Vendor";
  const UPDATE_ENTITY = "Update Vendor";
  const config = {
    entity,
    panelTitle,
    dataTableTitle,
    ENTITY_NAME,
    CREATE_ENTITY,
    ADD_NEW_ENTITY,
    UPDATE_ENTITY,
    DATATABLE_TITLE,
    readColumns,
    dataTableColumns,
    searchConfig,
    entityDisplayLabels,
  };
  return (
    <CrudModule
      createForm={<CustomerForm />}
      updateForm={<CustomerForm isUpdateForm={true} />}
      config={config}
    />
  );
}
export default Customer;
