import React, { useCallback, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDeleteLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import AddRowModal from "./Modals/AddRowModal";
import EditRowModal from "./Modals/EditRowModal";

const deleteTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Delete row
  </Tooltip>
);
const editTooltip = (props) => (
  <Tooltip id="button-tooltip" {...props}>
    Edit row
  </Tooltip>
);

function DataGrid(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [rowParams, setRowParams] = useState({});
  const [rowData, setRowData] = useState([
    {
      id: 1,
      name: "John Doe",
      age: 25
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 30
    },
    {
      id: 3,
      name: "Mike Johnson",
      age: 35
    }
  ]);
  const gridRef = useRef();

  const Buttons = (p) => {
    return (
      <div className="dataGrid-btnGrp">
        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={editTooltip}
        >
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => {
              setShowEdit(true);
              setRowParams(p);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </Button>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          delay={{ show: 250, hide: 400 }}
          overlay={deleteTooltip}
        >
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => deleteRow(p)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </Button>
        </OverlayTrigger>
      </div>
    );
  };

  const [colDefs, setColDefs] = useState([
    {
      field: "id",
      filter: true,
      flex: 1,
      editable: true,
      cellEditor: "agTextCellEditor"
    },
    {
      field: "name",
      filter: true,
      flex: 2,
      editable: true,
      cellEditor: "agTextCellEditor"
    },
    {
      field: "age",
      filter: true,
      flex: 2,
      editable: true,
      cellEditor: "agTextCellEditor"
    },
    {
      flex: 1,
      cellRenderer: Buttons
    }
  ]);

  // Functions for adding, editing and deleting rows
  const addRow = (row) => {
    let id = rowData.length + 1;
    row.id = id;

    setRowData([...rowData, row]);
  };

  const editRow = useCallback(
    (p, row) => {
      p.api?.applyTransaction({ update: [row] });

      setRowData(
        rowData.map((ro, r) => {
          console.log(ro, row);
          if (ro.id === p.data.id) {
            return { ...row };
          }
          return { ...ro };
        })
      );
    },
    [rowData]
  );

  const deleteRow = useCallback(
    (p) => {
      p.api?.applyTransaction({ remove: [p.data] });

      setRowData(rowData.filter((row, r) => r !== p.data.id));
    },
    [rowData]
  );

  const getRowId = useCallback((params) => params.data.id, []);

  return (
    <>
      <div className="ag-theme-quartz" style={{ height: 500, width: 800 }}>
        <div className="dataGrid-addNew">
          <Button
            variant="outline-info"
            size="sm"
            onClick={() => setShowAdd(true)}
          >
            Add new row
          </Button>
        </div>

        {/*Modals for adding and editing rows*/}
        <AddRowModal
          showAdd={showAdd}
          setShowClose={() => setShowAdd(false)}
          addRow={addRow}
        />
        <EditRowModal
          showEdit={showEdit}
          setShowClose={() => {
            setShowEdit(false);
            setRowParams({});
          }}
          editRow={editRow}
          p={rowParams}
        />

        <AgGridReact
          ref={gridRef}
          getRowId={getRowId}
          rowData={rowData}
          columnDefs={colDefs}
        />
      </div>
    </>
  );
}

export default DataGrid;
