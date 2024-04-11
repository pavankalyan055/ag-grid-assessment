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

let initialData = [
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
  ]

function DataGrid(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [rowParams, setRowParams] = useState({});
  const [rowData, setRowData] = useState(initialData);
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
  const addRow = useCallback((row) => {
    let id  = initialData.length>0?initialData[initialData.length-1].id+1:1;
    initialData = [...initialData,{...row,id}];

    setRowData(initialData);
  }, []);

  const editRow = useCallback((p, row) => {
    initialData = initialData.map((ro,r)=>{
        if(row.id===ro.id){
            return {
                ...row
            }
        }
        return ro;
    })

    setRowData(initialData);
  }, []);

  const deleteRow = useCallback((p) => {
    initialData = initialData.filter((row,r)=>row.id!==Number(p.node.id))

    setRowData(initialData);
  }, []);

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
          animateRows={true}
        />
      </div>
    </>
  );
}

export default DataGrid;
