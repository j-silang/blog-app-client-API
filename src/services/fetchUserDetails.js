import { jwtDecode } from "jwt-decode";

export default function fetchUserDetails() {
	const token = localStorage.getItem("token");
	let decoded = null;
	if(token){
	  try{
	    decoded = jwtDecode(token);
	    console.log('Decoded token:', decoded);
	    return decoded;
	  }catch(err){
	    console.error('Invalid token:', err);
	    return null;
	  }
	}
	return null;
}