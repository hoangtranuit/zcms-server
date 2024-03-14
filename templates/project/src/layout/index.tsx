import { ReactNode, useEffect } from "react";
import { useAuth } from "src/stores/user";
import SearchHeader from "src/components/SearchHeader";
import RightHeader from "src/components/RightHeader";
import Footer from "src/components/Footer";
import { useConfig } from "src/stores/app";
import { useNavigate } from "react-router-dom";
import { APIService } from "src/services";
import PageLoader from "src/components/PageLoader";
import { ZLayout } from "@zcmjs/layout";
import app from "src/configs/app";
import "./index.css";

interface Props {
  children?: ReactNode;
}

function AppLayout({ children }: Props) {
  const { loggedIn, actions } = useAuth();
  const { config, actions: configActions, isDarkTheme } = useConfig();
  const navigate = useNavigate();

  useEffect(() => {
    auth();
  }, []);

  const auth = async () => {
    const id = parseInt(sessionStorage.getItem("user_id") || "0");

    if (id < 1) {
      navigate("/login");
      return;
    }

    const user = await APIService.getUser(id);
    if (user.id > 0) {
      actions.login(user);
      configActions.load();

      return;
    }
    navigate("/login");
  };

  if (!loggedIn) return <PageLoader />;

  return (
    <ZLayout
      routes={config.sidebar.menus}
      title={config.name || app.name}
      logo={config.logo || app.logo}
      primaryColor={app.primaryColor}
      isDarkTheme={isDarkTheme}
      headerContentRender={app.layout.search ? () => <SearchHeader /> : null}
      headerRightRender={() => <RightHeader />}
      footerRender={app.layout.footer ? () => <Footer /> : null}
    >
      {children}
    </ZLayout>
  );
}

export default AppLayout;
