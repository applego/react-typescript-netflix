import './Popup.scss';

type Props = {
  msg: string;
  backgroundColor: string;
};

export const Popup = ({ msg, backgroundColor }: Props) => {
  return (
    <div className='Popup-container'>
      <div
        className='Popup-content'
        style={{
          backgroundColor: `${backgroundColor}`,
        }}
      >
        <span>{msg}</span>
      </div>
    </div>
  );
};
