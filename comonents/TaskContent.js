import React, { useState, useContext } from "react";
// import Link from "next/link";
// import { useMutation } from "@apollo/client";
// import { DELETE_USER, UPDATE_USER } from "../query /user";
import { CostContext } from "../context/Context";
import TextNotes from "./TextNotes";
import InputNotes from "./InputNotes";
// import { IconButton } from "@material-ui/core";
// import { TextField } from "@material-ui/core";
// import DeleteIcon from "@material-ui/icons/Delete";
// import EditIcon from "@material-ui/icons/Edit";
// import CheckCircleIcon from "@material-ui/icons/CheckCircle";
// import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export default function TaskContent() {
  const { allCosts, sum } = useContext(CostContext);
  // const [valueWhere, setValueWhere] = useState('');
  // const [valueHowMuch, setValueHowMuch] = useState('');
  // const [deleteUser] = useMutation(DELETE_USER);
  // const [updateUser] = useMutation(UPDATE_USER);
  const [editIndex, setEditIndex] = useState(-1);

  return (
    <div className="task_content">
      <div>
        <span>{`Итого: ${sum}`}</span>
      </div>
      {allCosts.length > 0 &&
        allCosts.map((value, index) => (
          <div
            key={`${value.id}-cost`}
            id={`${value.id}-task`}
            className="cost"
          >
            {editIndex !== index ? (
              <TextNotes
                oneCost={value}
                index={index}
                setEditIndex={setEditIndex}
              />
            ) : (
              <InputNotes oneCost={value} setEditIndex={setEditIndex} />
            )}
          </div>
        ))}
    </div>
  );
}

// const deleteHandler = (currentId) => {
//   try {
//     deleteUser({
//       variables: {
//         id: currentId,
//       },
//     }).then(() => {
//       setAllCost((prev) => prev.filter(({ id }) => id !== currentId));
//     });
//   } catch (error) {
//     alert(error);
//   }
// };

// const editHandler = (index) => {
//   setEditIndex(index);
// };

// const checkHandler = (currentId) => {
//   if (valueWhere && valueHowMuch) {
//     try {
//       updateUser({
//         variables: {
//           id: currentId,
//           place: valueWhere,
//           cost: +valueHowMuch,
//         },
//       }).then(({ data }) => {
//         setAllCost((current) =>
//           current.map((value) => {
//             if (value.id === data.updateUser.id) {
//               return data.updateUser;
//             }
//             return value;
//           })
//         );
//       });
//     } catch (error) {
//       console.log(error);
//     }
//     setEditIndex(-1);
//     setValueWhere('');
//     setValueHowMuch('');
//   } else {
//     alert("Не заполнены все поля");
//   }
// };

// const backHandler = () => {
//   setEditIndex(-1);
//   setValueWhere('');
//   setValueHowMuch('');
// };

//   return (
//     // <div className="task_content">
//     //   <div>
//     //     <span>{`Итого: ${sum}`}</span>
//     //   </div>
//     //   {allCosts.length > 0 &&
//     //     allCosts.map((value, index) => (
//     //       <div key={`key-${value.id}`} id={`${value.id}-task`} className="cost">
//             (editIndex !== index) ? (
//               <TextNotes oneCost={value}/>
//             ) : (
//               <InputNotes setEditIndex={setEditIndex}/>
//             )
//             {/* {editIndex !== index ? (
//               <Link href={`/node/${value.id}`}>
//                 <div className="info_about_task">
//                   <div className="cost_value">
//                     <p>{value.place}</p>
//                   </div>
//                   <div className="cost_value">
//                     <p>{value.cost}</p>
//                   </div>
//                 </div>
//               </Link>
//             ) : ( */}
//             {/* <div className="input_info_task">
//                 <TextField
//                   className="input_reason"
//                   variant="outlined"
//                   value={valueWhere}
//                   type="text"
//                   label="Куда было потрачено:"
//                   onChange={(event) => setValueWhere(event.target.value)}
//                 />
//                 <TextField
//                   className="input_how_much"
//                   variant="outlined"
//                   value={valueHowMuch}
//                   type="number"
//                   label="Сколько было потрачено:"
//                   onChange={(event) => setValueHowMuch(event.target.value)}
//                 />
//               </div> */}
//             {/* )} */}
//             {/* {editIndex !== index ? (
//               <div className="button">
//                 <IconButton
//                   aria-label="delete"
//                   className="button_delete"
//                   onClick={() => deleteHandler(value.id)}
//                 >
//                   <DeleteIcon fontSize="large" className="deleteButton" />
//                 </IconButton>
//                 <IconButton
//                   aria-label="edit"
//                   className="button_edit"
//                   onClick={() => editHandler(index)}
//                 >
//                   <EditIcon fontSize="large" className="editButton" />
//                 </IconButton>
//               </div>
//             ) : ( */}
//             {/* <div className="button">
//                 <IconButton
//                   aria-label="delete"
//                   className="button_oncheck"
//                   onClick={() => checkHandler(value.id)}
//                 >
//                   <CheckCircleIcon fontSize="large" className="checkButton" />
//                 </IconButton>
//                 <IconButton
//                   aria-label="edit"
//                   className="button_back"
//                   onClick={() => backHandler()}
//                 >
//                   <ArrowBackIcon fontSize="large" className="backButton" />
//                 </IconButton>
//               </div> */}
//             {/* )} */}
//     //       </div>
//     //     ))}
//     // </div>
//   // );
// }
