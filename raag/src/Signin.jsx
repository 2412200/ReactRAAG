import { useState } from "react";

export default function SignIn() {
  const [number, setnumber] = useState("");
  const [password, setpassword] = useState("");
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <section id="left-section" className="hidden md:block md:w-1/3 h-screen overflow-hidden">
      <img src="/westindian.png"
      alt="signinImage" className="w-full h-full object-cover"></img>
      </section>
      <section id="right-section" className="flex items-center justify-center min-h-screen w-full md:w-2/3 bg-gray-200">
      <div className="flex flex-col justify-center items-center gap-6 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-red-600">RAAG</h1>
        <form className=" text-gray-900 py-4 flex flex-col bg-white rounded w-1/2 max-w-md px-4 space-y-3">
        <strong>Login to your account</strong>
          <input type="tel" 
          placeholder="Phone Number" 
          className="border w-full my-4 text-gray-900 placeholder:text-gray-500"
          value = {number}
          onChange = {(e) => setnumber(e.target.value)}
          /><br/>
          <input type="password"
          placeholder="Password" 
          className="border w-full text-gray-900 placeholder:text-gray-500"
          value = {password}
          onChange = {(e) => setpassword(e.target.value)}/><br/>
          <button className="border block mx-auto w-fit px-8 py bg-red-600 cursor-pointer hover:bg-red-700"
          type = "submit"
          onSubmit = {() => console.log(number, password)}><b>Log In</b></button>
          <p className="space-y-30">Forgot Password?</p>
        </form>
        <p className="text-gray-900 underline">Create your account</p>
        </div>
      </section>
    </div>
  );
}
