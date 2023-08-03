import { useEffect, useState } from "react";
import { generateSHA256Hash } from "../utils/cryptoHash";
import { copyToClipboard } from "../utils/frontendMethods";
const Listings = () => {
  const [allData, setallData] = useState("");
  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  const data = [
    {
      tokenId: 42,
      tokenUri:
        "https://ipfs.io/ipfs/Qma2ah9y7Fntm6VoLuttsoNQrXZeFzBFBEiKS5HUgxYEmB",
      userIdHash: "1270b9193b26d154693",
    },
    {
      tokenId: 43,
      tokenUri:
        "https://ipfs.io/ipfs/Qma2ah9y7Fntm6VoLuttsoNQrXZeFzBFBEiKS5HUgxYEmB",
      userIdHash: "1270b9193b26d154693",
    },
    {
      tokenId: 44,
      tokenUri:
        "https://ipfs.io/ipfs/Qma2ah9y7Fntm6VoLuttsoNQrXZeFzBFBEiKS5HUgxYEmB",
      userIdHash: "1270b9193b26d154693",
    },
  ];
  useEffect(() => {
    (async () => {
      const url = "http://localhost:8000/getAllData";
      const response = await fetch(url);
      const data = JSON.parse(await response.json());
      console.log(data);
      setallData(data);
    })();
  }, []);

  return (
    <div>
      <ul>
        <li className="w-45 h-50 px-5 py-8 m-5 shadow-xl rounded-md border text-white border-gray-200 border-2 flex justify-between bg-violet-400">
          <span className="">TokenID</span>
          <span>TokenURI</span>
          <span>Owned By</span>
        </li>
      </ul>
      <ul>
        {allData
          ? Object.keys(allData).map((item) => {
              return (
                <li className="w-45 h-50 p-5 mx-5 my-3 hover:bg-violet-50 transition duration-200 shadow-md rounded-md border border-gray-200 border-2 flex justify-between">
                  <span>{item}</span>
                  <a href={allData[item].mediaUri} target="/">
                    {allData[item].mediaUri}
                  </a>
                  <a
                    href={`http://localhost:3000/publisher/${allData[item].userIdHash}`}
                  >
                    {/* {userdata.userIdHash.substring(0, 10)} */}
                    {allData[item].userIdHash.substring(0, 12)}
                  </a>
                </li>
              );
            })
          : "No data found"}
      </ul>
    </div>
  );
};

export default Listings;

// export async function getServerSideProps() {
//   const url = "http://localhost:8000/getAllData";
//   const response = await fetch(url);
//   const allData = JSON.parse(await response.json());
//   return { props: { allData } };
// }
