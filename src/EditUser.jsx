import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setName(data.name);
        setUsername(data.username);
        setEmail(data.email);
      })
      .catch((err) => console.log(err.message));
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setValidation(true);

    const updatedUser = { name, username, email };

    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser),
    })
      .then(() => {
        alert("User Updated Successfully.");
        navigate("/users"); 
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className="row">
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handleSubmit}>
          <div className="card" style={{ textAlign: "left" }}>
            <div className="card-title">
              <h2>Edit User Form</h2>
            </div>
            <div>
              <div className="row">
                <div className="col-lg-12">
                  <div>
                    <label>Name:</label>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setValidation(true)}
                      className="form-control"
                    />
                    {!name && validation && (
                      <span className="text-danger">Enter the name</span>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div>
                    <label>User Name:</label>
                    <input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onFocus={() => setValidation(true)}
                      className="form-control"
                    />
                    {!username && validation && (
                      <span className="text-danger">Enter the User Name</span>
                    )}
                  </div>
                </div>

                <div className="col-lg-12">
                  <div>
                    <label>Email:</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>
                
                <div className="col-lg-12 mt-3">
                  <button type="submit" className="btn btn-success me-2">
                    Save
                  </button>
                  <Link to="/users" className="btn btn-danger">
                    Back
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
