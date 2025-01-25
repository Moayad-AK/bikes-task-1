import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ICountResponse } from "@/types/count";

export interface IUseFetchCount {
  title?: string;
  stolenness: string;
  location: string | undefined;
}

const useFetchCount = (query: IUseFetchCount) =>
  useQuery<ICountResponse, Error>({
    queryKey: ["count", query],
    queryFn: async ({ signal }) => {
      const controller = new AbortController();
      if (signal) {
        signal.addEventListener("abort", () => {
          controller.abort();
        });
      }

      try {
        const res = await axios.get<ICountResponse>(
          "https://bikeindex.org:443/api/v3/search/count",
          {
            params: {
              stolenness: query.stolenness,
              location: query.location,
              query: query.title || undefined,
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

    staleTime: 0.5 * 60 * 1000, // 0.5 minute
    keepPreviousData: true,
  });

export default useFetchCount;
