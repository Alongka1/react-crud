import { useState } from 'react';
import axios from 'axios';

function App() {

  const [first_name, setFirstname] = useState("");
  const [last_name, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [ip_address, setIpAddress] = useState("");
  const [newfirstname, setNewFirstname] = useState("");


  const [usersList, setUsersList] = useState([]);

  const getUsers = () => {
    axios.get(`http://localhost:3001/users`).then((response) => {
      setUsersList(response.data);
    });
  };

  const addUser = () => {
    axios.post(`http://localhost:3001/create`, {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,
      ip_address: ip_address
    }).then(() => {
      setUsersList([
        ...usersList,
        {
          first_name: first_name,
          last_name: last_name,
          gender: gender,
          email: email,
          ip_address: ip_address
        }
      ]);
    });
  };

  const updateUser = (id) => {
    axios.put(`http://localhost:3001/update`, {
      first_name: newfirstname,
      id: id
    }).then((response) => {
      setUsersList(
        usersList.map((val) => {
          return val.id === id ? {
            id: val.id,
            first_name: newfirstname,
            last_name: val.last_name,
            email: val.email,
            gender: val.gender,
            ip_address: val.ip_address
          } : val;
        })
      );
    });
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setUsersList(
        usersList.filter((val) => {
          return val.id !== id;
        })
      );
    });
  }

    console.log(usersList);

    return (
      <div className="App container">
        <h1>USERS INFORMATION</h1>
        <div className="information">
          <form action="">
            <div className="mb-3">
              <label htmlFor="firstname" className="form-label">Firstname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Firstname"
                onChange={(event) => {
                  setFirstname(event.target.value);
                }} />
            </div>
            <div className="mb-3">
              <label htmlFor="lastname" className="form-label">Lastname:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Lastname"
                onChange={(event) => {
                  setLastname(event.target.value);
                }} />
            </div>
            <div className="mb-3">
              <label htmlFor="gender" className="form-label">Gender:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Gender"
                onChange={(event) => {
                  setGender(event.target.value);
                }} />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Email"
                onChange={(event) => {
                  setEmail(event.target.value);
                }} />
            </div>

            <div className="mb-3">
              <label htmlFor="ipaddress" className="form-label">IP Address:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter IP Address"
                onChange={(event) => {
                  setIpAddress(event.target.value);
                }} />
            </div>
            <button onClick={addUser} className="btn btn-success">Add User</button>
          </form>
        </div>
        <hr />
        <div className="users">
          <button onClick={getUsers} className="btn btn-primary">Show users</button>
          <br /><br />
          {usersList.map((val, key) => {
            return (
              <div className='users card' key={key}>
                <div className='card-body text-left'>
                  <p className='card-text'>Firstname: {val.first_name}</p>
                  <p className='card-text'>Lastname: {val.last_name}</p>
                  <p className='card-text'>Gender: {val.gender}</p>
                  <p className='card-text'>Email: {val.email}</p>
                  <p className='card-text'>IP Address: {val.ip_address}</p>
                  <div className='d-flex'>
                    <input
                      type='text'
                      placeholder=''
                      className='form-control'
                      onChange={(event) => {
                        setNewFirstname(event.target.value);
                      }} />
                    <button onClick={() => updateUser(val.id)} className='btn btn-warning'>Update</button>
                    <button onClick={() => deleteUser(val.id)} className='btn btn-danger'>Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  export default App;
