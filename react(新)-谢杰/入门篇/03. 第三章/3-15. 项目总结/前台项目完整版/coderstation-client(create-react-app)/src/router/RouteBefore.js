import RouteConfig from "./index.jsx";
import RouteBeforeConfig from "./RouteBeforeConfig";
import { Alert } from "antd";

function RouteBefore() {
  // 导航守卫
  const currentPath = RouteBeforeConfig.filter(
    (item) => item.path === location.pathname
  )[0];

  function closeHandle() {
    location.pathname = "/issues";
  }

  if (currentPath) {
    if (currentPath.needLogin && !localStorage.getItem("userToken")) {
      return (
        <Alert
          message="请先登录"
          type="warning"
          closable
          onClose={closeHandle}
        />
      );
    }
  }

  return <RouteConfig />;
}

export default RouteBefore;
