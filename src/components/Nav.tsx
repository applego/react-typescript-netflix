import { useEffect, useState } from 'react';
import './Nav.scss';

const src_netflix_logo =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png';
const default_src_avatar_img =
  'https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png';

type Props = {
  className?: string;
};

type Color = {
  [key: string]: number;
};

export const Nav = (props: Props) => {
  const [show, setShow] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(default_src_avatar_img);
  const [backGroundColor, setBackGroundColor] = useState('transparent');

  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 100) {
        setShow(true);
        setBackGroundColor(randomColorRGB());
      } else {
        setShow(false);
        setBackGroundColor('transparent');
      }
    };
    const randomColorRGB = () => {
      let color: Color = { r: 17, g: 17, b: 17 };
      for (let i in color) {
        color[i] = Math.floor(Math.random() * 256);
      }
      return `rgb(${color.r}, ${color.g}, ${color.b})`;
    };

    console.log(props);

    window.addEventListener('scroll', handleShow);
    return () => {
      window.removeEventListener('scroll', handleShow);
    };
  }, []);

  // useEffect(() => {
  //   const handleBackGroundColor = () => {
  //     let strColor = 'transparent';
  //     if (show) {
  //       let color: Color = { r: 17, g: 17, b: 17 };
  //       for (let i in color) {
  //         color[i] = Math.floor(Math.random() * 256);
  //       }
  //       strColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
  //     }
  //     console.log('backGroundColor:' + backGroundColor);
  //     console.log('handleBackGroundColor:' + strColor);
  //     setBackGroundColor(strColor);
  //   };
  //   window.addEventListener('scroll', handleBackGroundColor);
  //   return () => {
  //     window.removeEventListener('scroll', handleBackGroundColor);
  //   };
  // }, []);

  return (
    <div
      className={`Nav ${show && 'Nav-black'}`}
      style={{
        backgroundColor: `${backGroundColor}`,
      }}
    >
      <img className='Nav-logo' src={src_netflix_logo} alt='Netflix Logo' />
      <img
        className='Nav-avatar'
        src={avatarSrc}
        alt='Avatar'
        onClick={() =>
          setAvatarSrc(
            'https://avatars.githubusercontent.com/u/16849933?s=60&v=4'
          )
        }
      />
    </div>
  );
};
