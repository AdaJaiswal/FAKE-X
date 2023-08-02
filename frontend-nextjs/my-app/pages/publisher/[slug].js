import React from "react";
import { useRouter } from "next/router";
import { Avatar, Card, Form } from "web3uikit";
import PublisherProfile from "../../components/PublisherProfile";
import { getProfile } from "../../utils/ApiCalls";
const slug = (props) => {
  const router = useRouter();
  const userIdHash = router.query.slug;
  const userData = props.data.userData;
  const published = props.data.published;
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
              // `Adarsh Jaiswal`
              userIdHash ? userIdHash.substring(0, 10) : ""
            }
            title={userData.displayName}
            tooltipText={<span style={{ width: 200 }}>Not Verified</span>}
          >
            <div className="flex justify-center align-middle my-10">
              <Avatar
                image={userData.photoUrl}
                isRounded
                theme="image"
                size={150}
              />
            </div>
          </Card>
        </div>
        <PublisherProfile published={published} />
      </div>
    </div>
  );
};
export default slug;
export async function getServerSideProps(context) {
  const { slug } = context.query;
  console.log(slug.toString());
  const url = "http://localhost:8000/getUserProfile";
  const data = await getProfile(url, { userIdHash: slug.toString() });

  data.userIdHash = slug;
  // Pass data to the page via props
  return { props: { data } };
}
