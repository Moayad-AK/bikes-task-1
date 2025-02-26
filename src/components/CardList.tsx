import { useRef, useCallback, useState } from "react";
import {
  Box,
  Card,
  Flex,
  HStack,
  Image,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { format } from "date-fns";
import useFetchBikes, { IUseFetchBikesParams } from "../hooks/useFetchBikes";
import fallbackImage from "../assets/no-image.jpg";
import FilterForm from "./FilterForm";
import useFetchCount from "@/hooks/useFetchCount";
import LoadingState from "@/components/DataState/LoadingState";
import ErrorState from "@/components/DataState/ErrorState";
import EmptyState from "@/components/DataState/EmptyState";
import { useDebounce } from "@/hooks/useDebounce";

const CardList = () => {
  const [filters, setFilters] = useState<IUseFetchBikesParams>({
    dateRange: { from: "", to: "" },
    stolenness: "all",
    location: undefined,
    pageSize: 10,
  });
  const [title, setTitle] = useState<string>("");
  const debouncedQuery = useDebounce(title, 500);
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchBikes({ ...filters, title: debouncedQuery });

  const { data: countData } = useFetchCount(filters);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastCardRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (isFetchingNextPage) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState message={error.message} />;
  }

  const empty = () => {
    if (!data?.pages?.some((page) => page.bikes.length > 0)) {
      return <EmptyState />;
    }
    return null;
  };

  const formattedDate = (dateString: number) => {
    const date = new Date(dateString * 1000);
    return format(date, "MM/dd/yyyy");
  };

  const handleResetFilters = () => {
    setFilters({
      title: "",
      dateRange: { from: "", to: "" },
      stolenness: "all",
      location: "",
      pageSize: 10,
    });
  };

  return (
    <Flex justify={"center"} direction={"column"} align="center">
      <FilterForm
        title={title ?? ""}
        dateRange={filters.dateRange}
        setFilters={setFilters}
        onTitleChange={(title) => setTitle(title)}
        onDateRangeChange={(dateRange) =>
          setFilters((prev) => ({ ...prev, dateRange }))
        }
        onResetFilters={handleResetFilters}
        countData={countData}
      />
      {empty()}
      <Flex wrap="wrap" justify="center" gap="5" w="100%">
        {data.pages.map((page, pageIndex) =>
          page.bikes.map((card, cardIndex) => {
            const isLastCard =
              pageIndex === data.pages.length - 1 &&
              cardIndex === page.bikes.length - 1;

            return (
              <Card.Root
                key={card?.id}
                ref={isLastCard ? lastCardRef : null}
                flexDirection={{ sm: "row", base: "column" }}
                overflow="hidden"
                width={{ md: "75%", base: "60%" }}
                maxHeight={{ md: "200px", sm: "" }}
              >
                <Image
                  objectFit="cover"
                  maxW={{ md: "35%", base: "100%" }}
                  src={card?.thumb || fallbackImage}
                  alt="Stolen Bike"
                />
                <Box px="5" py="3" display="flex" flexDirection="column">
                  <Card.Body>
                    <Card.Title mb="2">{card?.title}</Card.Title>
                    <Card.Description>{card?.description}</Card.Description>
                    <Text my="3">
                      Location: {card?.stolen_location || " Unknown"}
                    </Text>
                  </Card.Body>
                  <Card.Footer>
                    <HStack flexDirection={{ sm: "row", base: "column" }}>
                      <Text>Stolen: {formattedDate(card?.date_stolen)},</Text>
                      <Text>
                        Report Year:
                        {card?.year || " Unknown"}
                      </Text>
                    </HStack>
                  </Card.Footer>
                </Box>
              </Card.Root>
            );
          })
        )}
      </Flex>
      {isFetchingNextPage && <Spinner my="4" size="lg" color="gray.500" />}
    </Flex>
  );
};

export default CardList;
