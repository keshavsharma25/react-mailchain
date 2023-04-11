import { useState } from "react";

type Props = {
  onLogin: (email: string, password: string) => void;
};

export const Login = ({ onLogin }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2" htmlFor="email">
          Email
        </label>
        <input
          className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-500"
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-white font-bold mb-2" htmlFor="password">
          Password
        </label>
        <input
          className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none focus:border-blue-500"
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-[#635f07] hover:bg-[#2b2902] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Log in
        </button>
      </div>
    </form>
  );
};
