import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function AddRowModal(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");
  return (
    <Modal show={props.showAdd} onHide={props.setShowClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter row details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error ? (
          <div>
            <Alert variant="danger">{error}</Alert>
          </div>
        ) : null}
        <Form>
          <Form.Group className="mb-3" controlId="addForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              autoFocus
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="addForm.ControlInput2">
            <Form.Label>Age</Form.Label>
            <Form.Control
              type="number"
              onChange={(e) => {
                setAge(e.target.value);
                setError("");
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.setShowClose}>
          Close
        </Button>
        <Button
          variant="outline-info"
          onClick={() => {
            if (name === "") {
              setError("Name field cannot be empty");
            } else if (age === "" || age === "0") {
              setError("Age cannot be empty or 0");
            } else {
              setError("");
              props.addRow({ name, age: Number(age) });
              props.setShowClose();
            }
          }}
        >
          Add row
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddRowModal;
