import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <Disclosure as="nav" className="bg-primary">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-white text-xl font-bold">
                  QR Menu SaaS
                </Link>
              </div>
              <div className="hidden md:flex space-x-4 items-center">
                <Link to="/" className="text-white hover:text-gray-300">
                  Home
                </Link>
                <Link to="/login" className="text-white hover:text-gray-300">
                  Login
                </Link>
              </div>
              <div className="flex md:hidden">
                <Disclosure.Button className="text-white hover:text-gray-300">
                  {open ? (
                    <XMarkIcon className="h-6 w-6" />
                  ) : (
                    <Bars3Icon className="h-6 w-6" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="md:hidden bg-primary">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <Link to="/" className="text-white block">
                Home
              </Link>
              <Link to="/login" className="text-white block">
                Login
              </Link>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
