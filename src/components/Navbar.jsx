import React from 'react';
import { Link } from 'react-router-dom';
import { Disclosure, Menu } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Login', href: 'login', current: false },
  { name: 'Signup', href: 'createuser', current: false },
  // { name: 'Calendar', href: '', current: false },
];

const classNames = (...classes) => classes.filter(Boolean).join(' ');

const Navbar = () => {
  return (
    <Disclosure as="nav" className="bg-gray-800 sticky top-0 z-100" >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white">
                  {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* <img
                  alt="Logo"
                  src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                  className="h-8 w-auto"
                /> */}
                <span className='text-slate-50 text-2xl italic'>myiFood </span>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white">
                  <BellIcon className="size-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <Menu.Button className="rounded-full bg-gray-800 text-sm">
                    <img
                      alt="User"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="size-8 rounded-full"
                    />
                  </Menu.Button>
                  <Menu.Items className="absolute right-0 mt-2 w-48 bg-white shadow-lg">
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="/profile" className={classNames(active && 'bg-gray-100', 'block px-4 py-2 text-sm text-gray-700')}>Your Profile</Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="settings" className={classNames(active && 'bg-gray-100', 'block px-4 py-2 text-sm text-gray-700')}>Settings</Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link to="singnout" className={classNames(active && 'bg-gray-100', 'block px-4 py-2 text-sm text-gray-700')}>Sign out</Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  to={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
