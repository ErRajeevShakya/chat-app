/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./homepage.css";
import axios from "axios";

const Homepage = ({ setLoginUser, user }) => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchHandler = (e) => {
    console.log(search);
    setSearch(e.target.value);
  };
  useEffect(() => {
    const data = async () => {
      try {
        await axios.get("http://localhost:5000/chatpage").then((res) => {
          setData(res.data);
        });
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  const userlist = data.filter((userlist) => {
    if (user.name === userlist.name) {
      return 0;
    } else if (search === "") {
      return 0;
    }

    if (userlist.name.toLowerCase().includes(search.toLowerCase())) {
      return userlist;
    } else {
      return console.log("not found");
    }
  });
  const addFriend = async (friend) => {
    let data = await axios
      .post("http://localhost:5000/addfriend", {
        friend,
        user,
      })
      .then((res) => console.log(res.data));
  };

  return (
    <div id="frame">
      <div id="sidepanel">
        <div id="profile">
          <div className="wrap">
            <img
              id="profile-img"
              src="http://emilcarlsson.se/assets/mikeross.png"
              className="online"
              alt=""
            />
            <h2 style={{ textTransform: "capitalize" }}>{user.name}</h2>
            <i
              className="fa fa-chevron-down expand-button"
              aria-hidden="true"
            ></i>
            <div id="status-options">
              <ul>
                <li id="status-online" className="active">
                  <span className="status-circle"></span> <p>Online</p>
                </li>
                <li id="status-away">
                  <span className="status-circle"></span> <p>Away</p>
                </li>
                <li id="status-busy">
                  <span className="status-circle"></span> <p>Busy</p>
                </li>
                <li id="status-offline">
                  <span className="status-circle"></span> <p>Offline</p>
                </li>
              </ul>
            </div>
            <div id="expanded">
              <label for="twitter">
                <i className="fa fa-facebook fa-fw" aria-hidden="true"></i>
              </label>
              <input name="twitter" type="text" value="mikeross" />
              <label for="twitter">
                <i className="fa fa-twitter fa-fw" aria-hidden="true"></i>
              </label>
              <input name="twitter" type="text" value="ross81" />
              <label for="twitter">
                <i className="fa fa-instagram fa-fw" aria-hidden="true"></i>
              </label>
              <input name="twitter" type="text" value="mike.ross" />
            </div>
          </div>
        </div>
        <div id="search">
          <label for="">
            <i className="fa fa-search" aria-hidden="true"></i>
          </label>
          <input
            type="text"
            placeholder="Search contacts..."
            value={search}
            name="contact"
            onChange={searchHandler}
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
            {userlist.map((friend, index) => {
              return (
                <li className="contact" key={index}>
                  <div className="wrap">
                    <div className="meta">
                      <p className="name">{friend.name}</p>
                      <p className="preview"> {friend.email}</p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div id="bottom-bar">
          <button id="addcontact">
            <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i>{" "}
            <span>Add Friend</span>
          </button>
          <button id="settings">
            <i className="fa fa-cog fa-fw" aria-hidden="true"></i>{" "}
            <span>Settings</span>
          </button>
        </div>
      </div>
      <div className="content">
        <div className="contact-profile">
          <h2 style={{ textTransform: "capitalize" }}>{user.name}</h2>
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
                    <span>{friend.name}</span>
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
