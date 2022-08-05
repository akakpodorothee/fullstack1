import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom"
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
	name: "",
	lastname: "",
	nickname: "",
	age: "",
	contacts: "",
	wins: "",
	losses: "",
};

const AddEdit = () =>{
	const [state, setState]= useState(initialState);

	const {name, lastname, nickname, age, contacts, wins, losses} = state;

	const history = useNavigate();
	const {id} = useParams();

	useEffect(()=>{
		axios.get(`https://limitless-badlands-62670.herokuapp.com/api/get/${id}`).then((resp)=> setState({...resp.data[0]}));
	},[id]);

	const handleSubmit = (e) =>{
		e.preventDefault();
		// const nav = useNavigate()
		if (!name || !lastname || !nickname || !age || !contacts || !wins || !losses){
			toast.error("Please Provide value into each input field");
		} else {
		 if(!id){
			axios
				.post("https://limitless-badlands-62670.herokuapp.com/api/post", {
					name,
					lastname,
					nickname,
					age,
					contacts,
					wins,
					losses
			})
			.then(()=>{
				setState({name: "", lastname: "", nickname: "", age: "", contacts: "", wins: "", losses: ""});
				window.location('https://limitless-badlands-62670.herokuapp.com/')
			}).catch((err)=> toast.error(err.response.data));
			// nav(, { replace: true })
			

			toast.success("Player added successfully");
		 } else {
			axios
				.put(`https://limitless-badlands-62670.herokuapp.com/api/update/${id}`, {
					name,
					lastname,
					nickname,
					age,
					contacts,
					wins,
					losses
			})
			.then(()=>{
				setState({name: "", lastname: "", nickname: "", age: "", contacts: "", wins: "", losses: ""});
			}).catch((err)=> toast.error(err.response.data));

			toast.success("Player Updated successfully");
		 }
				
			setTimeout(()=>history.push("/"), 500);
		 } 
			
	};
	

	const handleInputChange = (e)=>{
		const {name, value} = e.target;
		setState({...state, [name]: value});
	};

	return (
		<div style={{marginTop: "100px"}}>
			<form style={{
			    margin : "auto",
				padding : "15px",
				maxWidth : "400px",
				alignContent : "center"
			}} onSubmit={handleSubmit}>

				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" placeholder="Your name" value={name || ""} onChange={handleInputChange}/>

				<label htmlFor="lastname">Lastname</label>
				<input type="lastname" id="lastname" name="lastname" placeholder="Your lastname" value={lastname || ""} onChange={handleInputChange}/>

				<label htmlFor="nickname">Nickname</label>
				<input type="nickname" id="nickname" name="nickname" placeholder="Your nickname" value={nickname || ""} onChange={handleInputChange}/>

				<label htmlFor="age">Age</label>
				<input type="number" id="age" name="age" placeholder="Your Age" value={age || ""} onChange={handleInputChange}/>

				<label htmlFor="contacts">Contacts</label>
				<input type="number" id="contacts" name="contacts" placeholder="Your contacts" value={contacts || ""} onChange={handleInputChange}/>

				<label htmlFor="wins">Wins</label>
				<input type="number" id="wins" name="wins" placeholder="Your wins scores" value={wins || ""} onChange={handleInputChange}/>


				<label htmlFor="losses">Losses</label>
				<input type="number" id="losses" name="losses" placeholder="Your losses scores" value={losses || ""} onChange={handleInputChange}/>
				{/* <Link to ="/"> */}
				<input type="submit" value={id ? "Update" : "Save"}/>
				{/* </Link> */}
				<Link to ="/">
					<input type="button" value="Go Back" style={{width: "400px"}}/>
				</Link>
			</form>
		</div>
	);
}

export default AddEdit;