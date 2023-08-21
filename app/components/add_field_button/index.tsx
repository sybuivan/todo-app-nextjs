import React from 'react';
import { AiOutlinePlusCircle } from 'react-icons/ai';

interface IAddFieldButton {
  onOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  title: string;
}

const AddFieldButton = ({ onOpen, isOpen, title }: IAddFieldButton) => {
  return (
    <div
      className="flex items-center p-3 border-gray-300 border rounded-lg mb-3 gap-2 w-full hover:cursor-pointer"
      onClick={() => {
        onOpen(!isOpen);
      }}
    >
      <AiOutlinePlusCircle className="text-2xl" />
      <p>{title}</p>
    </div>
  );
};

export default AddFieldButton;
