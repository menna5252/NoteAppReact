import { Button, CloseIcon } from "@heroui/react";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RiFilePaper2Fill } from "react-icons/ri";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const links = [
  { to: "/login", label: "Login" },
  { to: "/register", label: "Register" },
];
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { token,setToken } = useAuth();
  const navigate = useNavigate();
  function handleLogout(){
    localStorage.removeItem('userToken');
    setToken(null);
    navigate('/login');

  }
  console.log(token);
  return (
    <>
      <nav className="px-12 py-5 flex justify-between items-center border-b border-zinc-200 shadow bg-white">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-900 flex gap-4 items-center"
        >
          <RiFilePaper2Fill />
          Note App
        </Link>

        <ul className="hidden md:flex gap-4">
          {!token ? links.map((link) => (
            <li key={link.to} className="font-bold text-blue-900 ">
              <NavLink to={link.to}>{link.label}</NavLink>
            </li>
          )):<li>
             <Button size="lg"  variant="danger" onClick={handleLogout}>
        logout
      </Button>
          </li>}
        </ul>

        <Button
          onClick={() => setOpen(!open)}
          isIconOnly
          aria-label="More options"
          variant="tertiary"
          className={"md:hidden text-2xl text-blue-900"}
        >
          {open ? <CloseIcon /> : <FaBars />}
        </Button>
      </nav>
      <ul
        className={`${open ? "flex" : "hidden"} flex-col md:hidden gap-4 bg-white py-7 px-4`}
      >
        {!token ?links.map((link) => (
          <li key={link.to} className="font-bold text-blue-900 ">
            <NavLink className={"block w-full"} to={link.to}>
              {link.label}
            </NavLink>
          </li>
        )):<li>
             <Button  variant="danger" onClick={handleLogout}>
        logout
      </Button>
          </li>}
      </ul>
    </>
  );
}
