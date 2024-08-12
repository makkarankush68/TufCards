import TabBtn from "./TabBtn";
import TabContent from "./TabContent";

const Admin = () => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl text-center">Welcome, Tuf Admin</h1>
      <div>
        <div className="flex w-screen justify-around">
          <TabBtn title="All Cards" index={0} />
          <TabBtn title="Add New Card" index={1} />
          <TabBtn title="Your details" index={2} />
        </div>
        <TabContent />
      </div>
    </div>
  );
};

export default Admin;
