import Rotas from "./routes";
import VLibras from '@djpfs/react-vlibras'
const App = () => {
  return (
    <>
      <VLibras forceOnload={true} />
      <Rotas />
    </>
  );
};
export default App;