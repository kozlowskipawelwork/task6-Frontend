import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "@mui/material";

import { userAuthenticationStatusContainer } from "../services/user-status";
import { axiosClient } from "../services/axios-client";
import autosize from "autosize";

const EmailSelectionCard = (props) => {
  return (
    <Card
      sx={{ mx: "auto", width: "60vw", mt: 8 }}
      className="border border-info"
    >
      <CardHeader
        title={
          <h4 className="d-flex justify-content-center">User name selection</h4>
        }
        className="border border-info"
      />
      {props.children}
    </Card>
  );
};

const CenteredCard = (props) => {
  return (
    <Card sx={{ mx: "auto", width: "80vw", mt: 8 }}>{props.children}</Card>
  );
};

export const Home = () => {
  const { isAuthenticated, LogIn } = userAuthenticationStatusContainer();
  const [messages, setMessages] = useState([]);
  const [UserName, setUserName] = useState("");
  const [MsgRecipient, setMsgRecipient] = useState("");
  const [MsgTitle, setMsgTitle] = useState("");
  const [MsgBody, setMsgBody] = useState("");

  useEffect(() => {
    autosize(MsgBody);
    // const intervalId = setInterval(async () => { readMesssages() }, 5000);
    // return () => clearInterval(intervalId); //This is important
  }, []);

  const loginUser = async (e) => {
    console.log(`loginUser`);
    e.preventDefault();
    LogIn(UserName);
    readMesssages();
  };

  const readMesssages = async (e) => {
    try {
      console.log("API refresh: " + new Date());
      const response = await axiosClient.post("messages/recipient", {
        MsgRecipient: UserName,
      });
      console.log(response);
      setMessages(Array.from(response.data));
    } catch (error) {
      console.log(error);
      alert(
        `HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`
      );
    }
  };

  const createClick = async (e) => {
    try {
      const body = { MsgSender: UserName, MsgRecipient, MsgTitle, MsgBody };
      console.log(body);
      const response = await axiosClient.post("messages", body);
      console.log(response);
      readMesssages();
    } catch (error) {
      console.log(error);
      alert(
        `HttpStatus:${error.response.status} Response text::[${error.response.data.text}]`
      );
    }
  };

  const textAreaStyle = {
    maxHeight: "175px",
    minHeight: "38px",
    width: '100%',
    resize: "both",
    padding: "9px",
    boxSizing: "border-box",
    fontSize: "15px",
  };

  return !isAuthenticated ? (
    <EmailSelectionCard>
      <div className="container border border-primary">
        <div className="row">
          <div className="col-2 m-1 border border-secondary">
            <label htmlFor="UserName">User name:</label>
          </div>
          <div className="col m-1">
            <input
              id="UserName"
              type="text"
              required
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
          </div>
          <div className="col-2">
            <button
              type="button"
              className="btn btn-primary"
              onClick={(e) => loginUser(e)}
            >
              Go!
            </button>
          </div>
        </div>
      </div>
    </EmailSelectionCard>
  ) : (
    <CenteredCard>
      <div>
        <div className="border border-primary">
          <div className="row">
            <button
              type="button"
              className="btn btn-light mr-1 col-md-1"
              onClick={(e) => readMesssages(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="green"
                className="bi bi-check-all"
                viewBox="0 0 16 16"
              >
                <path d="M8.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L2.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093L8.95 4.992a.252.252 0 0 1 .02-.022zm-.92 5.14.92.92a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 1 0-1.091-1.028L9.477 9.417l-.485-.486-.943 1.179z" />
              </svg>
            </button>
            <h5 className="col-md-9 m-1">Welcome in EmailViewer!</h5>
            <button
              type="button"
              className="btn btn-light mr-1 col-md-1 float-end"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              // onClick={(e) => addMessage(e)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="blue"
                className="bi bi-pencil-square"
                viewBox="0 0 16 16"
              >
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                <path
                  fillRule="evenodd"
                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                />
              </svg>
            </button>
          </div>
        </div>

        <table className="table table-striped">
          <thead>
            <tr>
              <th>Id</th>
              <th>Sender</th>
              <th>Title</th>
              <th>Body</th>
              <th>Send Time</th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((msg) => (
              <tr key={msg.MsgId}>
                <td>{msg.MsgId}</td>
                <td>{msg.MsgSender}</td>
                <td>{msg.MsgTitle}</td>
                <td className="word-wrap: break-word;min-width: 320px;max-width: 320px;">
                  {msg.MsgBody}
                </td>
                <td>
                  {new Date(msg.SendTime)
                    .toISOString()
                    .slice(0, 19)
                    .replace("T", " ")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Create new message</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="input-group mb-3">
                  <span className="input-group-text">Recipient</span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setMsgRecipient(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Title</span>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setMsgTitle(e.target.value)}
                  />
                </div>
                <div className="input-group mb-3">
                  <span className="input-group-text">Body</span>
                  <textarea
                    style={textAreaStyle}
                    // ref={(e) => setMsgBody(e.target.value)}
                    onChange={(e) => setMsgBody(e.target.value)}
                    placeholder="type some text"
                    rows={1}
                    defaultValue=""
                  />
                </div>

                <button
                  type="button"
                  className="btn btn-primary float-start"
                  onClick={() => createClick()}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CenteredCard>
  );
};
