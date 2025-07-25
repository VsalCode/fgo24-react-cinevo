import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";
import { SlOptions } from "react-icons/sl";
import { BsBookmarkStarFill } from "react-icons/bs";
import { Outlet } from "react-router-dom";
import React from "react";

const LayoutProfile = () => {
  const [currentUser, setCurrentUser] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.user)

  React.useEffect(() => {
        setIsLoading(true);

        if (!token) {
          throw new Error("User not authenticated");
        }
        setCurrentUser(user);
        setIsLoading(false);
  }, [token, user]);

  if (isLoading) {
    return (
      <main className="h-screen bg-primary flex justify-center items-center">
        <p>Loading user data...</p>
      </main>
    );
  }

  if (!currentUser) {
    return (
      <main className="h-screen bg-primary flex justify-center items-center">
        <p>User not found</p>
      </main>
    );
  }

  return (
    <main className="bg-primary h-fit text-white">
      <Toaster />
      <Navbar />
      <section className="flex lg:flex-row lg:justify-center flex-col sm:px-15 px-5 gap-5 py-30">
        <aside className="bg-secondary h-fit md:min-w-[25vw] rounded-4xl px-6 py-10 flex flex-col gap-7">
          <div className="flex justify-between items-center">
            <p className="font-semibold">INFO</p>
            <SlOptions className="text-white text-2xl" />
          </div>
          <div className="flex-center flex-col">
            <div className="bg-[#EAEFEF] size-40 text-5xl text-primary flex items-center justify-center rounded-full font-bold">
              {currentUser.fullname ? currentUser.fullname.split("").slice(0, 2).join("").toUpperCase() : currentUser.email?.split("@")[0].split("").slice(0, 2).join("").toUpperCase() || "NA"}
            </div>
            <p className="pt-7 pb-3 text-3xl font-semibold">{currentUser?.fullname ? currentUser?.fullname : currentUser.email?.split("@")[0]}</p>
            <p className="text-xl text-third italic">Moviegoers</p>
          </div>
          <div>
            <p className="pb-5 font-medium text-lg">Loyalty Points</p>
            <div className="bg-gradient-to-r from-teal-900 to-emerald-600 text-[#f8ba28] flex flex-col gap-7 p-3 rounded-3xl font-semibold">
              <div className="flex-between">
                <p className="text-lg">Moviegoers</p>
                <BsBookmarkStarFill className="text-4xl" />
              </div>
              <p className="text-2xl font-extrabold">320 Points</p>
            </div>
          </div>
        </aside>
        <aside className="h-fit lg:w-[50vw] w-full flex flex-col gap-7">
          <Outlet />
        </aside>
      </section>
    </main>
  );
};

export default LayoutProfile;
