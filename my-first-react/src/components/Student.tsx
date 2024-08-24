import StudentTypes from "../types/StudentTypes";
function Student(props:StudentTypes){ //child
    return (
      <><h1>{props.name}</h1>
      <p>AGE: {props.age}</p></>
    )
  
  }

  export default Student;