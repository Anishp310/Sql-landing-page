import Banner from "../components/home/Banner";
import Carousel from "../components/home/Carousel";
import Container from "../components/home/Container";
import News from "../components/home/News";
import OperationSection from "../components/home/OperationSection";

const Home = () => {
  

  return (
    <div  >
      <Carousel/>
      <Container/>
      <News/>
      <Banner/>
      <OperationSection/>
    </div>
  )
}

export default Home