import React,{useState} from 'react'

const DataTable = () => {
 const [formData,setFormData] = useState({name:"",department:"",semester:""})
 const [data,setData] = useState([]);

 const handleInputChange = (e) =>{
  setFormData({ ...formData,[e.target.name]: e.target.value })
 };

 const handleAddClick = () =>{
  if(formData.name && formData.department && formData.semester){
    const newItem = {
      id:Date.now(),
      name:formData.name,
      department:formData.department,
      semester:formData.semester,
    }
    setData([...data,newItem]);
    setFormData({name:"",department:"",semester:""})
  }
 };

const handleDelete= (id) =>{
  const updatedList = data.filter((item) => item.id !== id  )
  setData(updatedList)
}

  return (
    <>
    <div className="container">
     <div className="add-container"> 
        <div className="info-container">
    <input
    name="name"
    type="text"
    placeholder='Name'
    value={formData.name}
    onChange={handleInputChange}
    />
      <input
    name="department"
    type="text"
    placeholder="Department"
    value={formData.department}
    onChange={handleInputChange}
    />
      <input
    name="semester"
    type="text"
    placeholder="Semester"
    value={formData.semester}
    onChange={handleInputChange}
    />
      </div>
      <button className="add" onClick={handleAddClick}>ADD</button>
    </div>

      <div className="search-table-container">
      <input
      className="search-input"
    type="text"
    placeholder="Search by name"
    value={""}
    onChange={()=>{}}
    />
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
          {
            data.map((item) =>(
              <tr key={item.id}>
            <td key={item.id}>{item.name}</td>
            <td key={item.id}>{item.department}</td>
            <td key={item.id}>{item.semester}</td>
            <td className="actions">
              <button className="edit">Edit</button>
              <button className="delete" 
              onClick={() => handleDelete(item.id)}
              >Delete</button>
              </td> 
          </tr>
            ))
          }
          {/* <tr>
            <td>santosh kumar singha</td>
            <td>CSIT</td>
            <td>7</td>
            <td className="actions">
              <button className="edit">Edit</button>
              <button className="delete">Delete</button>
              </td> 
          </tr> */}
        </tbody>
    </table>
    <div className="pagination"></div>
      </div>

    </div>
    
    </>
   
  )
}

export default DataTable;