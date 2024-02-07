import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "antd";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { Buffer } from "buffer";

// ...

function Data() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/data")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columns = [
    {
      title: "Person ID",
      dataIndex: "personId",
      key: "personId",
    },
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (photo) => {
        const base64String = Buffer.from(photo?.data).toString("base64");
        const imageUrl = `data:image/png;base64,${base64String}`;
        return photo ? (
          <img
            src={imageUrl}
            alt="User"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
        ) : (
          <span>No Image</span>
        );
      },
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Friend List",
      dataIndex: "friendList",
      key: "friendList",
      render: (friends) => {
        return friends.map((friend, index) => (
          <p style={{ display: "inline" }} key={index}>
            {friend}
            {index + 1 === friends.length ? "" : ","}
          </p>
        ));
      },
    },
  ];

  return (
    <div
      className={styles.screenContainer + " " + "container-fluid"}
      style={{ width: "100vw", height: "100vh" }}
    >
      <div className="container-xl d-flex justify-content-center align-items-center">
        <div style={{ width: "90vw", height: "90vh" }}>
          <h4>Data</h4>
          {loading ? (
            <div
              className="d-flex justify-content-center  align-items-center"
              style={{ width: "90vw", height: "90vh" }}
            >
              <Spin />
            </div>
          ) : (
            <Table dataSource={data} columns={columns} />
          )}

          <button className={styles.submitBtn} onClick={() => navigate("/")}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Data;
