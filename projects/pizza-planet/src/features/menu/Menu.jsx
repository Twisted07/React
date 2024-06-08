import { useLoaderData, useNavigate } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";
import { useSelector } from "react-redux";
import { useEffect } from "react";

function Menu() {
  const menuData = useLoaderData();
  const username = useSelector(state => state.user.username);
  const navigate = useNavigate();

  useEffect(function() {
    if (!username) navigate('/');
  }, [username])

  return (
    <ul className="divide-y divide-stone-200 my-7">
      {menuData.map(pizza => <MenuItem pizza={pizza} key={pizza.id} />)}
    </ul>

  );
}

export async function loader() {
  const menu = await getMenu();
  return menu;
}

export default Menu;
