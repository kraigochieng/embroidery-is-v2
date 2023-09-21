import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export default function HomePage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Go to login if jwt token is not set
    if(!sessionStorage.getItem("jwt")) {
      navigate("/auth")
    }
  }, [sessionStorage.getItem("jwt")])

  return (
    <div>HomePage</div>
  )
}
