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

const CardList = () => {
  // Single state object
  const [filters, setFilters] = useState<IUseFetchBikesParams>({
    title: "",
    dateRange: { from: "", to: "" },
    stolenness: "all",
    location: undefined,
    pageSize: 10,
  });

  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useFetchBikes(filters);

  const { data: countData } = useFetchCount(filters);

  console.log(countData);

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
    console.log(error.name);

    return <ErrorState message={error.message} />;
  }

  // if (countData?.proximity === 0 || countData?.stolen === 0) {
  //   return <EmptyState />;
  // }

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
        title={filters.title ?? ""}
        dateRange={filters.dateRange}
        setFilters={setFilters}
        onTitleChange={(title) => setFilters((prev) => ({ ...prev, title }))}
        onDateRangeChange={(dateRange) =>
          setFilters((prev) => ({ ...prev, dateRange }))
        }
        onResetFilters={handleResetFilters}
        countData={countData}
      />
      {(countData?.proximity === 0 || countData?.stolen === 0) && (
        <EmptyState />
      )}
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

// import React, { useState } from "react";
// import {
//   Badge,
//   Box,
//   Card,
//   Center,
//   Flex,
//   HStack,
//   Image,
//   List,
//   Text,
// } from "@chakra-ui/react";
// import {
//   PaginationItems,
//   PaginationNextTrigger,
//   PaginationPageText,
//   PaginationPrevTrigger,
//   PaginationRoot,
// } from "@/components/ui/pagination";
// import { format, set } from "date-fns";
// import fallbackImage from "../assets/no-image.jpg";
// import useCards from "../hooks/useCards";

// const CardList = () => {
//   const pageSize = 10;
//   const [page, setPage] = useState(1);
//   const { data: cards, error, isLoading } = useCards({ pageSize, page });

//   if (error) {
//     return <p className="text-danger">{error.message}</p>;
//   }

//   if (isLoading) {
//     return <p className="text-primary">loading...</p>;
//   }

//   const formattedDate = (dateString: number) => {
//     const date = new Date(dateString * 1000);
//     return format(date, "MM/dd/yyyy");
//   };

//   return (
//     <Flex my="8" justify={"center"} direction={"column"} align="center">
//       <Flex wrap="wrap" justify="center" gap="5" w="100%">
//         {cards?.bikes?.map((card) => (
//           <Card.Root
//             key={card?.id}
//             flexDirection={{ sm: "row", base: "column" }}
//             overflow="hidden"
//             width={{ md: "75%", base: "60%" }}
//           >
//             <Image
//               objectFit="cover"
//               maxW={{ md: "35%", base: "100%" }}
//               src={card?.thumb || fallbackImage}
//               alt="Stolen Bike"
//             />
//             <Box px="5" py="3" display="flex" flexDirection="column">
//               <Card.Body>
//                 <Card.Title mb="2">{card?.title}</Card.Title>
//                 <Card.Description>{card?.description}</Card.Description>
//                 <Text my="3">Location: {card.stolen_location}</Text>
//               </Card.Body>
//               <Card.Footer>
//                 <HStack flexDirection={{ sm: "row", base: "column" }}>
//                   <Text>Stolen: {formattedDate(card?.date_stolen)},</Text>
//                   <Text>
//                     Report Year:
//                     {card?.year || " Unknown"}
//                   </Text>
//                 </HStack>
//               </Card.Footer>
//             </Box>
//           </Card.Root>
//         ))}
//       </Flex>
//       <PaginationRoot count={20} pageSize={pageSize} defaultPage={page} my="6">
//         <HStack gap="4">
//           <PaginationPrevTrigger
//             disabled={page === 1}
//             onClick={() => setPage(page - 1)}
//           />
//           <PaginationPageText />
//           <PaginationNextTrigger onClick={() => setPage(page + 1)} />
//         </HStack>
//       </PaginationRoot>
//     </Flex>
//   );
// };

// export default CardList;
