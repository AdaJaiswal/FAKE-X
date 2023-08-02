import React, { useEffect, useState } from "react";
import { Form } from "web3uikit";
import { handleClickTabs } from "../utils/frontendMethods";
import { getProfile, handleListSuccess, postData } from "../utils/ApiCalls";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/config";
import { useMoralis, useWeb3Contract } from "react-moralis";
import FakeMedia from "../constants/FakeMedia.json";
import FakeXnetworkMapping from "../constants/FakeXnetworkMapping.json";
import { generateSHA256Hash } from "../utils/cryptoHash";
const Tabs = ({ userdata }) => {
  const { runContractFunction } = useWeb3Contract();
  const { chainId, account, isWeb3Enabled } = useMoralis();
  const [published, setpublished] = useState({});
  console.log(isWeb3Enabled, "****************", chainId);
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = FakeXnetworkMapping[chainString].FakeMedia[0];
  const deployMedia = async (data) => {
    if (isWeb3Enabled) {
      console.log(isWeb3Enabled);
      const media_data = {
        name: data.data[0].inputResult,
        description: data.data[1].inputResult,
        url: data.data[2].inputResult,
        userName: userdata.displayName,
        userId: userdata.userIdHash,
      };
      const url = "http://localhost:8000/createJson";
      // const ipfsUrl = (await postData(url, media_data)).url;
      const ipfsUrl = "http://drive.io";

      console.log("Ok! Now time to mint", ipfsUrl);
      const mintOption = {
        abi: FakeMedia,
        contractAddress: marketplaceAddress,
        functionName: "mintNft",
        params: {
          mediaURI: ipfsUrl,
        },
      };
      await runContractFunction({
        params: mintOption,
        onSuccess: (result) => handleListSuccess(result, ipfsUrl, userdata),
        onError: (error) => {
          console.log(error);
        },
      });
    } else {
      console.log("first enable web3");
    }
  };

  useEffect(() => {
    const url = "http://localhost:8000/getUserProfile";
    (async () => {
      const profileData = await getProfile(url, {
        userIdHash:
          "1270b9193b26d15469347e88aedfa3cf18b141dc01014a86fe8e77f4680a911d",
      });
      setpublished(profileData.published);
    })();
  }, []);

  return (
    <div className="bg-black-400 cursor-pointer" style={{ width: "75%" }}>
      <div
        className="m-5 h-full transition duration-200 shadow-xl rounded-md border border-black-100"
        style={{ height: "43vw", width: "100%" }}
      >
        <ul className="flex">
          <li
            id="publishedTab"
            onClick={() => {
              handleClickTabs(
                "published",
                "upload",
                "publishedTab",
                "uploadTab",
                "#a78bfa",
                "white",
                "black"
              );
            }}
            className="w-45 h-50 p-5 mx-5 my-3 bg-violet-400 text-white hover:bg-violet-50 hover:text-black transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Published
          </li>
          <li
            id="uploadTab"
            onClick={() => {
              handleClickTabs(
                "upload",
                "published",
                "uploadTab",
                "publishedTab",
                "#a78bfa",
                "white",
                "black"
              );
            }}
            className="w-45 h-50 p-5 bg-white my-3 px-8 hover:bg-violet-50 transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Upload
          </li>
        </ul>
        <ul
          id="published"
          className="overflow-y-scroll scrollbar-hidden"
          style={{ height: "83%" }}
        >
          {published
            ? Object.keys(published).map((item) => {
                return (
                  <li className="w-45 h-50 p-5 mx-5 my-3 hover:bg-violet-50 transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between">
                    <span>{item}</span>
                    <a href={published[item]} target="/">
                      {published[item]}
                    </a>
                    <a
                      href={`http://localhost:3000/publisher/1270b9193b26d15469347e88aedfa3cf18b141dc01014a86fe8e77f4680a911d`}
                    >
                      {/* {userdata.userIdHash.substring(0, 10)} */}
                      aofgjjkl
                    </a>
                  </li>
                );
              })
            : "No data found"}
        </ul>
        <ul id="upload" className="bg-black-400" style={{ display: "none" }}>
          <Form
            onSubmit={deployMedia}
            data={[
              {
                name: "Name",
                type: "text",
                inputWidth: "50%",
                value: "",
                key: "nftAddress",
              },
              {
                name: "Description",
                type: "text",
                value: "",
                key: "tokenId",
              },
              {
                name: "Media Url",
                type: "text",
                value: "",
                key: "price",
              },
            ]}
            title="Mint your media"
            id="Main Form"
          />
        </ul>
      </div>
    </div>
  );
};
export default Tabs;
