import { useEffect, useState, useContext } from "react" ;
import axios from "axios";
import { api } from "../../constants/api.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import AuthContext from "../../utilities/AuthContext.jsx";


function Routine({routineId, done, name, deleteRoutine}) {
  const url = api + `/routines/${routineId}`;
  const [checked, setChecked] = useState(done);
  const [auth, setAuth] = useContext(AuthContext);
  
  function updateRoutine(e) {
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


  // Delete button if admin is logged
  let deleteRoutineBtn = "";
  if (auth && auth.data.user.email === "admin@admin.com") {
    deleteRoutineBtn = <span className="delete-routine-btn" onClick={deleteRoutine}><FontAwesomeIcon icon={solid('trash')}/></span>

  }

  return (
    <>
    <div className="routines-item">
      <label>
        <input checked={checked} type="checkbox" onChange={(e) => updateRoutine(e)} />
        <span className="routines-name">{name}</span>
      </label>
      {deleteRoutineBtn}
    </div>
    </>
  )


}

export default Routine;