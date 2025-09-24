import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserList = () => {
  const [userdata, setUserdata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("all"); // default all

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Sorting state
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const navigate = useNavigate();

  const LoadEdit = (id) => {
    navigate("/users/" + id);
  };

  const DeleteUser = (id) => {
    fetch("https://jsonplaceholder.typicode.com/users/" + id, {
      method: "DELETE",
    })
      .then(() => {
        alert("User Deleted Successfully.");
        setUserdata(userdata.filter((u) => u.id !== id));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((res) => {
        setUserdata(res);
        setFilteredData(res);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  // Filter + Search
  useEffect(() => {
    let data = [...userdata];

    if (search.trim() !== "") {
      data = data.filter((item) => {
        const searchValue = search.toLowerCase();
        if (filterBy === "all") {
          return (
            item.id.toString().includes(searchValue) ||
            item.name.toLowerCase().includes(searchValue) ||
            item.username.toLowerCase().includes(searchValue) ||
            item.email.toLowerCase().includes(searchValue)
          );
        } else {
          return item[filterBy]
            .toString()
            .toLowerCase()
            .includes(searchValue);
        }
      });
    }

    // Sorting
    if (sortConfig.key) {
      data.sort((a, b) => {
        const valA = a[sortConfig.key].toString().toLowerCase();
        const valB = b[sortConfig.key].toString().toLowerCase();
        if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
        if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    setFilteredData(data);
    setCurrentPage(1);
  }, [search, filterBy, sortConfig, userdata]);

  // Pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-title d-flex justify-content-between align-items-center">
          <h2>User Details</h2>
          <Link to="/users/add" className="btn btn-success">
            Add New User
          </Link>
        </div>

        <div className="card-body">
          {/* Filter + Search */}
          <div className="d-flex mb-3 gap-2">
            <select
              className="form-select w-auto"
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value)}
            >
              <option value="all">All</option>
              <option value="name">Name</option>
              <option value="username">User Name</option>
              <option value="email">Email</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="form-control"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="form-select w-auto"
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
          </div>

          {/* Table */}
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
                <tr>
                    <th>ID</th>
                    <th
                    onClick={() => handleSort("name")}
                    style={{ cursor: "pointer" }}
                    >
                    Name{" "}
                    {sortConfig.key === "name" ? (
                        sortConfig.direction === "asc" ? (
                        <span>▲</span>
                        ) : (
                        <span>▼</span>
                        )
                    ) : (
                        <span style={{ color: "#bbb" }}>⇅</span>
                    )}
                    </th>
                    <th
                    onClick={() => handleSort("username")}
                    style={{ cursor: "pointer" }}
                    >
                    User Name{" "}
                    {sortConfig.key === "username" ? (
                        sortConfig.direction === "asc" ? (
                        <span>▲</span>
                        ) : (
                        <span>▼</span>
                        )
                    ) : (
                        <span style={{ color: "#bbb" }}>⇅</span>
                    )}
                    </th>
                    <th
                    onClick={() => handleSort("email")}
                    style={{ cursor: "pointer" }}
                    >
                    Email{" "}
                    {sortConfig.key === "email" ? (
                        sortConfig.direction === "asc" ? (
                        <span>▲</span>
                        ) : (
                        <span>▼</span>
                        )
                    ) : (
                        <span style={{ color: "#bbb" }}>⇅</span>
                    )}
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {currentRows.length > 0 ? (
                currentRows.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>
                      <button
                        onClick={() => LoadEdit(item.id)}
                        className="btn btn-success me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => DeleteUser(item.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="d-flex justify-content-between align-items-center">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="btn-group">
              <button
                className="btn btn-outline-primary"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              <button
                className="btn btn-outline-primary"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserList;
