import React, { useRef, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Space,
  Divider,
  Row,
  Col,
  Select,
} from "antd";
import { Layout, Breadcrumb, Statistic, Progress, Tag, Button } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { DashboardLayout } from "@/layout";
import RecentTable from "@/components/RecentTable";
import useFetch from "@/hooks/useFetch";
import { request } from "@/request";
import { useEffect } from "react";
import ReactStars from "react-rating-stars-component";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch } from "react-redux";
import { crud } from "@/redux/crud/actions";

export default function Dashboard() {
  const [reminder, setReminder] = useState("");
  const [form] = Form.useForm();

    //  console.log("hiiiiiiiiiiii" + request.list("admin").);
  const adminList = useFetch(() => {
    return request.list("admin");
  }).result;

  let admin =
    adminList &&
    adminList.filter(
      (res) => res._id == JSON.parse(localStorage.getItem("auth")).current.id
    )[0];
 

  useEffect(() => {
    if (adminList) {
      admin = adminList.filter(
        (res) => res._id == JSON.parse(localStorage.getItem("auth")).current.id
      )[0];

      setReminder(admin.reminder);
    }
  }, [adminList]);

  useEffect(() => {
    reminder != null && form.setFieldsValue({ reminder: reminder });
  }, [reminder]);

  const dOptions = {
    schedule: [
      { label: "Requirement Received", value: "requirement received" },
      { label: "Site Visit Done", value: "site visit done" },
      { label: "Vendor BOQ Received", value: "vendor boq received" },
      { label: "Client BOQ Received", value: "client boq received" },
      {
        label: "Email Confimation Received",
        value: "email confirmation received",
      },
      { label: "PO Received", value: "po received" },
      { label: "Vendor Allotted", value: "vendor allotted" },
    ],
    start: [
      { label: "Team Aligned", value: "team aligned" },
      { label: "Delay From Client", value: "delay from client" },
    ],
    close: [
      { label: "Work Done", value: "work done" },
      { label: "Updated BOQ Sent", value: "updated boq sent" },
      { label: "Admin Approval", value: "admin approval" },
    ],
    audit: [
      { label: "Client Updated BOQ Sent", value: "client updated boq sent" },
      { label: "Update Approval", value: "updated po received" },
      { label: "Sent for invoicing", value: "sent for invoicing" },
    ],
    finished: [
      { label: "Invoice Sent", value: "invoice sent" },
      { label: "Payment Received", value: "payment received" },
      { label: "Invoice Received", value: "invoice received" },
      { label: "Payment Done", value: "payment done" },
    ],
  };

  const dispatch = useDispatch();
  const [totalJob, setJob] = useState(0);
  const [totalVendor, setVendor] = useState(0);
  const entity = "job";
  const entityVendor = "vendor";
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [statusModal, setStatus] = useState(false);
  const [jobStatus, setJobStatus] = useState();

  const toggleModal = () => {
    setModal(!modal);
  };

  if (modal || modal1 || statusModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  const ratingChanged = (newRating) => {
    console.log(newRating);
  };

  const toggleModal1 = () => {
    setModal1(!modal1);
  };

  const fetchvendors = () => {
    return request.list(entityVendor, {});
  };

  const fetchjobs = () => {
    return request.list(entity, {});
  };

  const { result, isLoading, isSuccess } = useFetch(fetchvendors);
  const jobs = useFetch(fetchjobs);

  useEffect(() => {
    if (Array.isArray(result)) {
      setVendor(result.length);
    }
  }, [result]);

  useEffect(() => {
    if (Array.isArray(jobs.result)) {
      setJob(jobs.result.length);
    }
  }, [jobs.result]);

  const handleStatus = (current, job) => {
    setStatus((s) => !s);
    setJobStatus(job);
  };

  const render = (status, record) => {
    return (
      <Button onClick={() => handleStatus(status, record)}>
        {status.toUpperCase()}
      </Button>
    );
  };

  const changeStatus = (val) => {
    const updated = { ...jobStatus, ...val };
    dispatch(crud.update("job", updated["_id"], updated));
    setStatus((s) => !s);
    window.location.reload();
  };

  const addReminder = (val) => {
    const notes = { ...admin, ...val };
    dispatch(crud.update("admin", admin._id, notes));
    window.location.reload();
  };

  const moveToNextTable = (job) => {
    const currentTable = Object.keys(dOptions).filter((key) => {
      const values = dOptions[key].map((val) => val["value"]);
      return values.includes(job["status"]);
    })[0];

    const nextTable =
      Object.keys(dOptions)[Object.keys(dOptions).indexOf(currentTable) + 1];

    const updated = { ...job, status: dOptions[nextTable][0].value };
    dispatch(crud.update("job", updated["_id"], updated));
    setStatus((s) => !s);
    window.location.reload();
  };

  const leadColumns = [
    {
      title: "Date",
      dataIndex: "date",
    },
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "Job Location",
      dataIndex: "district",
    },
    {
      title: "Client Name",
      dataIndex: "client",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Admin",
      dataIndex: "admin",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];

  const productColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Client HQ Name",
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
      title: "Budget",
      dataIndex: "budget",
    },

    {
      title: "Start Date",
      dataIndex: "date",
    },
    {
      title: " Site dox",
      dataIndex: "dox",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];

  const closeColumns = [
    {
      title: " End Date",
      dataIndex: "enddate",
    },
    {
      title: " Site dox",
      dataIndex: "dox",
    },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
    {
      title: "Add Job Sheet",
      dataIndex: "sheet",
    },
    {
      title: "Add Customer Review",
      dataIndex: "Review",
    },
    {
      title: "Submit Bill Pic",
      dataIndex: "dox",
    },
  ];

  const auditColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: "Client Site Name",
      dataIndex: "sitename",
    },
    {
      title: "Client Site Phone No.",
      dataIndex: "managerphone",
    },
    {
      title: "Client Site E-mail",
      dataIndex: "clientemail",
    },
    {
      title: " Start Date",
      dataIndex: "startdate",
    },
    {
      title: " End Date",
      dataIndex: "enddate",
    },
    // {
    //   title: "Before Pic",
    //   dataIndex: "dox",
    // },
    // {
    //   title: "After pic",
    //   dataIndex: "dox",
    // },
    // {
    //   title: "Approve Work",
    //   dataIndex: "dox",
    // },
    {
      title: "Status",
      dataIndex: "status",
      render: render,
    },
  ];

  const finishedColumns = [
    {
      title: "Job Title",
      dataIndex: "title",
    },
    {
      title: "vendor name",
      dataIndex: "vendorname",
    },
    {
      title: " Vendor Budget",
      dataIndex: "budget",
    },
    {
      title: "Client Billing",
      dataIndex: "client billing",
    },
    {
      title: "Client Invoice  No.",
      dataIndex: "invoice no.",
    },
    {
      title: "Client Invoice Amount",
      dataIndex: "invoice amount",
    },
  ];

  return (
    <DashboardLayout>
      {statusModal && (
        <div className="modal">
          <div
            onClick={toggleModal1}
            className="overlay"
            style={{
              background: "rgba(49,49,49,0.8)",
              width: "100vw",
              height: "100vh",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "fixed",
              zIndex: "10",
            }}
          ></div>
          <div
            className="modal-content"
            style={{
              position: "fixed",
              top: "40%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              lineHeight: 1.4,
              background: "#f1f1f1",
              padding: "14px 28px",
              borderRadius: "3px",
              maxWidth: "600px",
              minWidth: "409px",
              zIndex: 11,
            }}
          >
            <Form onFinish={changeStatus}>
              <h3>Change Job Status</h3>
              <Form.Item label="Status" name="status">
                <Select
                  defaultValue={jobStatus && jobStatus["status"]}
                  options={
                    jobStatus &&
                    Object.values(dOptions).filter((j) => {
                      return j.some((obj) => {
                        if (
                          jobStatus["status"] == "pending" &&
                          obj.value == "requirement received"
                        ) {
                          return true;
                        }
                        return obj.value == jobStatus["status"];
                      });
                    })[0]
                  }
                ></Select>
              </Form.Item>
              <Form.Item label="Remarks" name="remarks">
                <TextArea />
              </Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form>
          </div>
        </div>
      )}
      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={8}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Quick Links
              </h3>
              <a href="/vendor" target="_blank">
                {" "}
                Add New Vendor
              </a>
              <br />
              <a href="/lead" target="_blank">
                Add New Job
              </a>
              <br />
              <a href="/product" target="_blank">
                {" "}
                Add New Services
              </a>
              <br />
              <a onClick={toggleModal}>View Vendor</a>
              <br />
              <a onClick={toggleModal1}>View Services</a>
              <br />
              <a>Create Announcement</a>
            </div>
          </div>
        </Col>

        <Col className="gutter-row" span={8}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>
                Job Preview
              </h3>
            </div>
          </div>
        </Col>
        <Col className="gutter-row" span={8}>
          <div className="whiteBox shadow" style={{ height: "380px" }}>
            <div
              className="pad20"
              style={{ textAlign: "center", justifyContent: "center" }}
            >
              <h3 style={{ color: "#22075e", marginBottom: 30 }}>Reminder</h3>
              <Form onFinish={addReminder} form={form}>
                <Form.Item name="reminder">
                  <TextArea rows={10}></TextArea>
                </Form.Item>
                <Button type="primary" htmlType="submit">
                  Save
                </Button>
              </Form>
            </div>
          </div>
        </Col>
      </Row>

      <div className="space30"></div>
      <Row gutter={[24, 24]}>
        <Col className="gutter-row" span={24}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Pending To Schedule
              </h3>
            </div>
            <RecentTable
              entity={"job"}
              name="schedule"
              dataTableColumns={leadColumns}
              moveToNextTable={moveToNextTable}
              dOptions={dOptions}
              jobStatus={jobStatus}
            />
            <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Pending to start
              </h3>
            </div>
            <RecentTable
              entity={"job"}
              name="start"
              dataTableColumns={productColumns}
              moveToNextTable={moveToNextTable}
              dOptions={dOptions}
              jobStatus={jobStatus}
            />
            <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Pending to Close
              </h3>
            </div>
            <RecentTable
              entity={"job"}
              name="close"
              dataTableColumns={closeColumns}
              moveToNextTable={moveToNextTable}
              dOptions={dOptions}
              jobStatus={jobStatus}
            />
            <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Audit And checkout
              </h3>
            </div>
            <RecentTable
              entity={"job"}
              name="audit"
              dataTableColumns={auditColumns}
              moveToNextTable={moveToNextTable}
              dOptions={dOptions}
              jobStatus={jobStatus}
            />
            <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
          </div>
        </Col>
        <Col className="gutter-row" span={24}>
          <div className="whiteBox shadow">
            <div className="pad20">
              <h3 style={{ color: "#22075e", marginBottom: 5 }}>
                Finished Jobs
              </h3>
            </div>
            <RecentTable
              entity={"job"}
              name="finished"
              dataTableColumns={finishedColumns}
              moveToNextTable={moveToNextTable}
              dOptions={dOptions}
              jobStatus={jobStatus}
            />
            <i className="bi bi-arrow-down" style={{ color: "black" }}></i>
          </div>
        </Col>

        {modal && (
          <div className="modal">
            <div
              onClick={toggleModal}
              className="overlay"
              style={{
                background: "rgba(49,49,49,0.8)",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed",
              }}
            ></div>
            <div
              className="modal-content"
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                lineHeight: 1.4,
                background: "#f1f1f1",
                padding: "14px 28px",
                borderRadius: "3px",
                maxWidth: "600px",
                minWidth: "409px",
                zIndex: 1,
              }}
            >
              <form role="form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Search Here"
                    style={{
                      margin: "10px",
                      borderRadius: "5px",
                      padding: "4px",
                      borderColor: "powderblue",
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    style={{
                      margin: "10px",
                      padding: "4px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="name">Services</label>
                  <input
                    type="text"
                    className="form-control"
                    id="service"
                    placeholder="Enter Service"
                    style={{
                      margin: "10px",
                      padding: "4px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
                <div className="form-group">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                  ,
                </div>
              </form>
              <button
                className="close-modal ant-btn ant-btn-primary"
                type="submit"
                style={{
                  top: "10px",
                  right: "10px",
                  padding: "5px 8px",
                }}
                onClick={toggleModal}
              >
                Save
              </button>
            </div>
          </div>
        )}
        {modal1 && (
          <div className="modal">
            <div
              onClick={toggleModal1}
              className="overlay"
              style={{
                background: "rgba(49,49,49,0.8)",
                width: "100vw",
                height: "100vh",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: "fixed",
              }}
            ></div>
            <div
              className="modal-content"
              style={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                lineHeight: 1.4,
                background: "#f1f1f1",
                padding: "14px 28px",
                borderRadius: "3px",
                maxWidth: "600px",
                minWidth: "409px",
                zIndex: 1,
              }}
            >
              <form role="form">
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Search Here"
                    style={{
                      margin: "10px",
                      borderRadius: "5px",
                      padding: "4px",
                      borderColor: "powderblue",
                    }}
                  ></input>
                </div>
                <div className="form-group">
                  <label for="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter Name"
                    style={{
                      margin: "10px",
                      padding: "4px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
                <div className="form-group">
                  <label for="name">Services</label>
                  <input
                    type="text"
                    className="form-control"
                    id="service"
                    placeholder="Enter Service"
                    style={{
                      margin: "10px",
                      padding: "4px",
                      borderRadius: "6px",
                    }}
                  />
                </div>
                <div className="form-group">
                  <ReactStars
                    count={5}
                    onChange={ratingChanged}
                    size={24}
                    activeColor="#ffd700"
                  />
                  ,
                </div>
              </form>
              <button
                className="close-modal ant-btn ant-btn-primary"
                type="submit"
                style={{
                  top: "10px",
                  right: "10px",
                  padding: "5px 8px",
                }}
                onClick={toggleModal1}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </Row>
    </DashboardLayout>
  );
}
