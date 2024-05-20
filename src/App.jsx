import { results } from './userData.json';
import { MdOutlineMailOutline } from "react-icons/md";
import { GoLocation } from "react-icons/go";
import { FiPhoneCall } from "react-icons/fi";
import { useState } from 'react';
import './App.css';

const perPageUsers = 8;

function App() {
  const [users, setUsers] = useState(results);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handleChange = (event) => {
    const inputValue = event.target.value.toLowerCase();
    setSearchValue(inputValue);
    filterUsers(inputValue, selectedCountry);
    setCurrentPage(1);
  };

  const changeCountry = (event) => {
    const countryValue = event.target.value;
    setSelectedCountry(countryValue);
    filterUsers(searchValue, countryValue);
    setCurrentPage(1);
  };

  const filterUsers = (searchValue, selectedCountry) => {
    const filteredUsers = results.filter((user) =>
      (user.name.first.toLowerCase().includes(searchValue) || user.name.last.toLowerCase().includes(searchValue)) &&
      (selectedCountry === "" || user.nat.includes(selectedCountry))
    );

    setUsers(filteredUsers);
  };

  const countries = [...new Set(results.map(user => user.nat))];

  const indexOfLastUser = currentPage * perPageUsers;
  const indexOfFirstUser = indexOfLastUser - perPageUsers;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(users.length / perPageUsers);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div className='directory'>
      <h1 className="text-center text-2xl font-bold text-white p-9">User Directory</h1>

      <div className="min-w-full min-h-screen p-5">
        <div className='w-full flex justify-center'>
          <input type='text' value={searchValue} onChange={handleChange} placeholder='Search users..' className='md:w-[40%] mx-auto h-9 md:h-11 border-[1px] px-2 md:px-5 border-stone-500 rounded-md outline-none' />
        </div>

        <div className='w-full flex justify-center mt-5'>
          <select onChange={changeCountry} className='md:w-[10%] mx-auto h-9 md:h-11 border-[1px] px-2 border-stone-500 rounded-md outline-none'>
            <option value="">Country</option>
            {countries.map((nat, index) => (
              <option key={index} value={nat}>{nat}</option>
            ))}
          </select>
        </div>

        <div className="w-full text-xl flex flex-col flex-wrap pt-9 items-center gap-3">
          <h3 className='text-stone-800 text-base md:text-lg md:text-white'>Total results found: {users.length}</h3>
          {currentUsers.map((user) => (
            <div key={user.email} className="w-[96%] md:w-[50%] mx-auto py-1 md:py-4 px-1 md:px-6 border-2 bg-white border-stone-300 rounded-xl flex shadow-sm hover:shadow-xl transition-all gap-x-4 items-center md:gap-x-9">
              <img src={user.picture.large} className="hidden md:block rounded-full" alt={user.name.first} />
              <img src={user.picture.medium} className="block md:hidden rounded-full" alt={user.name.first} />
              <div className="flex flex-col text-sm md:text-lg">
                <span className="text-base md:text-xl font-semibold">{user.name.title} {user.name.first} {user.name.last}</span>
                <span className="flex items-center gap-x-2"><MdOutlineMailOutline /> {user.email}</span>
                <span className="flex items-center gap-x-2"><FiPhoneCall /> {user.phone}</span>
                <span className="flex items-center gap-x-2"><GoLocation /> {user.location.city}, {user.location.state}, {user.location.country}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-10 md:mt-28">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 mx-1 border rounded-full ${currentPage === index + 1 ? 'bg-stone-800 text-white' : 'bg-gray-200'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
