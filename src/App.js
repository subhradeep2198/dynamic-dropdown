
import './App.css';
import React, {useState} from "react";
import task from "./task.json"

function App() {

  var [data, setData] = useState(task)
  var [states, setStates] = useState([])
  var [cities, setCities] = useState([])
  const [search, setSearch] = useState("")
  const [drop, setDrop] = useState(0)
  const [disp, setDisp] = useState("none")

  function toggle(){
    if(drop === 0){
      setDrop(1)
      setDisp("block")
    }
    else if(drop === 1){
      setDrop(0)
      setDisp("none")
    }
  }

  function newCity(e, state){
    var newVal = e.target.value;
    var check = document.getElementById(e.target.value);
    if(check.checked){
      setCities([...cities, newVal])
      document.getElementById(state).checked = true;
      setStates([...states, state])
    }
    else{
      var index = cities.indexOf(newVal)
      cities.splice(index, 1)
    }
    
  }

  function changeState(e, c){
    var newVal = e.target.value;
    var check = document.getElementById(e.target.value);
    if(check.checked){
      setStates([...states, newVal])
      for(var i=0; i<c.length; i++){
        document.getElementById(c[i].name).checked = true

      } 
    }
    else{
      var index = states.indexOf(newVal)
      states.splice(index, 1)
      for(var i=0; i<c.length; i++){
        document.getElementById(c[i].name).checked = false
      }
    
    }
  
  }

function searching(e){
  setSearch(e.target.value)
}

function submit(){
  
  var fc = ""
  for(var i=0; i<data.length; i++){
    var state = data[i].state
    for(var j=0; j< state.length; j++){
      var c = state[j].city;
      for(var k=0; k< c.length; k++){
        var city = c[k].name
        var check = document.getElementById(city)
        if(check != null){
          if(check.checked === true){
            fc = fc + city + ", "
          }
        }
        
      }
    }
  }
  
  let uniqueStates = [...new Set(states)]
  
  var st = ""
  for(var i=0; i< uniqueStates.length; i++){
    st = st + uniqueStates[i] + ", "
  }
  
  
  console.log("States : " + st.substring(0, st.lastIndexOf(",")))
  console.log("Cities : " + fc.substring(0, fc.lastIndexOf(",")))
  
}
 


  return (
    <>
    <div className="row container-fluid justify-content-center">
      
      {
        data.map((s) => (
          <div key={s.country} className="col-2">
          <div className='text-center mt-3'>
            <button className="dropdown-button" onClick={toggle}>{s.country}</button>
          </div>
          <div className="mt-2" style={{display: disp}} >
          
          <input onChange={searching} className="form-control mt-2" placeholder="Search for a city"/>
          {s.state.map((st) =>(
            <div key={st.state} >
            <br style={{display: search === ""? "block": "none"}} />
            <div className="form-check" style={{display: search === ""? "block": "none"}}>
              <input className="form-check-input" type="checkbox" id={st.state} name={st.state} value={st.state} onChange={(e) => changeState(e, st.city)}/>
              <label className="form-check-label" htmlFor={st.state}><b>{st.state}</b></label>
            </div>
            {
              st.city.map((ct) =>(
                <div className="form-check mt-1 mx-2" key={ct.name} style={{display: search === "" || search.toLowerCase() === ct.name.toLowerCase().substring(0,search.length)? "block": "none"}}>
                <input className="form-check-input" type="checkbox" id={ct.name} name={ct.name} value={ct.name} onChange={(e) => newCity(e, st.state)} />
                <label className="form-check-label" htmlFor={ct.name}>{ct.name}</label>
                </div>
              ))
            }
            </div>
          ))}
            <div className='text-center mt-3'>
              <button className="submit" onClick={submit}>Submit</button>
            </div>
          </div>
          </div>
        ))
        
      }
      
    </div>
    </>
    
  );
}

export default App;
