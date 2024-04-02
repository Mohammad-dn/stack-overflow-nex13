import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 bg-light-900 p-6  shadow-light-400 dark:bg-dark-200 dark:shadow-none sm:px-12 ">
      <Link href="/" className="flex items-center ">
        <Image
          src={"/assets/images/site-logo.svg"}
          width={23}
          height={23}
          alt="devFlow"
        />
        <p className="h2-bold text-dark-100 dark:text-light-900">
          Dev <span className="text-primary-500">overFlow</span>
        </p>
      </Link>
      global search
      {/*  }} */}
      <div className="flex-between flex dark:text-light-400 ">
        theme
        <SignedIn>
          <div>You are signed in</div>
          <UserButton
            signInUrl="/"
            appearance={{
              elements: { avatarBox: "h-10 w-10" },
              variables: {
                colorPrimary: "#ff7000 ",
              },
            }}
          />
        </SignedIn>
      </div>
    </nav>
  );
};
export default NavBar;
