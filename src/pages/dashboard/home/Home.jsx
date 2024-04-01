import NotificationCard from "./components/NotificationCard";

const Home = () => {
  return (
    <div className="max-w-[100rem] mx-auto flex flex-col h-[800px]">
      <div className="flex-1 flex flex-row gap-2 h-full">
        <div className="flex flex-col gap-2 w-8/12 h-full">
          <div className="flex-1 w-full rounded-3xl bg-second"></div>
          <div className="flex flex-row gap-2">
            <div className="h-[450px] w-8/12 rounded-3xl bg-second"></div>
            <div className="flex-1 h-[450px] rounded-3xl bg-second"></div>
          </div>
        </div>
        <NotificationCard/>
      </div>
    </div>
  );
};

export default Home;
