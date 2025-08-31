import { useNavigate } from "react-router-dom";



export function ReturnToMain(){

    const navigate = useNavigate()

    function navigation(){
        navigate('/')
    }

    {/*this will be done with a font awesome back arrow icon but I need to install packages, will be done lates*/}

    return(
        <>
            <button className="" onClick={navigation}>Return</button>
        </>
    )

}