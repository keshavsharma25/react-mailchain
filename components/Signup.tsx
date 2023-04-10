import axios from "axios";
import React, { useState } from "react";

type Props = {
  setMailchainAddr: React.Dispatch<React.SetStateAction<string>>;
  setIsSignup: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup = ({ setMailchainAddr, setIsSignup }: Props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: sendMail } = await axios({
      method: "POST",
      url: "/api/sendMailchainSimple",
      data: {
        to: email,
      },
    });

    if (!sendMail.savedMessageId) {
      console.log("Mail sent successfully!");
      setMailchainAddr(email);
      setIsSignup(true);
    }
  };

  return (
    <form className="max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="name" className="block mb-2 font-bold text-white">
          Name
        </label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleNameChange}
          className="w-full px-4 py-2 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 font-bold text-white">
          Mailchain Address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full px-4 py-2 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 font-bold text-white">
          Password
        </label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full px-4 py-2 leading-tight border border-gray-300 rounded appearance-none focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="px-4 py-2 font-bold text-white bg-[#635f07] rounded hover:bg-[#2b2902] focus:outline-none focus:shadow-outline"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
};
