import Link from "next/link";

const title = "Restaurant";

const Header = () => {
  return (
    <div className="sticky top-0 flex justify-between z-50 bg-pink-50 shadow-lg sm:bg-blue-50 md:bg-yellow-50">
      <h1 className="py-4 pl-32 font-extrabold text-3xl">{title}</h1>
      <div className="nav-item">
        <ul className="flex py-5 pr-32 text-xl">
          <li className="px-2 ">
            <Link href="/home">Home</Link>
          </li>
          <li className="px-2 ">
            <Link href="/profile">Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
