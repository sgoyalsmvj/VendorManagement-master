import React, { useState } from "react";
import CrudModule from "@/modules/CrudModule";
import LeadForm from "@/forms/JobForm";

function Jobs() {

  const [form, setForm] = useState();

  const entity = "job";
  const searchConfig = {
    displayLabels: ["client"],
    searchFields: "client,email,phone",
    outputValue: "_id",
  };

  const panelTitle = "Jobs Panel";
  const dataTableTitle = "Jobs Lists";
  const entityDisplayLabels = ["client"];

  const readColumns = [
    {
      title: "Date",
      dataIndex: "startdate",
    },
    {
      title: " End Date",
      dataIndex: "enddate",
    },
    {
      title: "Client Name",
      dataIndex: "client",
    },
    {
      title: "Client  HQ Phone No.",
      dataIndex: "hqphone",
    },
    {
      title: "Client HQ E-mail",
      dataIndex: "hqemail",
    },
    {
      title: "Client Site Name",
      dataIndex: "sitename",
    },
    {
      title: "Client site phone",
      dataIndex: "managerphone",
    },
    {
      title: " Client Site email",
      dataIndex: "clientemail",
    },

    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Budget",
      dataIndex: "budget",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Request",
      dataIndex: "request",
    },
  ];
  const dataTableColumns = [
    {
      title: "Date",
      dataIndex: "startdate",
    },
    {
      title: " End Date",
      dataIndex: "enddate",
    },
    {
      title: "Client Name",
      dataIndex: "client",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorname",
    },
    {
      title: "Budget",
      dataIndex: "budget",
    },

  ];

  const ADD_NEW_ENTITY = "Add new Job";
  const DATATABLE_TITLE = "Jobs List";
  const ENTITY_NAME = "job";
  const CREATE_ENTITY = "Create Job";
  const UPDATE_ENTITY = "Update Job";
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
      setForm={setForm}
      createForm={<LeadForm form={form} />}
      updateForm={<LeadForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Jobs;
