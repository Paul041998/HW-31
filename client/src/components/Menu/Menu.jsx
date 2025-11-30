import { menuItems } from "../../common/menu";
import "./Menu.scss";
import { Link } from "react-router";
import { useSelector } from "react-redux";

export default function Menu() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <nav>
      <ul>
        {menuItems.map(
          (item) =>
            !item.hideInMenu &&
            (!item.authRequired || isLoggedIn) && (
              <li key={item.path}>
                <Link to={item.path}>{item.title}</Link>
              </li>
            )
        )}
      </ul>
    </nav>
  );
}
