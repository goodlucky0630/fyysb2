import { Box } from "@mui/material";
import { GridActionsCellItem, GridRowModes } from "@mui/x-data-grid-pro";
import React, { useEffect, useState } from "react";
import { DataGridPro } from "@mui/x-data-grid-pro";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

export default function DataGrid({
  initialRows,
  columns,
  handleDeleteRow,
  onEditClick,
  dataGridProps,
  height,
  linkOperators
}) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  useEffect(() => {
    setRows(initialRows);
  }, [initialRows]);

  const handleEditClick = (id) => () => {
    onEditClick(id);
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true }
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleDeleteClick = (id) => () => {
    console.log(id);
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const actions = {
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 150,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            key="save"
            icon={<SaveIcon />}
            label="Save"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            key="cancel"
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
            color="inherit"
          />
        ];
      }

      return [
        <GridActionsCellItem
          key="edit"
          icon={<EditTwoToneIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
          color="inherit"
        />,
        <GridActionsCellItem
          key="delete"
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="inherit"
        />
      ];
    }
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: 300,
        position: "relative",
        "& .MuiDataGrid-columnHeaders": selectedRowIds.length > 0 && {
          backgroundColor: "rgb(200, 250, 205)"
        }
      }}
    >
      <div style={{ flexGrow: 1, height: height }}>
        <DataGridPro
          {...dataGridProps}
          columns={[...columns, actions]}
          rows={rows}
          disableSelectionOnClick
          onSelectionModelChange={setSelectedRowIds}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
          onPageSizeChange={setPageSize}
          rowsPerPageOptions={[5, 10, 20]}
          pagination
          rowHeight={56}
          editMode="row"
          rowModesModel={rowModesModel}
          processRowUpdate={processRowUpdate}
          onRowModesModelChange={setRowModesModel}
          experimentalFeatures={{ newEditingApi: true }}
          componentsProps={{
            toolbar: { setRows, setRowModesModel, setPage },
            filterPanel: { linkOperators: linkOperators, filterFormProps: ['equals'] }
          }}
        />
      </div>
    </Box>
  );
}
