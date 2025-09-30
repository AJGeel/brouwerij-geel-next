import { brewingLog } from "@/data/brewingLog";

const Home = () => (
  <div className="flex flex-col items-center justify-center p-4">
    {brewingLog.map((item) => (
      <div key={item.number}>{JSON.stringify(item)}</div>
    ))}
  </div>
);

export default Home;
