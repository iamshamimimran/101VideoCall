import React, {useState, useCallback} from "react";

import {useNavigate} from 'react-router-dom'

const HomePage = () =>{
    const [value, setvalue]= useState();
    const navigate = useNavigate()
    const handleJoinRoom = useCallback( ()=>{
        navigate (`/room/${value}`)
    }, [navigate, value]);

return <div>
    <input value={value} onChange={(e)=>setvalue(e.target.value)} type="text" placeholder="Enter Room Code"/>
    <button onClick={handleJoinRoom}>Join</button>
</div>
};

export default HomePage;