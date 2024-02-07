import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import styles from "./Form.module.css";
import { Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Button, message, Upload, Spin, Modal } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Form() {
  const [spinning, setSpinning] = useState(false);
  const navigate = useNavigate();
  const [model, setModel] = useState(false);
  const [ngram, setNgram] = useState([]);
  const [count, setCount] = useState(0);

  const [form, setForm] = useState({
    id: undefined,
    file: undefined,
    friendId: undefined,
    password: undefined,
    text: undefined,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const toggleLoader = (state) => {
    setSpinning(state);
  };

  const onSubmit = (data) => {
    toggleLoader(true);
    setForm({
      id: data.id,
      friendId: data.friendId,
      password: data.password,
      text: data.text,
      file: data.file.fileList[0].originFileObj,
    });
    // Assuming 'file' is the name of the file field

    axios
      .post("http://localhost:3000/addFriend", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          message.success(response.data);
        } else if (response.status === 401) {
          message.error(response.data);
        }
        toggleLoader(false);
      })
      .catch((err) => {
        console.log(err);
        toggleLoader(false);
      });
  };
  const getNgrams = () => {
    axios
      .get("http://localhost:3000/getNgrams")
      .then((response) => {
        console.log(response);
        setNgram(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCount = () => {
    axios
      .get("http://localhost:3000/request")
      .then((response) => {
        console.log(response);
        setCount(response.data.count);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNgrams();
    updateCount();
  }, [model]);

  const handleRoute = () => {
    navigate("/data");
  };

  return (
    <div
      className={styles.screenContainer + " " + "container-fluid"}
      style={{ width: "100vw" }}
    >
      <div
        className="container-xl d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Spin spinning={spinning}>
          <div className={styles.formDiv}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className={styles.formItem}>
                <p className="mb-0">Enter ID</p>
                <Controller
                  rules={{ required: "ID is required" }}
                  name="id"
                  control={control}
                  render={({ field }) => <Input {...field} placeholder="ID" />}
                />
              </div>
              <div className={styles.formItem}>
                <p className="mb-0">Upload Image</p>
                <Controller
                  name="file"
                  control={control}
                  rules={{ required: "File is required" }}
                  render={({ field }) => (
                    <Upload
                      {...field}
                      beforeUpload={() => false} // Prevent default behavior, you can customize this based on your needs
                      maxCount={1} // Allow only one file to be uploaded
                      //   showUploadList={false} // Hide the file list
                    >
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                />
              </div>
              <div className={styles.formItem}>
                <p className="mb-0">Enter Friend ID</p>
                <Controller
                  name="friendId"
                  rules={{ required: "Friend ID is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} placeholder="Friend ID" />
                  )}
                />
              </div>
              <div className={styles.formItem}>
                <p className="mb-0">Enter Password</p>
                <Controller
                  rules={{ required: "Password is required" }}
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="password" placeholder="Password" />
                  )}
                />
              </div>
              <div className={styles.formItem}>
                <p className="mb-0">Enter text</p>
                <Controller
                  name="text"
                  rules={{ required: "Text is required" }}
                  control={control}
                  render={({ field }) => (
                    <Input {...field} type="text" placeholder="Enter Text" />
                  )}
                />
              </div>

              {errors.exampleRequired && <span>This field is required</span>}

              <Modal
                title="Ngrams of last 2 text is"
                open={model}
                onOk={() => setModel(false)}
                onCancel={() => setModel(false)}
              >
                <p>Request Count: {count}</p>
                <ul>
                  {ngram.map((item, index) => (
                    <li key={index}>
                      {item[0]} - {item[1]}
                    </li>
                  ))}
                </ul>
              </Modal>
              <span>*All fields are required</span>
              <div className="d-flex justify-content-center align-items-center">
                <button className={styles.submitBtn}>Submit </button>
              </div>
              <div className="d-flex justify-content-center align-items-center">
                <button onClick={handleRoute} className={styles.dataBtn}>
                  See Data
                </button>
              </div>
            </form>
            <div className="d-flex justify-content-center align-items-center">
              <button
                style={{
                  backgroundColor: "transparent",
                  color: "#454545",
                  border: "1px solid #727272",
                }}
                onClick={() => setModel(true)}
                className={styles.dataBtn}
              >
                Get Ngrams
              </button>
            </div>
          </div>
        </Spin>
      </div>
    </div>
  );
}

export default Form;
