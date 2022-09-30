/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from "react";
import "./homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

import { io } from "socket.io-client";

import { useSelector, useDispatch } from "react-redux";
import { setLoggedUser } from "../../store/UserSlice";

const Homepage = () => {
  const user = useSelector((state) => state.user.user);
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  // const socket = useRef();
  const scrollRef = useRef();

  const socket = io("http://localhost:5000", { transports: ["websocket"] });
  // socket.on("connection", (anotherSocketId, msg) => {
  //   // console.log(msg, "msgmsgmsgmsgmsgmsgmsgmsg");
  // socket.emit("send", "heeeeiieieijr");
  // socket.emit("connection", "slkdjflksjdflkj");
  // });
  const searchHandler = (e) => {
    console.log(search);
    setSearch(e.target.value);
  };
  const [sendMessages, setsendMessages] = useState("");

  const [messages, setMessages] = useState([]);
  const [conversation, setConversation] = useState([]);

  const token = localStorage.getItem("token");

  socket.on("message", (msg) => {
    setMessages([msg]);
  });
  const dispatch = useDispatch();

  const data1 = async () => {
    try {
      await axios
        .get("http://localhost:5000/Allusers")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const [friendlist, setFriendList] = useState("");

  const [chatlist, setchatlist] = useState([]);

  const usedChatlist = chatlist.filter((userlist) => {
    if (
      `${user.fname} ${user.lname}` === `${userlist.fname} ${userlist.lname}`
    ) {
      return 0;
    } else if (friendlist === "") {
      return 1;
    }

    if (
      `${userlist.fname} ${userlist.lname}`
        .toLowerCase()
        .includes(friendlist.toLowerCase())
    ) {
      return userlist;
    } else {
      return console.log("not found");
    }
  });

  const userlist = data.filter((userlist) => {
    if (
      `${user.fname} ${user.lname}` === `${userlist.fname} ${userlist.lname}`
    ) {
      return 0;
    } else if (search === "") {
      return 0;
    }

    if (
      `${userlist.fname} ${userlist.lname}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) {
      return userlist;
    } else {
      return console.log("not found");
    }
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [changes, setchanges] = useState({
    lname: `${user.lname}`,
    fname: `${user.fname}`,
  });
  const handleCloseAndChanges = async () => {
    await axios
      .post("http://localhost:5000/editdetail", { changes, id: user._id })
      .then((res) => {
        alert(res.data);
      });

    setShow(false);
  };
  const addFriend = async (id) => {
    console.log(id);
    await axios
      .post(
        "http://localhost:5000/makingChatConnection",
        {
          fid: id,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => console.log(res.data));
  };
  const messageConnection = async (receiverId) => {
    const messageC = await axios.post(
      "http://localhost:5000/messageconnection",
      { receiverId: receiverId },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(messageC);
  };

  const sendMessage = async (receiverId, messages) => {
    if (receiverId && conversation._id && messages) {
      await axios.post(
        "http://localhost:5000/messagessend",
        { receiverId, messages, chatConnectionId: conversation._id },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
    } else {
      console.log("some technecal issues");
    }
    setsendMessages("");
  };

  let messageslist = messages?.map((value, index) => {
    if (value.senderId === user._id) {
      return (
        <li className="replies" key={index}>
          <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
          <p>{value.messages}</p>
        </li>
      );
    } else {
      return (
        <li className="sent" key={index}>
          <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
          <p>{value.messages}</p>
        </li>
      );
    }
  });

  useEffect(() => {
    const getMessages = async () => {
      if (active) {
        try {
          const response = await axios.get(
            `http://localhost:5000/messagesget/${active._id}`,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          );
          console.log(response.data);
          setMessages(response.data);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getMessages();
  }, [active]);

  const resConversation = async (friend) => {
    const response = await axios.get(
      `http://localhost:5000/conversationid/${friend._id}`,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    console.log(response.data);
    setConversation(response.data);
  };

  useEffect(() => {
    data1();
    (async () => {
      const response = await axios.get("http://localhost:5000/loggeduser", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      dispatch(setLoggedUser(response.data));
    })();

    let response;
    (async () => {
      response = await axios.get("http://localhost:5000/showingChatList", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setchatlist(response.data);
    })();
  }, []);

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap" style={{ position: "relative", top: "10px" }}>
            <Button
              variant="secondary"
              onClick={handleShow}
              style={{
                backgroundColor: "rgba(0,0,0,0)",
                border: "none",
                outline: "none",
              }}
            >
              <h5
                style={{
                  textTransform: "capitalize",
                }}
              >
                <img
                  id="profile-img"
                  src="http://emilcarlsson.se/assets/mikeross.png"
                  className="online"
                  alt=""
                  style={{ position: "relative", top: "-9px", left: "-10px" }}
                />
                {`${user.fname} ${user.lname}`}
              </h5>
            </Button>
          </div>
        </div>
        <div id="search">
          <label htmlFor="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            placeholder="Search contacts..."
            value={friendlist}
            name="contact"
            onChange={(e) => {
              setFriendList(e.target.value);
            }}
          />
        </div>
        <div id="contacts">
          <ul>
            <li className="contact">
              <div className="wrap">
                <span className="contact-status online"></span>
                <img src="http://emilcarlsson.se/assets/louislitt.png" alt="" />
                <div className="meta">
                  <p className="name">Louis Litt</p>
                  <p className="preview">You just got LITT up, Mike.</p>
                </div>
              </div>
            </li>
            {usedChatlist?.map?.((friend, index) => {
              return (
                <li
                  className="contact"
                  style={{
                    listStyle: "none",
                    textTransform: "capitalize",
                  }}
                  key={index}
                  onClick={() => {
                    messageConnection(friend._id);
                    setActive(friend);
                    resConversation(friend);
                  }}
                >
                  <div className="wrap">
                    <div className="meta">
                      <p className="name">{`${friend.fname} ${friend.lname}`}</p>
                      <span> {friend.email}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div id="bottom-bar">
          <button
            id="addcontact"
            onClick={() => {
              Navigate("/resetpassword");
            }}
          >
            <span>Reset Password</span>
          </button>
          <button
            id="settings"
            onClick={() => {
              localStorage.removeItem("token");
              Navigate("/");
              window.location.reload();
            }}
          >
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Logout</span>
          </button>
        </div>
      </div>
      <div className="content">
        <div className="contact-profile">
          <h2 style={{ textTransform: "capitalize" }}>
            {active ? `${active.fname} ${active.lname}` : ""}
          </h2>
          <div
            style={{
              position: "relative",
              width: "270px",
              height: "300px",
              overflowY: "scroll",
            }}
          >
            <div
              id="search"
              style={{
                display: "flex",
                width: "100%",
                height: "40px",
                flexDirection: "column",
                position: "relative",
                top: 10,
                right: 0,
              }}
            >
              <input
                type="text"
                placeholder="Search contacts..."
                value={search}
                name="contact"
                style={{
                  outline: "none",
                  border: "none",
                  borderRadius: "5px",
                  height: "20px",
                  width: "95%",
                }}
                onChange={searchHandler}
              />
            </div>

            <ul style={{ width: "100%", padding: 0, margin: 0 }}>
              {userlist.map((friend, index) => {
                return (
                  <li
                    className="contact"
                    key={index}
                    style={{
                      listStyle: "none",
                      width: "97%",
                      textTransform: "capitalize",
                      backgroundColor: "#fff",
                      paddingLeft: "5px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <span>{`${friend.fname} ${friend.lname}`}</span>
                    <span
                      style={{
                        padding: " 0rem 1.2rem",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        addFriend(friend._id);
                      }}
                    >
                      <i className="fa-solid fa-plus"></i>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="messages">
          <ul ref={scrollRef}>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>
                How the hell am I supposed to get a jury to believe you when I
                am not even sure that I do?!
              </p>
            </li>
            <li className="replies">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <p>
                When you're backed against the wall, break the god damn thing
                down.
              </p>
            </li>
            {messageslist}
          </ul>
        </div>
        <div className="message-input">
          <div className="wrap">
            <input
              type="text"
              placeholder="Write your message..."
              value={sendMessages}
              onChange={(e) => setsendMessages(e.target.value)}
            />
            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
            <button
              className="submit"
              onClick={(e) => {
                socket.emit("send", sendMessages);

                // sendMessage(active._id, sendMessages);
                setsendMessages("");
              }}
            >
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
