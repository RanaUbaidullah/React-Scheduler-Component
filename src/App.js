import React from "react";
import MonthlyCalendar from "./MonthlyCalendar";
import "./App.css"
// import { TextField, Button, DialogActions } from "@mui/material";
// import { Scheduler } from "@aldabil/react-scheduler";
// import type { SchedulerHelpers } from "@aldabil/react-scheduler/types";
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import dayjs from 'dayjs';
// import Box from '@mui/material/Box';

// interface CustomEditorProps {
//   scheduler: SchedulerHelpers;
// }

// const CustomEditor = ({ scheduler }: CustomEditorProps) => {
//   const event = scheduler.edited;

//   // console.log(scheduler.state.start.value)

//   const [startvalue, setStartvalue] = useState(dayjs(scheduler.state.start.value));
//   const [endvalue, setEndvalue] = useState(dayjs(scheduler.state.end.value));

//   const [state, setState] = useState({
//     title: event?.title || "",
//     description: event?.description || "",
//   });

//   const handleChange = (value: string, name: string) => {
//     setState((prev) => {
//       return {
//         ...prev,

//         [name]: value
//       };
//     });
//   };

//   const handlestartdate= (startfdate)=> {
//     console.log(startfdate)
    
//     setStartvalue(startfdate)
//     console.log(startvalue)

//   }
//   const handleenddate= (endfdate)=> {
//     console.log(endfdate)
//     setEndvalue(endfdate)
//     console.log(endvalue)
//   }

//   const handleSubmit = async () => {
//     try {
//       scheduler.loading(true);

//       /**Simulate remote data saving */
//       const added_updated_event = (await new Promise((res) => {
//         /**
//          * Make sure the event have 4 mandatory fields
//          * event_id: string|number
//          * title: string
//          * start: Date|string
//          * end: Date|string
//          */
//         console.log(startvalue)
//         console.log(endvalue)
//         setTimeout(() => {
//           res({
//             event_id: event?.event_id || Math.random(),
//             title: state.title,
//             start: startvalue,
//             end: endvalue,
//             description: state.description,
//           });
//         }, 3000);
//       }))

//       scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
//       scheduler.close();
//     } finally {
//       scheduler.loading(false);
//     }
//   };
//   return (
//     <div>
//       <div style={{ padding: "1rem" }}>
//         <p>Load your custom form/fields</p>
//         <Box
//           component="form"
//           sx={{
//             '& .MuiTextField-root': { m: 0.5, width: '34ch' },
//           }}
//           autoComplete="off"
//         >
//           <div>
//             <TextField
//               label="Hotel Price"
//               value={state.title}
//               type="number"
//               onChange={(e) => handleChange(e.target.value, "title")}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               fullWidth
//             />
//             <TextField
//               label="Flight Price"
//               value={state.description}
//               onChange={(e) => handleChange(e.target.value, "description")}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//           </div>
//         </Box>

//         <LocalizationProvider dateAdapter={AdapterDayjs}>
//           <DemoContainer components={['DatePicker']}>
//             <DatePicker label="Start" value={startvalue} onChange={(newValue) =>handlestartdate(newValue.$d)} />
//             <DatePicker label="End" value={endvalue} onChange={(newValue) => handleenddate(newValue.$d)} />
//           </DemoContainer>
//         </LocalizationProvider>
//       </div>
//       <DialogActions>
//         <Button onClick={scheduler.close}>Cancel</Button>
//         <Button onClick={handleSubmit}>Confirm</Button>
//       </DialogActions>
//     </div>
//   );
// };
function App() {
  return (
    <>
    <div className="Heading">
    <img height="60px" src="calendar.png"  alt="calendar"></img>
    <h1>Calendar</h1>
    </div>
    <MonthlyCalendar/>
    </>



    // <>
    //   <Scheduler
    //     customEditor={(scheduler) => <CustomEditor scheduler={scheduler}
    //     />}
    //     view="mounth"
    //     day={null}
    //     today={null}
    //     month={{
    //       weekDays: [0, 1, 2, 3, 4, 5],
    //       weekStartOn: 6,
    //       startHour: 9,
    //       endHour: 17,
    //       navigation: true,
    //       disableGoToDay: false
    //     }}
    //     week={null}
    //     viewerExtraComponent={(fields, event) => {
    //       return (
    //         <div>
    //           <p>Useful to render custom fields...</p>
    //           <p>Description: {event.description || "Nothing..."}</p>
    //         </div>
    //       );
    //     }}
    //   />
    // </>
  );
}

export default App;
