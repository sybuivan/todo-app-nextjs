import React from 'react';

interface IBoxInfor {
  title: string;
  children: React.ReactNode;
  name: string;
}

const BoxInfo = ({ title, children, name }: IBoxInfor) => {
  return (
    <div className="bg-[#fff] p-6 border border-gray-200 rounded-lg mb-4">
      <h3 className="font-bold py-4 text-xl">{title}</h3>
      {children}

      <div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          {name}
        </button>
      </div>
    </div>
  );
};

export default BoxInfo;
