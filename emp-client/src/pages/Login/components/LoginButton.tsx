interface Props {
  onClickCallback: () => void;
}
const LoginButton = ({ onClickCallback }: Props) => {
  return (
    <div>
      <button onClick={onClickCallback}>
        <p className=''>Log in</p>
      </button>
    </div>
  );
};

export default LoginButton;
