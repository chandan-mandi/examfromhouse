import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import CommonBtn from '../CommonBtn/CommonBtn';
import { Menu, Transition } from '@headlessui/react';

const NavItems = () => {
    const { user, logOut } = useAuth();
    const [active, setActive] = useState("");
    return (
        <>
            <Link onClick={() => setActive("home")} className={active === "home" ? "text-lg hover:text-purple-800 my-2 border-b-4 border-purple-600 mx-4" : "text-lg hover:text-purple-800 my-2 mx-4"} to="/">
                Home
            </Link>
            <Link onClick={() => setActive("about")} className={active === "about" ? "text-lg hover:text-purple-800 my-2 border-b-4 border-purple-600 mx-4" : "text-lg hover:text-purple-800 my-2 mx-4"} to="/about">
                About
            </Link>
            <Link
                onClick={() => setActive("features")}
                className={active === "features" ? "text-lg hover:text-purple-800 my-2 border-b-4 border-purple-600 mx-4" : "text-lg hover:text-purple-800 my-2 mx-4"}
                to="/features"
            >
                Features
            </Link>
            <Link
                onClick={() => setActive("contact")}
                className={active === "contact" ? "text-lg hover:text-purple-800 my-2 border-b-4 border-purple-600 mx-4" : "text-lg hover:text-purple-800 my-2 mx-4"}
                to="/contact"
            >
                Contact
            </Link>
            {user.email ?
                <Menu as="div">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-10 w-10 rounded-full"
                            src={user.photoURL || 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png'}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="popover-dashboard py-4 origin-top-right absolute right-10 mt-2 w-48 rounded-md shadow-lg pt-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none flex flex-col justify-center">
                          <Menu.Item>
                              <p
                                className='block px-4 py-2 text-sm text-purple-900'
                              >
                                {user.displayName}
                              </p>
                          </Menu.Item>
                          <Menu.Item>
                              <Link
                                to="/profile"
                                className='block px-4 py-2 text-sm text-gray-700'
                              >
                                View Profile
                              </Link>
                          </Menu.Item>
                          <Menu.Item>
                              <Link
                                to="/dashboard"
                                className='block px-4 py-2 mb-4 text-sm text-gray-700'
                              >
                                Dashboard
                              </Link>
                          </Menu.Item>
                          <Menu.Item>
                              <button className="bg-red-500 hover:bg-red-700 text-white text-center py-1 px-2 w-3/4 mx-auto rounded-full" onClick={logOut}>Log out</button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                :
                <CommonBtn destination="/login" title="Login" />
            }
        </>
    );
};

export default NavItems;