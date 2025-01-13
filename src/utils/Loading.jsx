import { RotatingLines } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className='min-vh-100 d-flex flex-col justify-content-center align-items-center'>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <RotatingLines
          strokeColor='grey'
          strokeWidth='5'
          animationDuration='0.75'
          width='80'
          visible={true}
        />
      </div>
    </div>
  );
};

export default Loading;
