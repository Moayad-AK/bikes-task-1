import { Text, VStack, Image } from "@chakra-ui/react";
import emptyImage from "../../assets/no-image.jpg";

const EmptyState = () => (
  <VStack gap={4} align="center" justify="center" minH="50vh">
    <Image src={emptyImage} alt="No data" boxSize="200px" objectFit="contain" />
    <Text fontSize="lg" fontWeight="medium" color="gray.600">
      No data found.
    </Text>
    <Text fontSize="sm" color="gray.500" textAlign="center" maxW="sm">
      Try adjusting your filters or search to find what you're looking for.
    </Text>
  </VStack>
);

export default EmptyState;
