import Sidebar from '@components/Sidebar';
import SidebarButton from '@components/SidebarButton';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from 'src/app/hooks';
import { setSelected } from 'src/app/slices/sidebarSlice';

const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const selected = useAppSelector(state => state.sidebar.selectedIdx);
  const onButtonSelected = (idx: number) => {
    console.log(idx, ' clicked');
    dispatch(setSelected(idx));
  };

  const buttonData = [
    {
      text: 'Create User',
      icon: <AiOutlineUserAdd size={25} className='w-1/3' />,
    },
    {
      text: 'User Overview',
    },
  ];

  return (
    <Sidebar>
      {buttonData.map((data, index) => {
        return (
          <SidebarButton
            key={index}
            idx={index}
            icon={data.icon}
            text={data.text}
            onClickCallback={onButtonSelected}
            selected={selected == index ? true : false}
          />
        );
      })}
    </Sidebar>
  );
};

export default AdminSidebar;
