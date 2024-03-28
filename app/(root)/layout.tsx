import NavBar from "@/components/shared/NavBar/NavBar";
import React from "react";
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-dark-100">
      <NavBar />
      <div className="flex">
        leftSide bar
        <section className="mx-md:pb-14 flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 sm:px-14">
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </section>
        Right sidebar
      </div>
      Toaster
    </main>
  );
};

export default Layout;
