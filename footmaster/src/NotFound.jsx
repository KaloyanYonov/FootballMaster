import { useNavigate } from "react-router-dom";

export function NotFound() {
  const navigate = useNavigate();

  function navigation(){
    navigate('/')
  }

  return (
    <>
      <h1>Oops! Looks like you've entered a non-existed URL.</h1>
      <button onClick={navigation}>Go to the home page</button>
    </>
  );
}
