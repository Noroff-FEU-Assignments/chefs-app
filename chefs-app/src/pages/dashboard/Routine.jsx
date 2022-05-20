import { useEffect, useState } from "react" ;
import axios from "axios";
import { api } from "../../constants/api.js";


function Routine({routineId, done, name}) {
  const url = api + `/routines/${routineId}`;

  const [checked, setChecked] = useState(done);
  // console.log(done)
  // console.log(checked);
  
  function updateRoutine(e) {
    // console.log(e.target.checked);
    setChecked(e.target.checked)
  }
    

  async function sendCheck() {
  try {
    const response = await axios.put(url, {
      data: {
        done: checked,
      }
    });
    // console.log(response)
    } catch(error) {
      console.log(error);
    }
  }
  sendCheck();



  return (
    <>
    <div className="routines-item">
      <label>
        <input checked={checked} type="checkbox" onChange={(e) => updateRoutine(e)} />
        {name}
      </label>
    </div>
    </>
  )


}

export default Routine;