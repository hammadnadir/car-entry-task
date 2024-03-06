import React, { useState } from "react";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getSession, useSession } from "next-auth/react";
import CarCom from "@/components/CarCom";
import { wrapper } from "@/store";

const HomePage = () => {
  return <CarCom />;
};

export const getServerSideProps = wrapper.getServerSideProps(
  store => async ({ req, res }) => {

    const session = await getSession({ req });
    if (!session?.user?.token) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  }
);

export default HomePage;
