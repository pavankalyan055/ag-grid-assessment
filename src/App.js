import "./App.css";
import Container from "react-bootstrap/Container";
import "bootstrap/dist/css/bootstrap.min.css";
import DataGrid from "./Components/DataGrid";

function App() {

  return (
    <>
      <Container className="dataGrid-block" >
        <DataGrid />
      </Container>
    </>
  );
}

export default App;
