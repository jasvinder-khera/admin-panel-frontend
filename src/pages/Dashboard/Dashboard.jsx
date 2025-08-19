import ChartDisplay from "../../components/ChartDisplay/ChartDisplay";
import ChartForm from "../../components/ChartForm/ChartForm";

const Dashboard = () => {

  return (
    <div>
      <h1 className="text-center">Generate Chart</h1>
      <div className="my-4">
        <ChartForm />
        <ChartDisplay />
      </div>
    </div>
  );
};

export default Dashboard;