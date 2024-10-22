import { useState, useEffect } from "react";
import { fetchCars, deleteCar } from "../carapi";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";

import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-material.css"; // Optional Theme applied to the Data Grid

function CarList() {
  const [cars, setCars] = useState([]);

  const [snackbarState, setSnackbarState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const {vertical, horizontal, open} = snackbarState;

  const [colDefs] = useState([
    { field: "brand", filter: true },
    { field: "model", filter: true },
    { field: "color", filter: true, width: 150 },
    { field: "fuel", filter: true, width: 150 },
    { headerName: "Year", field: "modelYear", filter: true, width: 120 },
    { field: "price", filter: true },
    {
      headerName: "Actions",
      cellRenderer: (params) => (
        <Button
          onClick={() => handleDelete(params.data._links.self.href)}
          variant="contained"
          color="secondary"
        >
          Delete
        </Button>
      ),
      width: 150,
    },
  ]);

  useEffect(() => {
    handleFetch();
  }, []);

  const handleFetch = () => {
    fetchCars()
      .then((data) => setCars(data._embedded.cars))
      .catch((err) => console.error(err));
  };

  const handleDelete = (url) => {
    if (window.confirm("Are you sure?")) {
      deleteCar(url)
        .then(() => {
          handleFetch();
          setSnackbarState({ ...snackbarState, open: true });
        })
        .catch((err) => console.error("Error deleting car:", err));
    }
  };

  const handleCloseSnackbar = () => {
    // Close the snackbar
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <>
      <div className="ag-theme-material" style={{ height: 500 }}>
        <AgGridReact
          rowData={cars}
          columnDefs={colDefs}
          pagination={true}
          paginationAutoPageSize={true}
          suppressCellFocus={true}
        />
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message="Car deleted"
      />
    </>
  );
}
export default CarList;
