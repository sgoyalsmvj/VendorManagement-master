import React, { useState } from "react";

import * as XLSX from "xlsx";
import { Button, DatePicker, Select } from "antd";

import useFetch from "@/hooks/useFetch";
import { request } from "@/request";

// STYLING FOR REPORTS SECTION
const { Option } = Select;
const rowStyle = {
  display: "grid",
  gap: "20px",
  gridTemplateColumns: "repeat(5, 1fr)",
};


const header = {
  fontWeight: "Bold",
  fontSize: "18px",
};

const colStyle = {
  display: "flex",
  flexDirection: "column",
};

const container = {
  padding: "20px",
  maxWidth: "1200px",
  margin: "0 auto",
  position: "relative",
  height: "100vh",
  marginTop: "40px",
  background: "#fff",
};

const button = {
  background: "#FF2828",
  color: "white",
};
// const finishedJobs  = jobs whose status is finished

const Report = () => {
  const [selectedFilter, setSelectedFilter] = useState('finished jobs');
  const jobs = useFetch(() => request.list("job", {})).result;
  console.log(jobs);
  
  const vendors = useFetch(() => request.list("vendor", {})).result;
  const products = useFetch(() => request.list("product", {})).result;

  const handleFilterChange = (value) => {
    setSelectedFilter(value);
  };

  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "DataSheet.xlsx");
  };

  return (
    <>
      <div>
        <h1 style={{fontSize:'30px',textAlign:'center', margin:'10px',marginTop:"20px"}}>
            Reports
        </h1>
        <span style={{fontSize:'20px',margin:'10px',marginLeft:'50px'}}>Filter Reports By :</span>
        <Select
          placeholder="Select Filter"
          onChange={handleFilterChange}
          style={{ width: 200, margin:'20px', marginLeft:'5px'}}
        >
          <Option value="finished jobs">Finished Jobs</Option>
          <Option value="vendors">Vendors</Option>
          <Option value="products">Product</Option>
        </Select>

        {selectedFilter === "finished jobs" && (
          <div>
            {jobs &&  (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                  <p>Title</p>
                  <p>Status</p>
                  <p>ID</p>
                  <p>Client</p>
                  <p>Budget</p>
                </div>
                <div style={colStyle}>
                  {jobs &&

                    jobs.filter((j) => j.status === "invoice sent").map((j) => {
                      return (
                        <div style={rowStyle}>
                          <p>{j["title"]}</p>
                          <p>{j["status"]}</p>
                          <p>{j["_id"]}</p>
                          <p>{j["client"]}</p>
                          <p>{j["budget"]}</p>
                        </div>
                      );
                    })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button style={button} onClick={() => downloadExcel(jobs.filter((j)=>j.status==='invoice sent'))}>
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}

        {selectedFilter === "vendors" && (
          <div>
            {vendors && (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                  <p>Vendor Name</p>
                  <p>Status</p>
                  <p>ID</p>
                  <p>Account</p>
                  <p>Service</p>
                </div>
                <div style={colStyle}>
                  {vendors &&
                    vendors.map((j) => {
                      return (
                        <div style={rowStyle}>
                          <p>{j["vendorname"]}</p>
                          <p>{j["status"]}</p>
                          <p>{j["_id"]}</p>
                          <p>{j["account"]}</p>
                          <p>{j["service"]}</p>
                        </div>
                      );
                    })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button style={button} onClick={() => downloadExcel(jobs)}>
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}

        {selectedFilter === "products" && (
          <div>
            {products && (
              <div style={container}>
                <div style={{ ...rowStyle, ...header }}>
                  <p>Product Name</p>
                  <p>Price</p>
                  <p>Client</p>
                  <p>Vendor Price</p>
                  <p>ID</p>
                </div>
                <div style={colStyle}>
                  {products &&
                    products.map((j) => {
                      return (
                        <div style={rowStyle}>
                          <p>{j["productName"]}</p>
                          <p>{j["price"]}</p>
                          <p>{j["client"]}</p>
                          <p>{j["vendorPrice"]}</p>
                          <p>{j["_id"]}</p>
                        </div>
                      );
                    })}
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "40px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button style={button} onClick={() => downloadExcel(jobs)}>
                      Download Jobs Excel Sheet
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Render download buttons for jobs data */}
            <div>{/* Implement download logic for Excel, CSV, PDF */}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default Report;
