// import "./userList.css";

// import React, { useState, useEffect } from "react";
// // import User from "../user/User";
// import { DataGrid } from "@material-ui/data-grid";
// import { DeleteOutline } from "@material-ui/icons";
// import VisibilityIcon from "@material-ui/icons/Visibility";
// import { userRows } from "../../dummyData";
// import { Link } from "react-router-dom";
// // import { useState } from "react";
// import noteService from "../../services/users";
// // import { makeStyles } from "@material-ui/core/styles";

// import { ThemeProvider } from "@material-ui/core/styles";
// import { createMuiTheme } from "@material-ui/core/styles";

// import Menu from "../../components/menu/menu";

// export default function UserList() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     // noteService.getAll().then((initialNotes) => {
//     //   setData(initialNotes);
//     // });
//     setData(userRows);
//   }, []);

//   const handleDelete = (id) => {
//     setData(data.filter((item) => item.id !== id));
//   };

//   const columns = [
//     {
//       field: "name",
//       headerName: "Nombre",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="userListUser">
//             <img
//               className="userListImg"
//               src="https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Images-icon.png"
//               alt=""
//             />
//             {params.row.title}
//           </div>
//         );
//       },
//     },
//     { field: "userName", headerName: "Username", width: 160 },
//     { field: "phone", headerName: "Phone", width: 140 },
//     {
//       field: "city",
//       headerName: "Ciudad",
//       width: 120,
//     },

//     {
//       field: "action",
//       headerName: "Action",
//       width: 120,
//       renderCell: (params) => {
//         return (
//           <>
//             <Link to={"/user/" + params.row.id}>
//               <button
//                 className="userListEdit"
//                 // onClick={() => User.getUserId(params.row.id)}
//               >
//                 <VisibilityIcon
//                   className="iconVisibility"
//                   // onClick={() => handleDelete(params.row.id)}
//                 />
//               </button>
//             </Link>
//             <DeleteOutline
//               className="userListDelete"
//               onClick={() => handleDelete(params.row.id)}
//             />
//           </>
//         );
//       },
//     },
//   ];

//   const theme = createMuiTheme({
//     overrides: {
//       MuiDataGrid: {
//         root: {
//           backgroundColor: "#FFFFFF",
//           color: "#747474",
//           borderColor: "#ffffff00",
//           "& .MuiDataGrid-columnsContainer": {
//             backgroundColor: "#be0930",
//             color: "#FFFFFF",
//             borderRadius: "10px",
//           },
//           "& .MuiDataGrid-iconSeparator": {
//             display: "none",
//           },
//           "& .MuiCheckbox-root svg": {
//             width: 16,
//             height: 16,
//             color: "#B6B6B6",
//             backgroundColor: "transparent",

//             borderRadius: 0,
//           },
//           // "& .MuiDataGrid-cell": {
//           //   color: "red",
//           //   backgroundColor: "#2D3234",
//           //   borderRadius: "25px",
//           // },
//           // "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
//           //   borderRight: `1px solid red`,
//           //   borderLeft: `1px solid red`,
//           //   borderTop: `1px solid red`,
//           //   borderBottom: `1px solid red`,
//           //   borderRadius: "15px",
//           // },
//           "& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell": {
//             borderBottom: `none`,
//             "& .MuiPaginationItem-root": {
//               color: "red",
//               backgroundColor: "red",
//             },
//           },
//           // "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
//           //   color: "#FFFFFF",
//           //   borderRadius: "15px",
//           //   borderLeft: `1px solid blue`,
//           // },
//         },

//         // window: {
//         //   width: "120%",
//         // },
//       },
//     },
//   });
//   const itemsTest = [
//     { name: "All Users", link: "/users" },
//     { name: "+ Añadir Usuario", link: "/user/NewUser" },
//     { name: "Find User", link: "/users" },
//   ];

//   return (
//     // <div className="userList"></div>
//     // <div style={{ height: "50%", width: "100%" }} className="userList">
//     <>
//       <Menu menuItems={itemsTest} />
//       <div className="userList">
//         <div className="container-usuario">
//           <ThemeProvider theme={theme}>
//             <DataGrid
//               rows={data}
//               disableSelectionOnClick
//               columns={columns}
//               pageSize={50}
//             />
//           </ThemeProvider>
//         </div>
//       </div>
//     </>
//   );
// }

import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import noteService from "../../services/users";
import VisibilityIcon from "@material-ui/icons/Visibility";
import Menu from "../../components/menu/menu";

import { makeStyles } from "@material-ui/core/styles";

import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";

export default function UserList() {
  // const [data, setData] = useState(userRows);
  const [data, setData] = useState([]);

  useEffect(() => {
    noteService.getAll().then((initialNotes) => {
      setData(initialNotes);
      console.log(initialNotes);
    });
  }, []);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "name",
      headerName: "Nombre",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src="https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Images-icon.png"
              alt=""
            />
            {`${params.row.name.first} ${params.row.name.last}`}
          </div>
        );
      },
    },
    { field: "userName", headerName: "Username", width: 160 },
    {
      field: "phone",
      headerName: "Phone",
      width: 140,
      renderCell: (params) => {
        return <div>{`${params.row.contact.phone}`}</div>;
      },
    },
    {
      field: "city",
      headerName: "Ciudad",
      width: 120,
      renderCell: (params) => {
        const ciudad = params.row.contact.city;
        return <div>{ciudad == "" ? "Ecuador" : ciudad}</div>;
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              <button
                className="userListEdit"
                // onClick={() => User.getUserId(params.row.id)}
              >
                <VisibilityIcon
                  className="iconVisibility"
                  // onClick={() => handleDelete(params.row.id)}
                />
              </button>
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

  const itemsTest = [
    { name: "All Users", link: "/users" },
    { name: "+ Añadir Usuario", link: "/user/NewUser" },
    { name: "Find User", link: "/users" },
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
    <>
      <Menu menuItems={itemsTest} />
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
    </>

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
