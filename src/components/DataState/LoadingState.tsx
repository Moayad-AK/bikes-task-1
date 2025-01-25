import { Spinner, Text, VStack } from "@chakra-ui/react";

const LoadingState = () => (
  <VStack gap={4} align="center" justify="center" minH="50vh">
    <Spinner size="xl" color="gray.500" />
    <Text fontSize="lg" fontWeight="medium" color="gray.500">
      Loading data, please wait...
    </Text>
  </VStack>
);

export default LoadingState;
