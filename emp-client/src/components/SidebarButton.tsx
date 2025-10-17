import { type ReactNode } from 'react';

interface Props {
  idx: number;
  text: string;
  onClickCallback: (idx: number) => void;
  icon?: ReactNode;
  selected?: boolean;
}

const SidebarButton = ({
  idx,
  text,
  icon,
  onClickCallback,
  selected,
}: Props) => {
  const handleCallback = () => {
    onClickCallback(idx);
  };

  return (
    <div className='flex justify-center border-b-1 border-b-gray-300'>
      <button
        className={`mx-auto ${selected ? 'bg-white' : 'bg-gray-100'} flex w-full flex-row items-center justify-self-center px-2 hover:bg-white`}
        onClick={handleCallback}
      >
        {icon != null ? icon : null}
        <p className={icon != null ? 'w-1/2' : 'w-full'}>{text}</p>
      </button>
    </div>
  );
};

export default SidebarButton;
