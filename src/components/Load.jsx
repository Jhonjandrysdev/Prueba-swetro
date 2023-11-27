import { Player, Controls } from '@lottiefiles/react-lottie-player';
const Load = () => {
  return (
    <div>
        <Player
  autoplay
  loop
  src = "https://lottie.host/3cca5fdb-630d-40b7-bb5c-a00cbe7bedba/wIBIqY6Hdb.json"
  style={{ height: '300px', width: '300px' }}
>
  <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
</Player>
    </div>
  )
}

export default Load