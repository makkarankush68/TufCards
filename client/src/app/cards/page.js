import FlipCard from "@/components/FlipCard";
import { AppProvider } from "@/context/AppContext";

const Page = ({ imageUrl, name, description }) => {
  return (
    <AppProvider>
      <div className="max-h-screen h-fit min-h-[80vh] w-screen flex flex-col justify-between">
        <div className="font-bold text-center w-full text-3xl p-2">Card #1</div>
        <div className="mx-auto my-auto md:w-[80vw] w-[100vw] h-fit max-h-[90vh]">
          <FlipCard />
        </div>
        <div className="grid grid-cols-2 ">
          <button className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Prev
          </button>
          <button className="m-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Next
          </button>
        </div>
      </div>
    </AppProvider>
  );
};

export default Page;
