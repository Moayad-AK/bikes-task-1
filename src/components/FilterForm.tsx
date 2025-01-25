import { Flex, Input } from "@chakra-ui/react";
import Button from "./Button/Button";
import { IUseFetchBikesParams } from "@/hooks/useFetchBikes";
import { ICountResponse } from "@/types/count";

interface FilterFormProps {
  title: string;
  dateRange: { from: string; to: string };
  setFilters: (v: (par: IUseFetchBikesParams) => IUseFetchBikesParams) => void;
  onTitleChange: (value: string) => void;
  onDateRangeChange: (range: { from: string; to: string }) => void;
  onResetFilters: () => void;
  countData: ICountResponse | undefined;
}

const FilterForm = ({
  title,
  // dateRange,
  onTitleChange,
  countData,
  // onDateRangeChange,
  onResetFilters,
  setFilters,
}: FilterFormProps) => {
  const onFilter = () => {
    setFilters((prev) => ({
      ...prev,
      stolenness: "proximity",
      location: "Munich",
    }));
  };
  return (
    <Flex
      direction={{ lg: "row", base: "column" }}
      align="center"
      my="4"
      gap="4"
    >
      <Input
        p={"2"}
        placeholder="Search by title"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        width="300px"
      />
      {/* <Flex gap="4">
        <Input
          type="date"
          placeholder="From"
          value={dateRange.from}
          onChange={(e) =>
            onDateRangeChange({ ...dateRange, from: e.target.value })
          }
        />
        <Input
          type="date"
          placeholder="To"
          value={dateRange.to}
          onChange={(e) =>
            onDateRangeChange({ ...dateRange, to: e.target.value })
          }
        />
      </Flex> */}
      <Flex gap="4" alignItems={"center"}>
        <Button onClick={onFilter} colorScheme="blue">
          Munich ({countData?.proximity})
        </Button>
        <Button onClick={onResetFilters} colorScheme="gray">
          Reset Filters ({countData?.stolen})
        </Button>
      </Flex>
    </Flex>
  );
};

export default FilterForm;
