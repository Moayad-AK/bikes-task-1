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
    },

    keepPreviousData: true,
  });

export default useFetchCount;
