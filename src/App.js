import React ,{ useState } from "react";
import { TextField, Button, DialogActions } from "@mui/material";
import { Scheduler } from "@aldabil/react-scheduler";
import type { SchedulerHelpers } from "@aldabil/react-scheduler/types";

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';



interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}
const CustomEditor = ({ scheduler }: CustomEditorProps) => {

  const event = scheduler.edited;

  const today = new Date();

  const year = today.getFullYear();
  const month = today.getMonth() + 1; // January is 0, so we need to add 1
  const day = today.getDate();
  
  const currentDate = `${year}-${month}-${day}`;






const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);

const tomorrowyear = tomorrow.getFullYear();
const tomorrowmonth = tomorrow.getMonth() + 1; // January is 0, so we need to add 1
const tomorrowday = tomorrow.getDate();

const tomorrowDate = `${tomorrowyear}-${tomorrowmonth}-${tomorrowday}`;







  const [startvalue, setStartvalue] = React.useState(dayjs(currentDate));
  const [endvalue, setEndvalue] = React.useState(dayjs(tomorrowDate));

  // Make your own form/state
  const [state, setState] = useState({
    title: event?.title || "",
    description: event?.description || "",
    start: "",
    end: ""
  });
  const [error, setError] = useState("");

  const handleChange = (value: string, name: string) => {
    setState((prev) => {
      return {
        ...prev,
        [name]: value
      };
    });
  };
  const handleSubmit = async () => {
    // Your own validation
    if (state.title == 0) {
      return setError("Min value is 1");
    }

    try {
      scheduler.loading(true);

      /**Simulate remote data saving */
      const added_updated_event = (await new Promise((res) => {
        /**
         * Make sure the event have 4 mandatory fields
         * event_id: string|number
         * title: string
         * start: Date|string
         * end: Date|string
         */
        setTimeout(() => {
          res({
            event_id: event?.event_id || Math.random(),
            title: state.title,
            start: startvalue,
            end: endvalue,
            description: state.description
          });
        }, 3000);
      }))

      scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
      scheduler.close();
    } finally {
      scheduler.loading(false);
    }
  };
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <p>Load your custom form/fields</p>
        <TextField
          label="Hotel Price"
          value={state.title}
          type="number"
          onChange={(e) => handleChange(e.target.value, "title")}
          error={!!error}
          helperText={error}
          fullWidth
        />
        <TextField
          type="number"
          label="Flight Price"
          value={state.description}
          onChange={(e) => handleChange(e.target.value, "description")}
          fullWidth
        />

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Start" value={startvalue} onChange={(newValue) => setStartvalue(newValue)}/>
            <DatePicker label="End" value={endvalue} onChange={(newValue) => setEndvalue(newValue)}/>
          </DemoContainer>
        </LocalizationProvider>


      </div>
      <DialogActions>
        <Button onClick={scheduler.close}>Cancel</Button>
        <Button onClick={handleSubmit}>Confirm</Button>
      </DialogActions>
    </div>
  );
};

function App() {
  return (
    <Scheduler
      customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
      viewerExtraComponent={(fields, event) => {
        return (
          <div>
            <p>Useful to render custom fields...</p>
            <p>Description: {event.description || "Nothing..."}</p>
          </div>
        );
      }}
    />
  );
}

export default App;
