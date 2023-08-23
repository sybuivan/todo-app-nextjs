import React from 'react';

interface IBoxInfor {
  title: string;
  children: React.ReactNode;
}

const BoxInfo = ({ title, children }: IBoxInfor) => {
  return (
    <div className="bg-[#fff] p-6 border border-gray-200 rounded-lg mb-4">
      <h3 className="font-bold py-4 text-xl">{title}</h3>
      {children}
    </div>
  );
};

export default BoxInfo;
