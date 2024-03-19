import axios from "axios";


interface ApiResponse {
    success: boolean;
    error?: string | undefined;
}

const API_URL = "http://localhost:3000/groups";

const getGroups = async () => {
    try {
        const reponse = await axios.get(API_URL)
        return reponse.data;
    } catch (error) {
        console.log('error: ', error)
    }
}



const groupService = {
    getGroups,
  };
  
  export default groupService;