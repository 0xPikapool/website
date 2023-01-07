import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUCTION, GET_AUCTION_BIDS } from "../../queries";
import AuctionsTable from "../../components/auctions-table";
import { Auction, Bid } from "@site/src/__generated__/graphql";
import BidsTable from "@site/src/components/bids-table";
import { stringToHexBuffer } from "@site/src/utils";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";
import ReactPaginate from "react-paginate";

export default function AuctionPage(props: {
  name: string;
  address: string;
}): JSX.Element {
  if (!ExecutionEnvironment.canUseDOM) return <p>Loading...</p>;

  const { name, address } = props;
  const auctionQueryResult = useQuery(GET_AUCTION, {
    variables: {
      address: stringToHexBuffer(address),
      name,
    },
  });
  useQueryPollingWhileWindowFocused({
    pollInterval: 1000,
    ...auctionQueryResult,
  });

  const { data, loading, error } = auctionQueryResult;
  if (loading) return <p>Loading...</p>;
  if (data) {
    const auction = data.auctionByAddressAndName as Auction;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>{`${auction.name}`}</h1>
        <AuctionsTable auctions={[auction]} showName={false} />
        <PaginatedAuctionBids
          name={props.name}
          address={props.address}
          bidsPerPage={10}
        />
      </div>
    );
  }
  if (error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(error)}</p>
      </>
    );
}

function PaginatedAuctionBids({
  bidsPerPage,
  address,
  name,
}: {
  bidsPerPage: number;
  address: string;
  name: string;
}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [shouldPoll, setShouldPoll] = useState(true);
  const [lastTotalBids, setLastTotalBids] = useState(0);

  useEffect(() => {
    // If we're on the first page, we want to poll.
    // If we're on any other page, we do not want to poll.
    setShouldPoll(itemOffset === 0);
  }, [itemOffset]);

  // Fetch the items to display on the current page.
  const endOffset = itemOffset + bidsPerPage;
  const queryResult = useQuery(GET_AUCTION_BIDS, {
    variables: {
      address: stringToHexBuffer(address),
      name,
      offset: itemOffset,
    },
  });
  useQueryPollingWhileWindowFocused({
    pollInterval: shouldPoll ? 1000 : 0,
    ...queryResult,
  });

  if (queryResult.data || queryResult.loading) {
    const auction = queryResult.data?.auctionByAddressAndName as Auction;
    // Total Bids can be null while loading, so save what the last one was
    // so we can render pagination properly
    const totalBids = auction?.bidsByAuctionAddressAndAuctionName.totalCount;
    if (!isNaN(totalBids) && totalBids !== lastTotalBids)
      setLastTotalBids(totalBids);

    const currentBids = (auction?.bidsByAuctionAddressAndAuctionName?.nodes ||
      []) as Bid[];
    const pageCount = Math.ceil(lastTotalBids / bidsPerPage);
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * bidsPerPage) % lastTotalBids;
      setItemOffset(newOffset);
    };
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "45rem",
          alignItems: "center",
        }}
      >
        <div className="hero__subtitle">{`Latest Bids`}</div>
        <ReactPaginate
          onPageChange={handlePageClick}
          previousLabel="Previous"
          nextLabel="Next"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          containerClassName="pagination"
          activeClassName="active"
        />
        {queryResult.loading ? (
          <>Loading...</>
        ) : (
          <>
            <BidsTable bids={currentBids} />
          </>
        )}
      </div>
    );
  }
  if (queryResult.error)
    return (
      <>
        <p>Error :(</p>
        <p>{JSON.stringify(queryResult.error)}</p>
      </>
    );
}
