import type { PropsWithChildren } from 'react';

const Sidebar = ({ children }: PropsWithChildren) => {
  return (
    <div className='flex h-full w-[22vw] max-w-[25vw] min-w-[15vw] flex-col flex-nowrap border-r-2 border-gray-300 text-center text-lg text-gray-600'>
      {children}
    </div>
  );
};

export default Sidebar;
