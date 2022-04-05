import { Routes, Route, useNavigate } from "react-router-dom";
import publicRoutes from "./routes";

const AppRouter = () => {
  const Navigate = useNavigate();
  return (
    <Routes>
      <Route to="/*" element={<Navigate to={publicRoutes[0].Element} />} />
      {
        publicRoutes && publicRoutes.map(({ id, path, Element }) =>
          <Route key={id} path={path} element={<Element />}></Route>
        )
      }
    </Routes>
  )
};

export default AppRouter;