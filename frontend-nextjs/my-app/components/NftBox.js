import { useEffect, useState } from "react";
import { useWeb3Contract, useMoralis } from "react-moralis";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import nftAbi from "../constants/BasicNft.json";
import { Card, useNotification } from "web3uikit";
import { ethers } from "ethers";
import UpdateListingModal from "./UpdateListingModal";

const truncateStr = (fullStr, strLen) => {
  if (fullStr.length <= strLen) return fullStr;

  const separator = "...";
  const seperatorLength = separator.length;
  const charsToShow = strLen - seperatorLength;
  const frontChars = Math.ceil(charsToShow / 2);
  const backChars = Math.floor(charsToShow / 2);
  return (
    fullStr.substring(0, frontChars) +
    separator +
    fullStr.substring(fullStr.length - backChars)
  );
};

export default function NftBox({
  nftMarketplace,
  seller,
  nftAddress,
  tokenId,
  price,
}) {
  const { isWeb3Enabled, account } = useMoralis();
  const [imageURI, setimageURI] = useState("");
  const [tokenName, settokenName] = useState("");
  const [showModal, setshowModal] = useState(false);
  const [tokenDescription, settokenDescription] = useState("");
  const isOwnedByUser = seller.toLowerCase() === account.toLowerCase();
  const formatAddress = isOwnedByUser ? "you" : truncateStr(seller || " ", 15);
  const dispatch = useNotification();
  const hideModal = () => {
    setshowModal(false);
  };
  const { runContractFunction: getTokenURI } = useWeb3Contract({
    abi: nftAbi,
    contractAddress: nftAddress,
    functionName: "tokenURI",
    params: {
      tokenId: tokenId,
    },
  });

  const { runContractFunction: buyItem } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: nftMarketplace,
    functionName: "buyItem",
    msgValue: price,
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
    },
  });

  async function updateUI() {
    const tokenURI = await getTokenURI();
    if (tokenURI) {
      const requestUrl = tokenURI.replace("ipfs://", "https://ipfs.io/ipfs/");
      fetch(requestUrl)
        .then((response) => response.json())
        .then((data) => {
          setimageURI(data.image);
          settokenName(data.name);
          settokenDescription(data.description);
        });
    }
  }
  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI();
    }
  }, [isWeb3Enabled]);

  const handleBuyItemSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Refresh Now !!",
      title: "Item Bought",
      position: "topR",
    });
  };

  const handleCardClick = () => {
    console.log(isOwnedByUser);
    isOwnedByUser
      ? setshowModal(true)
      : buyItem({
          onError: (error) => console.log(error),
          onSuccess: handleBuyItemSuccess,
        });
  };

  return (
    <div>
      <UpdateListingModal
        nftMarketplace={nftMarketplace}
        nftAddress={nftAddress}
        tokenId={tokenId}
        isVisible={showModal}
        onClose={hideModal}
      />
      <Card
        width="400px"
        title={tokenName}
        description={tokenDescription}
        onClick={handleCardClick}
      >
        <div
          className="flex flex-col justify-center items-end p-5"
          width="500px"
        >
          <div>#{tokenId}</div>
          <div className="italic text-sm">Owned by {formatAddress}</div>
          <img
            className="mx-auto"
            src={imageURI}
            alt=""
            width="200px"
            height="200px"
          />
          <div className="font-bold mx-auto">
            {ethers.utils.formatUnits(price, "ether")} ETH
          </div>
        </div>
      </Card>
    </div>
  );
}
