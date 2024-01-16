import Multiselect from "./component/Multiselect";
import userInformation from "../src/assets/userInformation";

const App = () => {
  return (
    <div className="font-montserrat flex justify-center items-center h-screen w-full flex-col">
      <p className="text-xl mb-4">Pick your users</p>
      <Multiselect options={userInformation.map((info) => `${info.name}`)} />
    </div>
  );
};

export default App;
