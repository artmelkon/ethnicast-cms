import { GetStaticProps } from "next";
import Page, { getStaticProps as sharedGetStaticProps } from "./[slug]";

export default Page;

export function getStaticProps(ctx: GetStaticProps) {
  const func = sharedGetStaticProps.bind(this);
  return func(ctx);
}
