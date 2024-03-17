import React from "react";
import { BackgroundBeams } from "./BackgroundBeams";
import "../components/styles/home.css";
import { EvervaultCard, Icon } from "./EvervaultCard";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <BackgroundBeams />
      <div className="home">
        {/* <h1>Home Page</h1>
        <p>Welcome to the home page!</p> */}
        <div className="border dark:border-white/[0.2] flex flex-col items-start p-4 relative h-[35rem]">
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          <EvervaultCard text="lentil-jsx" />

          <h2 className="dark:text-white m-6 text-lg font-medium text-center">
            Embark on a creative journey with Lentil JSX! Whether you're
            brainstorming ideas for React components, practicing data structures
            using TypeScript, or crafting dynamic Markdown notebooks, Lentil JSX
            is your go-to tool. With endless opportunities for experimentation
            and brainstorming, unleash your creativity without limits!
          </h2>

          <div className="buttons pb-6">
            <div className="buttons pb-6">
              <Link to="/documentation">
                {" "}
                {/* Use Link instead of button */}
                <button className="px-8 py-2 border text-black dark:border-white relative group transition duration-100">
                  <div className="absolute -bottom-2 -right-2 bg-sky-400 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                  <span className="relative">Documentation ✍🏻</span>
                </button>
              </Link>

              <Link to="/editor">
                {" "}
                {/* Use Link instead of button */}
                <button className="px-8 py-2 border text-black dark:border-white relative group transition duration-100">
                  <div className="absolute -bottom-2 -right-2 bg-sky-400 h-full w-full -z-10 group-hover:bottom-0 group-hover:right-0 transition-all duration-200" />
                  <span className="relative">Notebook 🥳</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
