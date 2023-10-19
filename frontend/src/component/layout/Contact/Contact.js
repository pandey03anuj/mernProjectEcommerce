import React from "react";
import "./Contact.css";
import { Button } from "@mui/material";

const Contact = () => {
  return (
    <div className="contactContainer">
      <a className="mailBtn" href="mailto:pandey03anuj@gmail.com;">
        <Button>Contact: pandey03anuj@gmail.com</Button>
      </a>
    </div>
  );
};

export default Contact;
