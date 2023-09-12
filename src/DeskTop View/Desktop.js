import desktop from "./desktop.css";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { format } from "date-fns";
import moment from "moment";
import { Link } from "react-router-dom";
import { Modal, ModalHeader } from "reactstrap";
import LOGO from "./images/left-arrow.png";
function Desktop(props) {
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
    <div className="StartJourney">
    {/* <div className="desktopApp"> */}
     
     <div className="firstHalf">
        <section>
          <div className="AppHeadings">
            <h1 className="topicName">Pocket Notes</h1>
          </div>
          <div className="AddNotesDivs">
            <button className="AddNote" onClick={() => setVisible(true)}>
              &nbsp;+ &nbsp; Create Notes group &nbsp;
            </button>
          </div>
          <p className="modal">
            <ReactModal
              className="models"
              isOpen={visible}
              onRequestClose={() => setVisible(false)}
            >
              <p className="PopHeadings">Create New Notes group</p>
              <label className="groupN">
                Group Name{" "}
                <input
                  type="text" className="inputTags"
                  value={inputText}
                  placeholder="Enter your group name.."
                  onChange={handleGroup}
                ></input>
              </label>
              <div className="colorPicker">
                <div className="colorDivs">
                <span className="chooseColors">Choose colour&nbsp;&nbsp;&nbsp;</span>
                <span className="colors">
                <input
                  type="radio"
                  onClick={handleColor1}
                  name="pick-color1"
                  value="#B38BFA"
                  className="FirstColors" checked
                />
                <input
                  type="radio"
                  onClick={handleColor2}
                  name="pick-color2"
                  value="#FF79F2"
                  className="SecondColors" checked
                />
                <input
                  type="radio"
                  onClick={handleColor3}
                  name="pick-color3"
                  value="#43E6FC"
                  className="ThirdColors" checked
                />
                <input
                  type="radio"
                  onClick={handleColor4}
                  name="pick-color4"
                  value="#F19576"
                  className="FourthColors" checked
                />
                <input
                  type="radio"
                  onClick={handleColor5}
                  name="pick-color5"
                  value="#0047FF"
                  className="FifthColors" checked
                />
                <input
                  type="radio"
                  onClick={handleColor6}
                  name="pick-color6"
                  value="#6691FF"
                  className="SixthColors" checked
                />
                </span></div>
              </div>
             <div className="createss">
             <button
                className="creat"
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
                className="list-items"
                onClick={() => {
                  setShow(false);
                  displayDetails(group);
                }}
                key={index}
              >
                <span
                  style={{ background:color1 }}
                  className="profileNames"
                  key={index}
                >
                  {group.name.slice(0, 2)}
                </span><span className="GroupNamesCategorys">
                {group.name}</span>
              </li>
            ))}
          </div>
        </section>
</div>

      {!show && (
<div className="divSection2"> 
        <section className="sections2">
          <div className="sector11">
            {groupSelected && (
              <div>
                <div className="headingSection22">
                <span className="headingSection33">
            <button className="btnArrs"
              onClick={() => {
                setShow(true);
              }}
            >
             <span className="images"> <img src={LOGO} alt="logo" /></span>
            </button>
            

                 <span className="profileNames2">{groupSelected.name.slice(0,2)}</span>
                  <span className="profiles">{groupSelected.name}</span>
           
                </span></div>
                <div>
                  <form onSubmit={SubmitDescription}>
                      <div className="combineTwos">
                      <div className="date">
                        {currentDates}
                        </div>
                    <div className="descs">
                      {groupSelected.description}
                    </div>

                      </div>
                    <div className="textAreass">
                      <textarea 
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
        </section></div>
      )}
      </div>
   
  )}





  export default Desktop;