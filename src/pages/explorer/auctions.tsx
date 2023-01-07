import ExecutionEnvironment from "@docusaurus/ExecutionEnvironment";
import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_AUCTIONS } from "../../queries";
import AuctionsTable from "../../components/auctions-table";
import { Auction } from "@site/src/__generated__/graphql";
import { useQueryPollingWhileWindowFocused } from "@site/src/hooks/useQueryPollingWhileWindowFocused";
import ReactPaginate from "react-paginate";

export default function Auctions(): JSX.Element {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>All Auctions️</h1>
      {/* itemsPerPage must equal 'first' in the GET_AUCTIONS query */}
      <PaginatedAuctions itemsPerPage={10} />{" "}
    </div>
  );
}

function PaginatedAuctions({
  itemsPerPage,
}: {
  itemsPerPage: number;
}): JSX.Element {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [shouldPoll, setShouldPoll] = useState(true);

  useEffect(() => {
    // If we're on the first page, we want to poll.
    // If we're on any other page, we do not want to poll.
    setShouldPoll(itemOffset === 0);
  }, [itemOffset]);

  // Fetch the items to display on the current page.
  const endOffset = itemOffset + itemsPerPage;
  const queryResult = useQuery(GET_AUCTIONS, {
    variables: {
      offset: itemOffset,
    },
  });
  useQueryPollingWhileWindowFocused({
    pollInterval: shouldPoll ? 1000 : 0,
    ...queryResult,
  });

  if (queryResult.data || queryResult.loading) {
    const items = queryResult?.data?.allAuctions?.totalCount || 10;
    const currentItems = queryResult?.data?.allAuctions?.nodes as Auction[];
    const pageCount = Math.ceil(items / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * itemsPerPage) % items;
      setItemOffset(newOffset);
    };
    return (
      <>
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
          <AuctionsTable auctions={currentItems} />
        )}
      </>
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
