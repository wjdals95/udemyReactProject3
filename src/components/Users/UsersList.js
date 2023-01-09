import React from 'react';
import classes from './UserList.module.css'

const UsersList = (props) => {
    return (
        <ul>
            {props.users.map((user) =>(
                <li>
                    
                </li>
            ))} 
        </ul>
    );  
}

export default UsersList;