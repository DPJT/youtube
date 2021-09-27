// export default function SkeletonUserList() {
//   return (
//     <>
//       <table>
//         <thead>
//           <tr>
//             <th>
//               <Skeleton />
//             </th>
//             <th>
//               <Skeleton />
//             </th>
//             <th>
//               <Skeleton />
//             </th>
//             <th>
//               <Skeleton />
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>
//               <Skeleton />
//             </td>
//             <td>
//               <Skeleton />
//             </td>
//             <td>
//               <Skeleton />
//             </td>
//             <td>
//               <Skeleton />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </>
//   );
// }

import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function SkeletonUserList() {
  return (
    <>
      <SkeletonTheme
        color="rgba(6, 13, 31, 0.473)"
        highlightColor="rgba(8, 26, 73, 0.473)"
      >
        <div style={{ fontSize: 20, lineHeight: 2 }}>
          <h1>{<Skeleton />}</h1>
          {<Skeleton count={15} />}
        </div>
      </SkeletonTheme>
    </>
  );
}
