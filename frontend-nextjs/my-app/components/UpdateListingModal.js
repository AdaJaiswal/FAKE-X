import React, { useState } from "react";
import { Modal, Input, useNotification } from "web3uikit";
import nftMarketplaceAbi from "../constants/NftMarketplace.json";
import { useWeb3Contract, useMoralis } from "react-moralis";
import { ethers } from "ethers";

const UpdateListingModal = ({
  nftMarketplace,
  nftAddress,
  tokenId,
  isVisible,
  onClose,
}) => {
  const dispatch = useNotification();
  const [PriceToUpdateListingWith, setPriceToUpdateListingWith] = useState(0);
  const handleUpdateListingSuccess = async (tx) => {
    await tx.wait(1);
    dispatch({
      type: "success",
      message: "Refresh Now !!",
      title: "Listing updated",
      position: "topR",
    });
    onClose && onClose();
    setPriceToUpdateListingWith("0");
  };

  const { runContractFunction: updateListing } = useWeb3Contract({
    abi: nftMarketplaceAbi,
    contractAddress: nftMarketplace,
    functionName: "updateListing",
    params: {
      nftAddress: nftAddress,
      tokenId: tokenId,
      newPrice: ethers.utils.parseEther(PriceToUpdateListingWith || "0"),
    },
  });

  return (
    <Modal
      isVisible={isVisible}
      onCancel={onClose}
      onCloseButtonPressed={onClose}
      onOk={() => {
        updateListing({
          onError: (error) => console.log(error),
          onSuccess: handleUpdateListingSuccess,
        });
      }}
    >
      <Input
        label="Update listing price in L1 currency (ETH)"
        name="New listing price"
        type="number"
        onChange={(event) => {
          setPriceToUpdateListingWith(event.target.value);
        }}
      />
    </Modal>
  );
};

export default UpdateListingModal;
