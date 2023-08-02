import React, { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../components/config";
import { Avatar, Card, Form } from "web3uikit";
import { useMoralis, useWeb3Contract } from "react-moralis";
import FakeMedia from "../constants/FakeMedia.json";
import FakeXnetworkMapping from "../constants/FakeXnetworkMapping.json";
import { generateSHA256Hash } from "../utils/cryptoHash";
import { handleListSuccess } from "../utils/ApiCalls";
import Tabs from "../components/Tabs";
const Profile = () => {
  const [userdata, setuserdata] = useState({});
  const { runContractFunction } = useWeb3Contract();
  const { chainId, account, isWeb3Enabled } = useMoralis();
  console.log(isWeb3Enabled, "****************", chainId);
  const chainString = chainId ? parseInt(chainId).toString() : "31337";
  const marketplaceAddress = FakeXnetworkMapping[chainString].FakeMedia[0];
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userIdHash = await generateSHA256Hash(user.uid);
        console.log(userIdHash);
        const gotUserData = {
          displayName: user.displayName,
          photoURL: user.photoURL,
          userIdHash: userIdHash,
          userId: user.uid,
        };
        setuserdata(gotUserData);
        // const url = "http://localhost:8000/getUserProfile";
        // console.log(await getProfile(url, { userIdHash: userdata.userIdHash }));
      } else {
        console.log("No data found");
      }
    });

    return () => unsubscribe();
  }, []);
  // async function getProfile(url, data) {
  //   try {
  //     const response = await fetch(url, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     });

  //     // Check if the request was successful
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok.");
  //     }

  //     const responseData = await response.json();
  //     console.log("Response from the server:", responseData);
  //     return responseData;
  //   } catch (error) {
  //     console.error("Error sending POST request:", error);
  //   }
  // }

  return (
    <div>
      <div
        style={{
          width: "100vw",
        }}
        className="flex"
      >
        <div className="m-5 mr-0 flex" style={{ width: "20%", height: "20%" }}>
          <Card
            description={
              userdata.userIdHash ? userdata.userIdHash.substring(0, 10) : ""
            }
            onClick={function noRefCheck() {}}
            setIsSelected={function noRefCheck() {}}
            title={userdata.displayName}
            tooltipText={<span style={{ width: 200 }}>Not Verified</span>}
          >
            <div className="flex justify-center align-middle my-10">
              <Avatar
                image={userdata.photoURL}
                isRounded
                theme="image"
                size={150}
              />
            </div>
          </Card>
        </div>
        <Tabs userdata={userdata} />
      </div>
    </div>
  );
};

export default Profile;
