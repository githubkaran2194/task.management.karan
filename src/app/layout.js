'use client'
import React, { useEffect } from "react";
import Head from "next/head";
import AOS from "aos";
import 'aos/dist/aos.css';
import "./globals.css";
import Header from "@/components/Header";


const RootLayout = ({ children }) => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <html lang="en">
      <Head>
        <title title="Task Mangement" name="title" content="Task Management">Task Management</title>
        <meta name="description" content="Your description here" />
      </Head>
      <body className={""}>
        <Header />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
