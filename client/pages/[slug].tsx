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

  return (
    <Fragment>

      {/* <Blocks blocks={layout} /> */}
    </Fragment>
  );
};

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const slug = context.params?.slug ?? "home";
  const pageQuery = await fetch(
    `${process.env.CMS_URI}/api/pages?where[slug][equals]=${slug}`
  );
  const page = await pageQuery.json();

  return {
    props: {
      page: page.docs[0],
    },
    notFound: Boolean(!page.docs[0] ? true : false),
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  const pagesQuery: { docs: Page[] } = await fetch(
    `${process.env.CMS_URI}/api/pages?limit=100`
  );
  const page = await pagesQuery.json();

  const paths = page.docs.map((page) => ({
    params: { slug: page.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default Page;
