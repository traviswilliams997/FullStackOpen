import Forminput from "./Forminput"

const Personform = ({onSubmit, newName, newNumber, handleNumberChange, handleNameChange }) => {
  
    return (
        <form onSubmit={onSubmit}>
          <Forminput value={newName.trim()} onChange={handleNameChange} text='Name:'/>
          <Forminput value={newNumber.trim()} onChange={handleNumberChange} text='Number:'/>
          <button type="submit">add</button>
      </form>
    )
  }    
  export default Personform