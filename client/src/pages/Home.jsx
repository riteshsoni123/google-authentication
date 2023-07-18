import React from "react";
import axios from "axios";
import { useState } from "react";

export default function Home(data) {
  const [key, setKey] = useState("");
  const [editValue, setEditValue] = useState("");

  const [user, setUser] = useState({
    username: data.user.username,
    location: !data.user.location ? "" : data.user.location,
    summary: !data.user.summary ? "" : data.user.summary,
    website: !data.user.website ? "" : data.user.website,
    github: !data.user.github ? "" : data.user.github,
    linkedin: !data.user.linkedin ? "" : data.user.linkedin,
    twitter: !data.user.twitter ? "" : data.user.twitter,
    work: !data.user.work ? "" : data.user.work,
    education: !data.user.education ? "" : data.user.education,
    skill: !data.user.skill ? "" : data.user.skill,
  });

  const user_default = {
    location: "Tell us your location",
    summary: "Tell us about yourself",
    website: "Your blog, portfolio, etc",
    github: "Your github username or url",
    linkedin: "Your LinkedIn username or url",
    twitter: "Your Twitter username or url",
    work: "Add a workplace",
    education: "Add a school",
    skill: "Your Skills",
  };

  const basic_info = [
    "username",
    "location",
    "summary",
    "website",
    "github",
    "linkedin",
    "twitter",
  ];
  const experience = ["work", "education"];
  const skill = ["skill"];

  const editClicked = (key) => {
    console.log(key, user[key]);
    setKey(key);
    setEditValue(user[key]);
  };

  const saveButton = async () => {
    user[key] = editValue;
    setUser(user);
    console.log(user);

    const config = {
      headers: {
        contentType: "application/json",
      },
    };

    try {
      const url = `${process.env.REACT_APP_API_URL}/auth/editdetail/${data.user._id}`;
      await axios.post(url, user, config);
    } catch (error) {
      console.log(error);
    }

    setKey("");
    setEditValue("");
  };

  const cancelButton = () => {
    setKey("");
    setEditValue("");
  };

  const logout = () => {
    window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
  };

  return (
    <div>
      <div className="bg-[#4a4848] flex items-center px-32 pt-16 pb-32">
        <img
          className="border-4 border-white rounded-lg mr-32 ml-80 w-32"
          src={data.user.image}
          alt=""
        />
        <h1 className="text-white text-3xl">Ritesh Soni</h1>
        <button className="" onClick={logout}>
          Log Out
        </button>
      </div>
      <div className="flex justify-center">
        <div></div>
        <div className="w-1/2 [&>div>h1]:m-4 absolute">
          <div className="shadow-md relative -translate-y-20 p-6 rounded-lg bg-white">
            <h1 className="font-bold">Basic Info</h1>
            <div className="[&>div]:mt-2 [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:p-2 [&>div>p]:text-blue-600 [&>div>p]:cursor-pointer [&>div>p]:text-right">
              {basic_info.map((element) => {
                return key === element ? (
                  <div key={element}>
                    <span className="w-1/4">
                      {element.charAt(0).toUpperCase() + element.slice(1)}
                    </span>
                    <input
                      className=" w-2/4 border-2 rounded-lg p-1 mr-2"
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                    <div className="w-1/4 [&>button]:rounded-lg [&>button]:mr-2 [&>button]:w-1/2 flex">
                      <button
                        className="bg-blue-500"
                        onClick={() => saveButton()}
                      >
                        Save
                      </button>
                      <button
                        className="bg-[#918d8d]"
                        onClick={() => cancelButton()}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div key={element}>
                    <span className="w-1/4">
                      {element.charAt(0).toUpperCase() + element.slice(1)}
                    </span>
                    <span className="w-2/4">
                      {user[element] === ""
                        ? user_default[element]
                        : user[element]}
                    </span>
                    <p className="w-1/4" onClick={() => editClicked(element)}>
                      Edit
                    </p>
                  </div>
                );
              })}
            </div>
            <h1 className="font-bold">Experience</h1>
            <div className="[&>div]:mt-2 [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:p-2 [&>div>p]:text-blue-600 [&>div>p]:cursor-pointer [&>div>p]:text-right">
              <div>
                <span className="w-1/4">Work</span>
                <span className="w-2/4">
                  {user.work === "" ? "Add a workplace" : user.work}
                </span>
                <p className="w-1/4">Edit</p>
              </div>
              <div>
                <span className="w-1/4">Education</span>
                <span className="w-2/4">
                  {user.education === "" ? "Add a school" : user.education}
                </span>
                <p className="w-1/4">Edit</p>
              </div>
            </div>
            <h1 className="font-bold">Skills</h1>
            <div className="[&>div]:mt-2 [&>div]:flex [&>div]:justify-between [&>div]:border-b [&>div]:p-2 [&>div>p]:text-blue-600 [&>div>p]:cursor-pointer [&>div>p]:text-right">
              <div>
                <span className="w-1/4">Technical Skills</span>
                <span className="w-2/4">
                  {user.skill === "" ? "Your Skills" : user.skill}
                </span>
                <p className="w-1/4">Edit</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
