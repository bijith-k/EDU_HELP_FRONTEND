import React from 'react'

const HeadTitle = ({ title }) => {
  return (
    <div className="bg-[#232946]">
      <h1 className="font-bold text-white text-center text-lg uppercase h-12 p-2">
        {title}
      </h1>
    </div>
  );
};

export default HeadTitle;