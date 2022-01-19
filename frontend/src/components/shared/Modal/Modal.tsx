import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

type IModalOverlay = {
  header: any;
  footer: any;
};

type IModal = IModalOverlay & {};

const ModalOverlay: React.FC<IModalOverlay> = (props) => {
  const hook = document.getElementById("modal-hook") as HTMLElement;

  const content = (
    <div className={`${classes.modal}`}>
      <header className={`${classes.modalHeader}`}>
        <div>{props.header}</div>
      </header>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className={`${classes.modalContent}`}>{props.children}</div>
        <footer className={`${classes.modalFooter}`}>{props.footer}</footer>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, hook);
};

const Modal: React.FC<IModal> = (props) => {
  return (
    <React.Fragment>
      <ModalOverlay
        header={props.header}
        footer={props.footer}
        children={props.children}
      />
    </React.Fragment>
  );
};

export default Modal;
