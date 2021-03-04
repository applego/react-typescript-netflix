import './Popup.scss';

type Props = {
  msg: string;
};

export const Popup = ({ msg }: Props) => {
  return (
    <div className='Popup-container'>
      <div className='Popup-content'>
        <span>{msg}</span>
      </div>
    </div>
  );
};
