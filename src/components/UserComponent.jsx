import React from 'react'
import { useEffect, useState } from "react"
import { useNavigate,useParams} from "react-router-dom";
import { createUser, getUser, updateUser } from '../services/EcommerceServices';

const UserComponent = () => {
    const [userName,setUserName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const {id}=useParams();
    const [errors,setErrors]=useState({
        userName: ' ',
        email:'',
        password:''
    });

    const navigator=useNavigate();

    useEffect(()=>{

        if(id){
            getUser(id).then((response)=>{
                setUserName(response.data.userName);
                setEmail(response.data.email);
                setPassword(response.data.password);
            }).catch(error=>{
                console.error(error);
            })
        }

    },[id])

    function saveOrUpdateUser(e){
        e.preventDefault();

        if(validateForm()){

            const user ={userName,email,password};
            console.log(user);

            if(id){
                updateUser(id,user).then((response)=>{
                    console.log(response.data);
                    navigator('/users');
                }).catch(error=>{
                    console.error(error);
                })
            }else{
                createUser(user).then((Response)=>{
                    console.log(Response.data);
                     navigator("/users")
                 }).catch(error=>{
                    console.error(error);
                 })
            }
        }
    }

    function validateForm(){
        let valid=true;
        const errorsCopy={...errors}
        
        if(userName.trim()){
            errorsCopy.userName='';
        }else{
            errorsCopy.userName="user name is required";
            valid=false;
        }

        if(email.trim()){
            errorsCopy.email='';
        }else{
            errorsCopy.email="Email is required";
        }

        if(password.trim()){
            errorsCopy.password='';
        }else{
            errorsCopy.password="Password is required";
        }

        setErrors(errorsCopy);

        return valid;
    }


    function pageTitle(){
        if(id){
            return <h2 className="text-center">Update User</h2>
        }else{
            return <h2 className="text-center">Add User</h2>
        }
    }
  return (
    <div className="container">
    <br></br>
      <div className="row">
      <div className="card col-md-6 offset-md-3 offset-md-3">
      {
        pageTitle()
      }
       <div className="card-body">
        <form>
            <div className="form-group mb-2">
                <label className="form-label">userName</label>
                <input
                type="text"
                placeholder="Enter User Name"
                name="userName"
                value={userName}
                className={`form-control ${errors.firstName ?'is-invalid':''}`}
                onChange={(e)=>setUserName(e.target.value)}
                >
                </input> 
                {errors.userName && <div className="invalid-feedback">{errors.userName}</div>}   
            </div>
            
            <div className="form-group mb-2">
                <label className="form-label">Email</label>
                <input
                type="text"
                placeholder="Enter Email"
                name="email"
                value={email}
                className={`form-control ${errors.email ?'is-invalid':''}`}
                onChange={(e)=>setEmail(e.target.value)}
                >
                </input>    
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}   
            </div>
            <div className="form-group mb-2">
                <label className="form-label">Password</label>
                <input
                type="password"
                placeholder="Enter Password"
                name="password"
                value={password}
                className={`form-control ${errors.password ?'is-invalid':''}`}
                onChange={(e)=>setPassword(e.target.value)}
                >
                </input>    
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}   
            </div>
            <button className="btn btn-success" onClick={saveOrUpdateUser}>Submit</button>
        </form>
       </div>
      </div>

      </div>
    </div>
  )
}

export default UserComponent
