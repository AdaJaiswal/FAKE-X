import React from "react";
import { useRouter } from "next/router";
import { Avatar, Card, Form } from "web3uikit";
import PublisherProfile from "../../components/PublisherProfile";
import { getWithTokenId } from "../../utils/ApiCalls";
import MediaInfo from "../../components/mediaInfo";
const MediaDeatils = (props) => {
  const router = useRouter();
  const tokenId = router.query.slug;
  const userName = props.data.tokenData.userName;
  const userIdHash = props.data.userIdHash;
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
              //   `Adarsh Jaiswal`
              userIdHash
                ? `${userIdHash.substring(0, 10)}...${userIdHash.substring(
                    userIdHash.length - 10
                  )}`
                : ""
            }
            title={userName}
            tooltipText={<span style={{ width: 200 }}>Not Verified</span>}
          >
            <div className="flex justify-center align-middle my-10">
              <Avatar
                image="{userData.photoUrl}"
                isRounded
                theme="image"
                size={150}
              />
            </div>
          </Card>
        </div>
        <MediaInfo tokenData={props.data.tokenData} />
      </div>
    </div>
  );
};
export default MediaDeatils;
export async function getServerSideProps(context) {
  const { slug } = context.query;
  //   console.log(slug.toString());
  //   const slug =
  //     "1270b9193b26d15469347e88aedfa3cf18b141dc01014a86fe8e77f4680a911d";
  const urlOfApi = "http://localhost:8000/getWithTokenId";
  const tokenUri =
    "https://ipfs.io/ipfs/QmRji1Cjgya8N31Lhv8srvrTGrNQQqiFpmwuQZ6kNPrtdL";
  const data = await getWithTokenId(urlOfApi, { tokenId: slug.toString() });
  const response = await fetch(tokenUri);
  const tokenData = await response.json();
  data["tokenData"] = tokenData;
  data.tokenData["tokenId"] = slug;
  data.tokenData["timestamp"] = data.timestamp;
  // Pass data to the page via props
  return { props: { data } };
}
