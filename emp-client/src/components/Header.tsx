import type { PropsWithChildren } from 'react';

const Header = (props: PropsWithChildren) => {
  return (
    <>
      <div className='my-5 flex h-12 flex-row items-center justify-between space-x-3 px-20'>
        <p className='text-3xl font-extrabold'>EMP</p>

        {props.children ? <div>{props.children}</div> : null}
      </div>
    </>
  );
};

export default Header;
