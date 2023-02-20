import { useBlockNumber } from "wagmi";

export interface BlockNumbers {
  1: { data: number | undefined; isLoading: boolean; error: Error | null };
  5: { data: number | undefined; isLoading: boolean; error: Error | null };
}

export default function useBlockNumbers(): BlockNumbers {
  return {
    1: useBlockNumber({ chainId: 1, watch: true, cacheTime: 2000 }),
    5: useBlockNumber({ chainId: 5, watch: true, cacheTime: 2000 }),
  };
}
