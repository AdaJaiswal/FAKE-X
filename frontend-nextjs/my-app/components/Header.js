import Link from "next/link";
import { ConnectButton } from "web3uikit";
import React, { useEffect, useState } from "react";
import { auth, provider } from "./config";
import { signInWithPopup } from "firebase/auth";
import { Button, ico } from "web3uikit";
export default function Header() {
  const [value, setvalue] = useState("");
  const [searchId, setsearchId] = useState("");
  const handleClick = () => {
    signInWithPopup(auth, provider).then((data) => {
      setvalue(data.user.displayName);
      localStorage.setItem("email", data.user.email);
    });
  };
  useEffect(() => {
    setvalue(localStorage.getItem("email"));
  });

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      // Perform the action you want to trigger when Enter is pressed, e.g., search
      console.log("Enter key pressed! Perform search here...");
      const val = event.target.value;
      if (val.length === 64) {
        //getProfile call
        window.location.href = `http://localhost:3000/publisher/${val}`;
      } else {
        window.location.href = `http://localhost:3000/mediaDetails/${val}`;
      }
      setsearchId(event.target.value);
      console.log(event.target.value);
    }
  };
  const data = [
    {
      tokenId: 42,
      tokenUri:
        "https://ipfs.io/ipfs/Qma2ah9y7Fntm6VoLuttsoNQrXZeFzBFBEiKS5HUgxYEmB",
      userIdHash: "1270b9193b26d154693",
    },
    {
      tokenId: 42,
      tokenUri:
        "https://ipfs.io/ipfs/Qma2ah9y7Fntm6VoLuttsoNQrXZeFzBFBEiKS5HUgxYEmB",
      userIdHash: "1270b9193b26d154693",
    },
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
  return (
    <nav className="p-5 border-b-2 flex flex-row justify-between items-center">
      <h1 className="py-4 px-4 font-bold text-3xl">FAKE-X</h1>
      <div className="flex flex-row items-center">
        <div class="mx-auto max-w-md">
          <div class="relative mt-1 mr-5 ">
            <input
              type="text"
              placeholder="Enter token id"
              class="w-full px-10 py-2 text-l border border-gray-300  rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              onKeyPress={handleKeyPress}
            />

            <div class="absolute z-10 w-full bg-white mt-2 rounded-lg shadow-lg">
              <ul class="divide-y divide-white rounded-lg  ">
                {searchId && data
                  ? data.map((item) => {
                      return item.tokenId.toString() === searchId ? (
                        <li class="px-4 py-2 cursor-pointer hover:bg-gray-100 ">
                          <span>{item.tokenId} </span>

                          <span>
                            {item.tokenUri.substring(0, 10)}...
                            {item.tokenUri.substring(item.tokenUri.length - 7)}
                          </span>
                        </li>
                      ) : (
                        ""
                      );
                    })
                  : ""}
              </ul>
            </div>
          </div>
        </div>
        <Link href="/">
          <a className="mr-4 p-6">Home</a>
        </Link>
        <Link href="/Listings">
          <a className="mr-4 p-6">Listings</a>
        </Link>
        <Link href="/Profile">
          <a className="mr-4 p-6">Profile</a>
        </Link>
        {value ? (
          <ConnectButton moralisAuth={false} />
        ) : (
          <Button
            onClick={handleClick}
            text="SignIn"
            size="large"
            theme="primary"
          />
        )}
      </div>
    </nav>
  );
}
