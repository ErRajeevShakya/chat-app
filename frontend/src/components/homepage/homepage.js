/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const Homepage = ({ user }) => {
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    setSearch(e.target.value);
  };

  //user contlist search api calling

  const data1 = async () => {
    try {
      await axios
        .get("http://localhost:5000/chatpage")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    data1();
  }, []);

  console.log(user);

  const [friendlist, setFriendList] = useState("");

  const chatlist = user?.friend.filter((userlist) => {
    if (friendlist === "") {
      return userlist;
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
  const addFriend = async (friend) => {
    await axios
      .post("http://localhost:5000/addfriend", {
        friend,
        user,
      })
      .then((res) => console.log(res.data));
  };

  // model
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
        <Modal
          style={{ position: "absolute" }}
          show={show}
          onHide={handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Your Detail</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Label htmlFor="fristname">First Name</Form.Label>
            <Form.Control
              type="text"
              id="fristname"
              name="fname"
              value={changes.fname}
              onChange={(e) =>
                setchanges({ ...changes, [e.target.name]: e.target.value })
              }
            />
            <Form.Label htmlFor="lastname">Last Name</Form.Label>
            <Form.Control
              type="text"
              id="lastname"
              name="lname"
              value={changes.lname}
              onChange={(e) =>
                setchanges({ ...changes, [e.target.name]: e.target.value })
              }
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleCloseAndChanges}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <div id="search">
          <label for="">
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
            {chatlist.map((friend, index) => {
              return (
                <li className="contact" key={index}>
                  <div className="wrap">
                    <div className="meta">
                      <p className="name">{`${friend.fname} ${friend.lname}`}</p>
                      <p className="preview"> {friend.email}</p>
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
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div className="content">
        <div className="contact-profile">
          <h2
            style={{ textTransform: "capitalize" }}
          >{`${user.fname} ${user.lname}`}</h2>
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
                        addFriend(friend);
                      }}
                    >
                      <i class="fa-solid fa-plus"></i>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="messages">
          <ul>
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
            <li className="replies">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <p>Excuses don't win championships.</p>
            </li>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>Oh yeah, did Michael Jordan tell you that?</p>
            </li>
            <li className="replies">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <p>No, I told him that.</p>
            </li>
            <li className="replies">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <p>What are your choices when someone puts a gun to your head?</p>
            </li>
            <li className="sent">
              <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
              <p>
                What are you talking about? You do what they say or they shoot
                you.
              </p>
            </li>
            <li className="replies">
              <img
                src="http://emilcarlsson.se/assets/harveyspecter.png"
                alt=""
              />
              <p>
                Wrong. You take the gun, or you pull out a bigger one. Or, you
                call their bluff. Or, you do any one of a hundred and forty six
                other things.
              </p>
            </li>
          </ul>
        </div>
        <div className="message-input">
          <div className="wrap">
            <input type="text" placeholder="Write your message..." />
            <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
            <button className="submit">
              <i className="fa fa-paper-plane" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
