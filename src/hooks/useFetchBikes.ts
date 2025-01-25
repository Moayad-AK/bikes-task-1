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
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasMore = lastPage.bikes.length === query.pageSize;
      return hasMore ? allPages.length + 1 : undefined;
    },
    // staleTime: 0.5 * 60 * 1000, // 0.5 minute
    keepPreviousData: true,
  });

export default useFetchBikes;
