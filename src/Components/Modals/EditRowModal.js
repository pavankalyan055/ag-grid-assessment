import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function EditRowModal(props) {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.p.data?.name) setName(props.p.data.name);
    if (props.p.data?.age) setAge(props.p.data.age);
  }, [props.p.data]);
  return (
    <Modal show={props.showEdit} onHide={props.setShowClose}>
      <Modal.Header closeButton>
        <Modal.Title>Update row details</Modal.Title>
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
              value={name}
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
              value={age}
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
              setError("Name field cannnot be empty");
            } else if (age === "" || age === "0") {
              setError("Age cannot be empty or 0");
            } else {
              setError("");
              props.editRow(props.p, {
                name,
                age: Number(age),
                id: props.p.data?.id
              });
              props.setShowClose();
            }
          }}
        >
          Update row
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditRowModal;
