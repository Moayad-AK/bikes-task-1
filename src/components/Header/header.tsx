import { useState, useEffect } from "react";
import { Box, Image, Flex } from "@chakra-ui/react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      bg="#111"
      w="100%"
      position="fixed"
      top="0"
      left="0"
      zIndex="1000"
      transition="all 0.3s ease"
      p={isScrolled ? 2 : 4}
      boxShadow={isScrolled ? "md" : "none"}
    >
      <Flex justify="center" align="center">
        <Image
          src="https://bikeindex.org/assets/revised/logo-b5b90b10f3084a33e26097ffff6528ca15766eaeb008c5a6d0e242605ccad3b8.svg"
          alt="Logo"
          width={isScrolled ? "35px" : "55px"}
          transition="width 0.3s ease"
        />
      </Flex>
    </Box>
  );
};

export default Header;
