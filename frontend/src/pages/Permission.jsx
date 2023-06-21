// import React from "react";

// import CrudModule from "@/modules/CrudModule";
// import LeadForm from "@/forms/JobForm";
// import PermissionForm from "@/forms/PermissionForm";

// function Permission() {
//   const entity = "permission";
//   const searchConfig = {
//     displayLabels: ["Permission"],
//     searchFields: "Permission",
//     outputValue: "_id",
//   };

//   const panelTitle = "Permission Panel";
//   const dataTableTitle = "Permission Lists";
//   const entityDisplayLabels = ["Permission"];

//   const readColumns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//     },
//     {
//       title: "Permission",
//       dataIndex: "Permissionname",
//     },
    
//     {
//       title: "Status",
//       dataIndex: "status",
//     },
    
//   ];
//   const dataTableColumns = [
//     {
//       title: "Date",
//       dataIndex: "date",
//     },
//     {
//       title: "Permission",
//       dataIndex: "Permissionname",
//     },
    
  
//   ];

//   const ADD_NEW_ENTITY = "Add new Permission";
//   const DATATABLE_TITLE = "Permission List";
//   const ENTITY_NAME = "permission";
//   const CREATE_ENTITY = "Create Permission";
//   const UPDATE_ENTITY = "Update Permission";
//   const config = {
//     entity,
//     panelTitle,
//     dataTableTitle,
//     ENTITY_NAME,
//     CREATE_ENTITY,
//     ADD_NEW_ENTITY,
//     UPDATE_ENTITY,
//     DATATABLE_TITLE,
//     readColumns,
//     dataTableColumns,
//     searchConfig,
//     entityDisplayLabels,
//   };
//   return (
//     <CrudModule
//       createForm={<PermissionForm />}
//       updateForm={<PermissionForm isUpdateForm={true} />}
//       config={config}
//     />
//   );
// }

// export default Permission;
