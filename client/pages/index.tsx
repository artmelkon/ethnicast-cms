import {GetStaticProps, GetStaticPropsContext} from 'next';

import Pod, {getStaticProps as sharedGetStaticProps} from './pod'

export default Pod;

export const getStaticProps: GetStaticProps = async (ctx: GetStaticPropsContext) => {
  const func = await sharedGetStaticProps.bind(this);
  return func(ctx)
}
