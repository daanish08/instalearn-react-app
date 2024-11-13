import { Helmet } from "react-helmet-async";
import Subsection from "../components/home/Subsection";
const Home = () => {
  return (
    <div className="gradient-background">
      <Helmet>
        <title>Home</title>
      </Helmet>
      {/* Home
    <Hero/> */}
      <Subsection />
    </div>
  );
};

export default Home;
