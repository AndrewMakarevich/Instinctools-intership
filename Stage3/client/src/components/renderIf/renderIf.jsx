const RenderIf = ({ isTrue, children }) =>
  // console.log(isTrue ? 'Should render children' : "Shouldn't render children");
  isTrue ? children : null;
export default RenderIf;
