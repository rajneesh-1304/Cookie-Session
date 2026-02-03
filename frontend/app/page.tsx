'use client'
import Image from "next/image";
import { useAppDispatch } from "./redux/hooks";
import { useEffect } from "react";
import { fetchUsersThunk } from "./redux/features/users/userSlice";

export default function Home() {
  const dispatch=useAppDispatch();
  const fetch = async ()=>{
    await dispatch(fetchUsersThunk());
  }
  useEffect(()=>{
    fetch();
  },[])
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      
    </div>
  );
}
