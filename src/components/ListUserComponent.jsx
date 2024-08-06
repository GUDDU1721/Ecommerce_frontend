import React from 'react'

import {useEffect, useState} from "react"

import {useNavigate} from "react-router-dom"
import { deleteUser, listUser } from '../services/EcommerceServices'
const ListUserComponent = () => {

    const [user,setuser]=useState([])

    const navigator=useNavigate();

    useEffect(()=>{
        getAllUsers();
    },[])

    function getAllUsers(){
        listUser().then((response)=>{
            setuser(response.data);
        }).catch(error=>{
            console.error(error);
        })
    }

    function addNewUser(){
        navigator('/registration')
    }

    function updateUser(id){
        navigator(`/edit-user/${id}`)
    }

    function removeUser(id){
        console.log(id);

        deleteUser(id).then(()=>{
            getAllUsers();
        }).catch(error=>{
            console.error(error);
        })
    }
  return (
    <div className="container">
    <h2 className="text-center">List of Users</h2>
    <button className="btn btn-primary mb-2" onClick={addNewUser}>Add User</button>
    <table className="table table-stripped table-bordered">
    <thead>
        <tr>
            <th>User Id</th>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        {
            user.map(user=>
            <tr key={user.id}>
            <td>{user.id}</td> 
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.password}</td>
            <td>
                <button className="btn btn-info" onClick={()=>updateUser(user.id)}>Update</button>
                <button className="btn btn-danger" onClick={()=>removeUser(user.id)}
                   style={{marginLeft:"10px"}}
                >Delete</button>
            </td>
            </tr>)
        }
    </tbody>
    </table>
      
    </div>
  )
}


export default ListUserComponent
