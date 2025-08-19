import { useNavigate } from "react-router-dom";

const users = [
    {id:1, email: "admin@test.com", password: "123456", name: "Admin"}
]

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const fakelogin =async (email,password) =>{

    const navigate = useNavigate()
    await delay(1000);

    const user = users.find(u =>u.email === email && u.password === password)
    if(!user){
        return{success: false, status :404};
    }

    navigate("/")
}

export const fakeLogout = async () => {
  await delay(500); // Simulate network delay
  return { success: true };
};