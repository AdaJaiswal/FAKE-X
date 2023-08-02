import styles from "../styles/Home.module.css";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import NftBox from "../components/NftBox";
import { useWeb3Contract, useMoralis } from "react-moralis";

export default function Home() {
  const { isWeb3Enabled } = useMoralis();
  const [activeItems, setactiveItems] = useState([]);
  const [isFetching, setisFetching] = useState(true);

  const getActiveItems = () => {
    fetch("http://localhost:8000/activeItems")
      .then((response) => response.json())
      .then((data) => {
        setactiveItems(data);
        setisFetching(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    getActiveItems();
  }, []);

  return (
    <div className="flex">
      {isWeb3Enabled ? (
        isFetching ? (
          <div>Loading....</div>
        ) : (
          activeItems.map((item) => {
            return (
              <div className="mx-5 my-5 flex flex-no-warp">
                <NftBox
                  nftMarketplace={item.nftMarketplace}
                  seller={item.seller}
                  nftAddress={item.nftAddress}
                  tokenId={item.tokenId}
                  price={item.price}
                  key={`${item.nftAddress}${item.tokenId}`}
                />
              </div>
            );
          })
        )
      ) : (
        <div>Web3 currently not enabled</div>
      )}
    </div>
  );
}
