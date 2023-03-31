import axios from "axios";
import apiUrl from "@lib/utils/baseUrl";
import { setCookie } from "cookies-next";
import usersApi from "../api/users";
import { useEffect } from "react";
import { useUserContext } from "../lib/useUserContext";
import Router from "next/router";

const Token = ({result, redirectUrl}) => {
  const { currentUser } = useUserContext();

  useEffect(() => {
    if (!currentUser) {
      Router.push(redirectUrl);
    }
  }, [currentUser]);

  return (
    <>
    </>
  )  
}

export default Token;

export async function getServerSideProps({ query, req, res }) {
  // Example link: https://platform.wildflowerschools.org/token?token=&redirect=https%3A%2F%2Fplatform.wildflowerschools.org%2Fwelcome%2Fexisting-tl
  const token = query.token;
  const redirectUrl = query.redirect;
  
  const api = axios.create({
    baseURL: `${apiUrl}/users`,
    timeout: 3000,
    mode: "no-cors",
    headers: {
      "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers":
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
      "Content-Type": "application/json",
    },
  });
  
  const result = await api.post(`/token`, {
    token: token,
  });
  const response = await result;
  
  setCookie("auth", response.headers["authorization"], {
    maxAge: 60 * 60 * 24,
  });
  console.log("result", result)

  
  return {props: {redirectUrl}};
};
