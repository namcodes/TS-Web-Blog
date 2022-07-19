import {useState } from "react";

function Header() {
  const [Mobile, setIsMobile] = useState("hidden");
  const [Icon, setIcon] = useState(false);

  const navBar = () => {
    setIsMobile((current)=> current === "hidden" ? "block" : "hidden");
    if (Icon) {
      setIcon(false);
    } else {
      setIcon(true);
    }
  };

  return (
    <nav className="fixed top-0 bg-gray-900 z-10 shadow-xl w-full flex flex-wrap items-center justify-between px-2 py-3">
    <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <a
          className="text-white text-2xl font-semibold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
          href="/"
        >
          Code Nam
        </a>
        <button
          onClick={navBar}
          className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
          type="button"
        >
          {Icon ? (
            <i className="text-white fa fa-close"></i>
          ) : (
            <i className="text-white fa fa-bars"></i>
          )}
        </button>
      </div>

      <div
        className={`lg:flex flex-grow items-center lg:bg-transparent lg:shadow-none ${Mobile}`} 
        id="example-navbar-warning"
      >
        <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li className="flex items-center">
            <a
              className="lg:text-white lg:hover:text-slate-200 text-slate-50 px-3 py-4 lg:py-2 flex items-center text-sm uppercase font-normal"
              href="https://www.facebook.com/sharer.php?u="
            >
              <i className="lg:text-slate-200 text-slate-400 fa fa-facebook text-lg leading-lg"></i>
              <span className="lg:hidden inline-block ml-2">Share</span>
            </a>
          </li>

          <li className="flex items-center">
            <a
              className="lg:text-white lg:hover:text-slate-200 text-slate-50 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-normal"
              href="https://www.github.com/namcodes"
            >
              <i className="lg:text-slate-200 text-slate-400 fa fa-github text-lg leading-lg"></i>
              <span className="lg:hidden inline-block ml-2">
                Github
                </span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Header