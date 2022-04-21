import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, []);

  const handleAddUser = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = { name, email };

    //post data to server
    fetch('http://localhost:5000/user', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
  }
  return (
    <div className="App">
      <h2>My own data: {users.length}</h2>

      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" />
        <input type="email" name="email" placeholder="Email" />
        <input type="submit" value="Submit" />
      </form>

      {
        users.map(user => <ul key={user.id}>
          <li>{user.name}</li>
          <li>{user.email}</li>
        </ul>)
      }
    </div>
  );
}

export default App;
