import React from "react";
import { HideButton, Button } from "web3uikit";
const MediaInfo = ({ tokenData }) => {
  const desc = tokenData.description;
  const tokenName = tokenData.name;
  const tokenId = tokenData.tokenId;
  const mediaUrl = tokenData.url;
  const date = tokenData.timestamp;
  return (
    <div className="bg-black-400 cursor-pointer" style={{ width: "75%" }}>
      <div
        className="m-5 h-full transition duration-200 shadow-xl rounded-md border border-black-100"
        style={{ height: "43vw", width: "100%" }}
      >
        {/* <ul className="flex mx-4 w-5/6 my-2">
          <a
            target="/"
            href="https://sepolia.etherscan.io/address/0x4Ea82f53c7332A9430276B27964F85f74d94Ce75"
            className="w-full h-50 p-5 my-3 mr-5 bg-violet-400 text-white hover:bg-violet-400 hover:text-white transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Etherscan
          </a>
          <a
            target="/"
            href="https://sepolia.etherscan.io/address/0x4Ea82f53c7332A9430276B27964F85f74d94Ce75"
            className="w-full h-50 p-5 my-3 mr-4 bg-violet-400 text-white hover:bg-violet-400 hover:text-white transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Media
          </a>
          <a
            target="/"
            href="https://sepolia.etherscan.io/address/0x4Ea82f53c7332A9430276B27964F85f74d94Ce75"
            className="w-full h-50 p-5 my-3 bg-violet-400 text-white hover:bg-violet-400 hover:text-white transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between"
          >
            Profile
          </a>
        </ul> */}
        <ul id="tokenData" className="text-black" style={{ height: "60%" }}>
          {tokenData ? (
            <div class=" mx-7 mt-10 text-black w-6/6 mr-8">
              <div class="border-b border-gray-200 pb-6">
                <h1 class="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 mt-5">
                  {tokenName}
                </h1>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Description: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${desc}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">TokenId: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${tokenId}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Media Url: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${mediaUrl}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Date </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${date}`}</p>
                </div>
              </div>
              <div class="py-4 border-b border-gray-200 flex">
                <p class="leading-4 w-2/6">Etherscan: </p>
                <div class="flex w-4/6">
                  <p class="text-sm  ml-4">{`${mediaUrl}`}</p>
                </div>
              </div>
            </div>
          ) : (
            "No data found"
          )}
        </ul>
      </div>
    </div>
  );
};

export default MediaInfo;
// export async function getServerSideProps(context) {
//   const { slug } = context.query;
//   console.log(slug.toString());
//   const url = "http://localhost:8000/getUserProfile";
//   const data = await getProfile(url, { userIdHash: slug.toString() });

//   data.userIdHash = slug;
//   // Pass data to the page via props
//   return { props: { data } };
// }
