import { List } from "@chakra-ui/react";
import { EmptyState as ChEmptyState } from "@/components/ui/empty-state";
import { HiColorSwatch } from "react-icons/hi";

const EmptyState = () => (
  <ChEmptyState
    py={5}
    icon={<HiColorSwatch />}
    title="No results found"
    description="Try adjusting your search"
  >
    <List.Root variant="marker">
      <List.Item>Try removing filters</List.Item>
      <List.Item>Try different keywords</List.Item>
    </List.Root>
  </ChEmptyState>
);

export default EmptyState;
