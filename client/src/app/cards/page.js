import FlipCard from "@/components/FlipCard";
import Main from "@/components/Main";
import { AppProvider } from "@/context/AppContext";

const Page = ({ imageUrl, name, description }) => {
  return (
    <AppProvider>
      <div className="max-h-screen h-fit min-h-[80vh] w-screen flex flex-col justify-between">
        <Main />
      </div>
    </AppProvider>
  );
};

export default Page;
