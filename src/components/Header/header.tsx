import { Box, Image, Flex } from "@chakra-ui/react";

const Header = () => {
  return (
    <Box display={"flex"} justifyContent={"center"} bg="#111" w="100%" p={4}>
      <Flex justify="center" align="center">
        <Image
          boxSize={{ xl: "60px", base: "40px" }}
          src="https://bikeindex.org/assets/revised/logo-b5b90b10f3084a33e26097ffff6528ca15766eaeb008c5a6d0e242605ccad3b8.svg"
          alt="Bike Index Logo"
        />
      </Flex>
    </Box>
  );
};

export default Header;
