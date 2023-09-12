
import { screen } from "@testing-library/react";
import Mobile from "./Component/Moblie view/Mobile";
import Desktop from './DeskTop View/Desktop'
import UseSizeProperty from "./UseSizeProperty";
function App() {
  const{width,height}=UseSizeProperty();
  return (
    <div className="App">
  

   {/* {window.innerWidth > 700 ?(<Mobile/>):(<Desktop/>)} */}

{width>560?<Desktop/>:<Mobile/>}
    </div>
  );
}

export default App;
