import Routes from "./routes";
import VLibras from '@djpfs/react-vlibras'
const App = () => {
  return (
    <>
      <VLibras forceOnload={true} />
      <Routes />
    </>
  );
};
export default App;