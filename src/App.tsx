import { Box, Container } from "@chakra-ui/react";
import "./App.css";
import CardList from "./components/CardList";
import Header from "./components/Header/header";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Header />

      <Container centerContent={true} pt={"120px"} pb={"40px"} flex="1">
        <CardList />
      </Container>

      <Footer />
    </Box>
  );
}

export default App;
