import { Box, Text, VStack } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box
      as="footer"
      bg="#111"
      color="gray.400"
      py={4}
      textAlign="center"
      position="fixed"
      bottom={0}
      width="100%"
    >
      <VStack gap={1}>
        <Text fontSize="md" fontWeight="medium">
          © 2025 Bike Index Test
        </Text>
        <Text fontSize="sm">
          All rights reserved. Designed with care and passion.
        </Text>
      </VStack>
    </Box>
  );
};

export default Footer;
