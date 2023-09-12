import mobile from "./mobile.css";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { format } from "date-fns";
import moment from "moment";
import { Link } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import LOGO from "./images/arrow.png";
function Mobile(props) {
  const [visible, setVisible] = useState(false);
  const [inputText, setInputText] = useState(" ");
  const [inputDescription, setInputDescription] = useState(" ");
  const [show, setShow] = useState(true);
  const [groupSelected, setGroupSelected] = useState(null);
  
  const [color1, setColor] = useState(["#B38BFA,#FF79F2,#43E6FC,#F19576,#0047FF,#6691FF"]);
  
  const submitButton = (e) => {
    e.preventDefault();
    setGroupNames([
      ...groupNames,
      { name: inputText, description: inputDescription },
    ]);
    setInputText("");
    setInputDescription("");
    setVisible(false);
  };
  const SubmitInformation = () => {
    setGroupNames([
      ...groupNames,
      { name: inputText, description: inputDescription },
    ]);
    setInputDescription("");
  };

  const handleGroup = (event) => {
    setInputText(event.target.value);
  };
  const SubmitInfos = (event) => {
    setInputDescription(event.target.value);
  };
  function handleColor1() {
    setColor(["#B38BFA"]);
  }
  function handleColor2() {
    setColor(["#FF79F2"]);
  }
  
  function handleColor3() {
    setColor(["#43E6FC"]);
  }
  
  function handleColor4() {
    setColor(["#F19576"]);
  }
  
  function handleColor5() {
    setColor(["#0047FF"]);
  }
  function handleColor6() {
    setColor(["#6691FF"]);
  }
  
  
  const ClickOnAction = () => {
    setShow(!show);
  };
  const displayDetails = (group) => {
    setGroupSelected(group);
  };
  const WriteGroupDescription = (NotesDescription) => {
    if (groupSelected) {
      setGroupNames((eventGroup) => {
        return eventGroup.map((group) => {
          if (group.name === groupSelected.name) {
            group.description = NotesDescription;
          }
          return group;
        });
      });
    }
  };
  const SubmitDescription = (event) => {
    event.preventDefault();
  };
  const currentDates = format(new Date(), "  hh:mm a ,  do MMMM yyyy ");
  
  const loadData=localStorage.getItem("groups")
  ? JSON.parse(localStorage.getItem("groups"))
  :[];
  
  const [groupNames, setGroupNames] = useState(loadData);
 
  useEffect(() => {
    window.localStorage.setItem("groups", JSON.stringify(groupNames));
  },[groupNames]);

  return (
    <div className="mobileApp">
      {show ? (
        <section>
          <div className="AppHeading">
            <h1>Pocket Notes</h1>
          </div>
          <div className="AddNotesDiv">
            <button className="AddNotes" onClick={() => setVisible(true)}>
              &nbsp;+ &nbsp; Create Notes group &nbsp;
            </button>
          </div>
          <p className="modal">
            <ReactModal
              className="model"
              isOpen={visible}
              onRequestClose={() => setVisible(false)}
            >
              <p className="PopHeading">Create New Notes group</p>
              <label className="groupName">
                Group Name{" "}
                <input
                  type="text" className="inputTag"
                  value={inputText}
                  placeholder="Enter your group name.."
                  onChange={handleGroup}
                ></input>
              </label>
              <div className="colorPicker">
                <div className="colorDiv">
                <span className="chooseColor">Choose colour&nbsp;&nbsp;&nbsp;</span>
                <input
                  type="radio"
                  onClick={handleColor1}
                  name="pick-color1"
                  value="#B38BFA"
                  className="FirstColor" checked
                />
                <input
                  type="radio"
                  onClick={handleColor2}
                  name="pick-color2"
                  value="#FF79F2"
                  className="SecondColor" checked
                />
                <input
                  type="radio"
                  onClick={handleColor3}
                  name="pick-color3"
                  value="#43E6FC"
                  className="ThirdColor" checked
                />
                <input
                  type="radio"
                  onClick={handleColor4}
                  name="pick-color4"
                  value="#F19576"
                  className="FourthColor" checked
                />
                <input
                  type="radio"
                  onClick={handleColor5}
                  name="pick-color5"
                  value="#0047FF"
                  className="FifthColor" checked
                />
                <input
                  type="radio"
                  onClick={handleColor6}
                  name="pick-color6"
                  value="#6691FF"
                  className="SixthColor" checked
                /></div>
              </div>
             <div className="creates">
             <button
                className="create"
                onChange={() => setVisible(false)}
                onClick={submitButton}
              >
                Create
              </button>
              </div> 
            </ReactModal>
          </p>{" "}
          <div className="groupNamess">
            {groupNames.map((group, index) => (
              <li
                className="list-item"
                onClick={() => {
                  setShow(false);
                  displayDetails(group);
                }}
                key={index}
              >
                <span
                  style={{ background:color1 }}
                  className="profileNa"
                  key={index}
                >
                  {group.name.slice(0, 2)}
                </span><span className="GroupNamesCategory">
                {group.name}</span>
              </li>
            ))}
          </div>
        </section>
      ) : (
        <section className="section2">
          <div className="sector1">
            {groupSelected && (
              <div>
                <div className="headingSection1">
                <span className="headingSection2">
            <button className="btnArr"
              onClick={() => {
                setShow(true);
              }}
            >
             <span className="image"> <img src={LOGO} alt="logo" /></span>
            </button>
            

                 <span className="profileName2">{groupSelected.name.slice(0,2)}</span>
                  <span className="profile">{groupSelected.name}</span>
           
                </span></div>
                <div>
                  <form onSubmit={SubmitDescription}>
                      <div className="combineTwo">
                      <div className="dates">
                        {currentDates}
                        </div>
                    <div className="desc">
                      {groupSelected.description}
                    </div>

                      </div>
                    <div className="textAreas">
                      <textarea className="textAr"
                        value={groupSelected.description}
                        onChange={(e) => WriteGroupDescription(e.target.value)}
                        placeholder="Enter your text here..."
                        onKeyUp={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            e.target.value = " ";
                          }
                        }}
                      ></textarea>
                    </div>
                  </form>{" "}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Mobile;
