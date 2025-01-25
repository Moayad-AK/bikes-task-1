import { VStack, Text } from "@chakra-ui/react";

const ErrorState = ({ message }: { message: string }) => (
  <VStack gap={4} align="center" justify="center" minH="50vh">
    <Text fontSize="lg" fontWeight="medium" color="red.500">
      Oops! Something went wrong.
    </Text>
    <Text fontSize="sm" color="gray.600" textAlign="center" maxW="sm">
      {message || "An unexpected error occurred. Please try again later."}
    </Text>
  </VStack>
);

export default ErrorState;
