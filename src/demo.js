import * as React from "react";
import { products } from "./assets/products";
import DataGrid from "./datagrid";
import getCustomToolbar from "./CustomToolbar";
import { Normal_Table_Data } from "./assets/normalTableData";
import { GridLinkOperator, getGridStringOperators } from "@mui/x-data-grid-pro";

const CustomToolbar = getCustomToolbar();

const columns = [
  { field: "id", hide: true },
  {
    field: "name",
    headerName: "Product Name",
    minWidth: 200,
    flex: 1,
    editable: true
  }
];
//custom filters
const filterOperators = getGridStringOperators().filter(
  (operator) => operator.value === 'startsWith' || operator.value === 'equals',
);
//pre define columns

const normal_table_columns = [
  {
    field: "attribute", headerName: "Attribute", hide: false, filterOperators: filterOperators
  },
  {
    field: "access",
    headerName: "Access",
    minWidth: 200,
    flex: 1,
    editable: true
  },
  {
    field: "optionality",
    headerName: "Optionality",
    minWidth: 200,
    flex: 1,
    editable: true
  },
  {
    linkOperators: ['and']
  }
];
const handleSaveRow = () => {
  // TODO: Save row
};

const handleDeleteRow = () => {
  // TODO: Delete row
};

const handleEditnNormalTableClick = (id) => {
  // navigate(`/products/${id}`);
};

// normal_table
const handleNormalTableSaveRow = () => {
  // TODO: Save row
};

const handleNormalTableDeleteRow = () => {
  // TODO: Delete row
};

const handleEditClick = (id) => {
  // navigate(`/products/${id}`);
};

export default function PageSizeCustomOptions() {
  return (
    <>
      <div style={{ height: 300, width: "100%" }}>
        <h3>DATAGRID TABLE</h3>
        <DataGrid
          columns={columns}
          initialRows={products || []}
          handleSaveRow={handleSaveRow}
          handleDeleteRow={handleDeleteRow}
          onEditClick={handleEditClick}
          dataGridProps={{
            pagination: true,
            components: {
              Toolbar: CustomToolbar
            },
            loading: false,
            initialState: {
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }]
              }
            }
          }}
          height={300}
          linkOperators={[GridLinkOperator.And, GridLinkOperator.Or]}

        />
      </div>
      <br />
      <br />
      <br />

      <div style={{ height: "50%", width: "100%" }}>
        <h3>NORMAL TABLE</h3>
        <DataGrid
          columns={normal_table_columns}
          initialRows={Normal_Table_Data || []}
          handleSaveRow={handleNormalTableSaveRow}
          handleDeleteRow={handleNormalTableDeleteRow}
          onEditClick={handleEditnNormalTableClick}
          dataGridProps={{
            pagination: true,
            components: {
              Toolbar: CustomToolbar
            },
            loading: false,
            initialState: {
              sorting: {
                sortModel: [{ field: "attribute", sort: "desc" }]
              }
            }
          }}
          height={400}
          linkOperators={[GridLinkOperator.And]}

        />
      </div>
    </>
  );
}
