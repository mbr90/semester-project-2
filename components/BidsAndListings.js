import Accordion from "./Accordion";
import GetProfileData from "./api/fetch/GetProfileData";
import Username from "./tools/Username";
import ClientOnly from "./tools/ClientOnly";
import Button from "./Button";
import FormatDate from "./tools/FormatDate";

const ProfileURL = "https://api.noroff.dev/api/v1/auction/profiles/";
export default function BidsAndListings() {
  let myListings;
  let myBids;
  if (Username()) {
    const profileEndpoint = ProfileURL + Username() + "/listings";
    const profileBids = ProfileURL + Username() + "/bids";
    myListings = GetProfileData({ endpoint: profileEndpoint });
    myBids = GetProfileData({ endpoint: profileBids });
  }

  console.log(myBids);

  return (
    <>
      <ClientOnly>
        <Accordion title="My Listings">
          {myListings &&
            myListings.map((listing, index) => {
              //   const sortedBids = item.bids.sort(
              //     (a, b) => b.amount - a.amount
              //   );
              //   const highestBid = sortedBids[0]?.amount;

              return (
                <section
                  key={index}
                  className=" w-full min-h-[717px]  bg-midnightBlue max-w-[577px] min-[578px]:rounded-lg mx-auto my-10 flex-col overflow-hidden"
                >
                  <img
                    src={listing.media}
                    alt={listing.title}
                    className="w-full h-[348px] my-auto object-cover shadow-lg "
                  />

                  <div className="p-mobMargin cursor-pointer text-myWhite flex w-full">
                    <div className="w-11/12">
                      <h1 className="font-serif text-[27px]">
                        {listing.title}
                      </h1>
                      <p>{listing.description}</p>
                    </div>
                  </div>
                  <div className="border-t-2 border-myWhite flex justify-between pl-mobMargin py-mobMargin pr-[20px]">
                    <div className="flex-col text-myWhite font-sans mr-4">
                      <p className="mb-3">
                        <span className="font-bold">Current Bid: </span>
                        {/* {bid} */}
                      </p>
                      <p>
                        <span className="font-bold">Ends:</span>{" "}
                        <FormatDate date={listing.endsAt} />
                      </p>
                    </div>

                    <Button content="VIEW ITEM" />
                  </div>
                </section>
              );
            })}
        </Accordion>
      </ClientOnly>
    </>
  );
}
