import './Popup.scss';

type Props = {
  msg: string;
};

export const Popup = ({ msg }: Props) => {
  return (
    <div className='Popup'>
      <span>{msg}</span>
    </div>
  );
};
