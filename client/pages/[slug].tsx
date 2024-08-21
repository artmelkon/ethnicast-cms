import React, { Fragment } from "react";
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from "next";
// import Blocks from "../componentHOLD/Blocks";
import type { Page, MainMenu } from "payload/generated-types";

const Page: React.FC<{
  mainMenu: MainMenu;
  page: Page;
}> = (props) => {
  const {
    page: { layout },
  } = props;

  return <h3>Slug Page</h3>;
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug ?? "home";
  console.log("slug home: ", slug);
  const pageQuery = await fetch(
    `${process.env.CMS_URI}/api/pages?where[slug][equals]=${slug}`
  );
  const page = await pageQuery.json();

  if (page.docs.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      page: page.docs[0],
    },
    notFound: Boolean(page.docs.length === 0 ? true : false),
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const pagesQuery = await fetch(`${process.env.CMS_URI}/api/pages?limit=100`);
  const page = await pagesQuery.json();

  const paths = page.docs.map((page: any) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Page;
