import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getItems } from "../features/items/itemsSlice"

export default function HomePage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Go to login if jwt token is not set
    if(!sessionStorage.getItem("jwt")) {
      navigate("/auth")
    }
  }, [sessionStorage.getItem("jwt")])

  const items = useSelector((state) => state.items)

  return (
    <>
      <div className="page">HomePage</div>
    </>
    
  )
}
