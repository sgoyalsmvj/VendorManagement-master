import React from "react";

import CrudModule from "@/modules/CrudModule";
import LeadForm from "@/forms/JobForm";
import RoleForm from "@/forms/RoleForm";

function Role() {
  const entity = "role";
  const searchConfig = {
    displayLabels: ["role"],
    searchFields: "role",
    outputValue: "_id",
  };

  const panelTitle = "Role Panel";
  const dataTableTitle = "Role Lists";
  const entityDisplayLabels = ["role"];

  const readColumns = [
    {
      title: "Role",
      dataIndex: "rolename",
    },
    {
      title: "View",
      dataIndex: "view",
    },
    {
      title: "Create",
      dataIndex: "create",
    },
    {
      title: "Delete",
      dataIndex: "delete",
    },
    {
      title: "Update",
      dataIndex: "update",
    },
  ];
  const dataTableColumns = [
    {
      title: "Role",
      dataIndex: "rolename",
    },


  ];

  const ADD_NEW_ENTITY = "Add new Role";
  const DATATABLE_TITLE = "Role List";
  const ENTITY_NAME = "role";
  const CREATE_ENTITY = "Create Role";
  const UPDATE_ENTITY = "Update Role";
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
      createForm={<RoleForm />}
      updateForm={<RoleForm isUpdateForm={true} />}
      config={config}
    />
  );
}

export default Role;
