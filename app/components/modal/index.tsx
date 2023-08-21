import React from 'react';
interface IModal {
  showModal: boolean;
  onClose: () => void;
  onAccept: () => void;
  title: string;
  content: string;
}

export default function Modal({
  onAccept,
  onClose,
  showModal,
  title,
  content,
}: IModal) {
  return (
    <>
      {showModal && (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto bg-[rgba(0,0,0,0.2)]
           fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-xl font-semibold">{title}</h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => onClose()}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <p className="my-4 text-slate-500 text-lg leading-relaxed">
                    {content}
                  </p>
                </div>

                <div className="flex items-center justify-between p-4 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onClose()}
                  >
                    Close
                  </button>
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => onAccept()}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
