import React from "react";
import Rectangle from "./Rectangle.js";
import "../main/Contact.css";
export default function Contact() {
  return (
    <div>
      <Rectangle title="Contact" />
      <div className="container-contact">
        <h1>Get In Touch With Us</h1>
        <span>
          For More Information About Our Product & Services. Please Feel Free To
          Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
          Hesitate!
        </span>
        <div className="container-contact__group">
          <div className="container-contact__group-left">
            <div className="group-address">
              <h1>
                <i className="bi bi-geo-alt-fill"></i>Address
              </h1>
              <span>236 5th SE Avenue, New York NY10000, United States</span>
            </div>
            <div className="group-address">
              <h1>
                <i className="bi bi-telephone-fill"></i>Phone
              </h1>
              <span>Mobile: +(84) 546-6789 Hotline: +(84) 456-6789</span>
            </div>
            <div className="group-address">
              <h1>
                <i className="bi bi-alarm-fill"></i>Working Time
              </h1>
              <span>
                Monday-Friday: 9:00 - 22:00 <br /> Saturday-Sunday: 9:00 - 21:00
              </span>
            </div>
          </div>
          <div className="container-contact__group-right">
            <span>Your name</span>
            <input
              type="text"
              required
              placeholder="Abc"
              className="content-input"
            ></input>
            <span>Email Address</span>
            <input
              type="email"
              required
              placeholder="Abc@def.com"
              className="content-input"
            ></input>
            <span>Subject</span>
            <input
              type="text"
              required
              placeholder="This is an optional"
              className="content-input"
            ></input>
            <span>Message</span>
            <input
              type="text"
              required
              placeholder="Hi! I'd like to ask about"
              className="content-input"
            ></input>
            <button type="button" className="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
}
