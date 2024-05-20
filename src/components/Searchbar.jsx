import React, {useState} from 'react';

const Searchbar = () => {
    const [value, setValue] = useState("");
    const [userData, setUserData] = useState([]);
    const [names, setNames] = useState([]);

    const handleChange = (event) => {
        setValue(event.target.value);
    }

  return (
    <div className='w-full flex justify-center'>
        <input type='text' value={value} onChange={handleChange} className='w-[40%] mx-auto h-11 border-[1px] px-2 border-stone-500'>
        </input>
    </div>
  )
}

export default Searchbar;