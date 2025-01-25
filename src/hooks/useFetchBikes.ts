import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import { IBikesResponse } from "../types";

export interface IUseFetchBikesParams {
  pageSize: number;
  title?: string;
  dateRange: {
    from: string;
    to: string;
  };
  stolenness: string;
  location: string | undefined;
}

const useFetchBikes = (query: IUseFetchBikesParams) =>
  useInfiniteQuery<IBikesResponse, Error>({
    queryKey: ["search", query],
    queryFn: async ({ pageParam = 1, signal }) => {
      const controller = new AbortController();
      if (signal) {
        signal.addEventListener("abort", () => {
          controller.abort();
        });
      }

      try {
        const res = await axios.get<IBikesResponse>(
          "https://bikeindex.org:443/api/v3/search",
          {
            params: {
              stolenness: query.stolenness,
              location: query.location,
              query: query.title || undefined,
              page: (pageParam - 1) * query.pageSize,
              per_page: query.pageSize,
            },
            signal: controller.signal,
          }
        );
        return res.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled:", error.message);
        }
        throw error;
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.bikes.length === query.pageSize;
      return hasMore ? allPages.length + 1 : undefined;
    },
    staleTime: 0.5 * 60 * 1000, // 0.5 minute
    keepPreviousData: true,
  });

export default useFetchBikes;

// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { Bike, IBikesResponse } from "../types";

// interface CardQuery {
//   pageSize: number;
//   page: number;
//   // stolenness?: string;
// }

// const useCards = (query: CardQuery) =>
//   useQuery<IBikesResponse, Error>({
//     queryKey: ["search", query],
//     queryFn: () =>
//       axios
//         .get<IBikesResponse>(
//           "https://bikeindex.org:443/api/v3/search?stolenness=all",
//           {
//             params: {
//               // stolenness: "all",
//               page: (query.page - 1) * query.pageSize,
//               per_page: query.pageSize,
//             },
//           }
//         )
//         .then((res) => res.data),
//     staleTime: 1 * 60 * 1000, //1m
//     keepPreviousData: true,
//   });

// export default useCards;
