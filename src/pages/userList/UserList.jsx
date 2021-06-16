import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

export default function UserList() {
  const [data, setData] = useState(userRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "user",
      headerName: "User",
      width: 120,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 140 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "transaction",
      headerName: "Ingreso",
      width: 130,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  const theme = createMuiTheme({
    overrides: {
      MuiDataGrid: {
        root: {
          backgroundColor: "#FFFFFF",
          color: "#747474",
          borderColor: "#ffffff00",
          "& .MuiDataGrid-columnsContainer": {
            backgroundColor: "#be0930",
            color: "#FFFFFF",
            borderRadius: "10px",
          },
          "& .MuiDataGrid-iconSeparator": {
            display: "none",
          },
          "& .MuiCheckbox-root svg": {
            width: 16,
            height: 16,
            color: "#B6B6B6",
            backgroundColor: "transparent",

            borderRadius: 0,
          },
          // "& .MuiDataGrid-cell": {
          //   color: "red",
          //   backgroundColor: "#2D3234",
          //   borderRadius: "25px",
          // },
          // "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
          //   borderRight: `1px solid red`,
          //   borderLeft: `1px solid red`,
          //   borderTop: `1px solid red`,
          //   borderBottom: `1px solid red`,
          //   borderRadius: "15px",
          // },
          "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
            borderBottom: `none`,
            "& .MuiPaginationItem-root": {
              color: "red",
              backgroundColor: "red",
            },
          },
          // "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
          //   color: "#FFFFFF",
          //   borderRadius: "15px",
          //   borderLeft: `1px solid blue`,
          // },
        },

        // window: {
        //   width: "120%",
        // },
      },
    },
  });

  return (
    // <div className="userList"></div>
    // <div style={{ height: "50%", width: "100%" }} className="userList">

    <div className="userList">
      <div className="container-usuario">
        <ThemeProvider theme={theme}>
          <DataGrid
            rows={data}
            disableSelectionOnClick
            columns={columns}
            pageSize={50}
            checkboxSelection
          />
        </ThemeProvider>
      </div>
    </div>

    // <div class="flex__container-horizontal">
    //   <div class="flex__item-formulario">
    //     <table>
    //       <tr>
    //         <th>Firstname</th>
    //         <th>Lastname</th>
    //         <th>Sav</th>
    //       </tr>
    //       <tr>
    //         <td>Peter</td>
    //         <td>Griffin</td>
    //         <td>$100</td>
    //       </tr>
    //       <tr>
    //         <td>Lois</td>
    //         <td>Griffin</td>
    //         <td>$150</td>
    //       </tr>
    //       <tr>
    //         <td>Joe</td>
    //         <td>Swanson</td>
    //         <td>$300</td>
    //       </tr>
    //       <tr>
    //         <td>Cleveland</td>
    //         <td>Brown</td>
    //         <td>$250</td>
    //       </tr>
    //     </table>
    //   </div>
    // </div>
    // // <!-- final de flex horizontal -->
  );
}
