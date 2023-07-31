import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
export default function HomePage() {
  const navigate = useNavigate()
  useEffect(() => {
    // Go to login if jwt token is not set
    if(!localStorage.getItem("jwt")) {
      navigate("/auth")
    }
  })
  return (
    <>
      <div className="page">HomePage</div>
    </>
    
  )
}
