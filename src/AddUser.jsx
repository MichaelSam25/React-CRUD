import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AddUser = () => {

    const [name, namechange] = useState("");
    const[username,usernamechange]=useState("");
    const [email, emailchange] = useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const userdata={name,username,email};
      
      fetch("https://jsonplaceholder.typicode.com/users",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(userdata)
      }).then(()=>{
        alert('User Added Successfully.')
        navigate('/users');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Add User Form</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input required value={name} onMouseDown={()=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        {name.length===0 && validation && <span className="text-danger">Enter the name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>User Name</label>
                                            <input required value={username} onMouseDown={()=>valchange(true)} onChange={e=>usernamechange(e.target.value)} className="form-control"></input>
                                        {username.length===0 && validation && <span className="text-danger">Enter the User Name</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input type="email" value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12 mt-2">
                                        <div>
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/users" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default AddUser;