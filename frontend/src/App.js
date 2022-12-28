import { useEffect, useState } from "react";

import axios from "axios";

const App = () => {
    const [users, setUsers] = useState([]);

    useEffect( () => {
        axios.get('/api/users').then(value => {
            setUsers(value.data.data);
        });
    }, []);

    return(
        <div>
            <h1>Users:</h1>
            {users.map(value => <div key={value._id}>{value.name}</div>)}
        </div>
    )
}

export {App};