"use client";

import { useEffect } from "react";

const page = () => {
  useEffect(() => {
    window.location.href =
      "https://drive.google.com/file/d/13HI_HZSvNAj5nPoDDTX3GOdN4K3V2uv4/view?usp=drive_link";
  }, []);
  return (
    <div className="md:p-24 max-md:mt-20 text-4xl text-center">
      Redirecting to Resume...
    </div>
  );
};

export default page;
