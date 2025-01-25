import { Container } from "@chakra-ui/react";
import "./App.css";
import CardList from "./components/CardList";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Container centerContent={true} pb={"40px"}>
        <CardList />
      </Container>
      <Footer />
    </>
  );
}

export default App;
