"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Menu } from "../components/Menu/Menu";
type InitContext = {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
};

const initContext: InitContext = {
  showMenu: false,
  setShowMenu: () => {},
};

export const MenuContext = createContext<InitContext>(initContext);

type Props = {
  children: React.ReactNode;
};

export const MenuProvider: React.FC<Props> = ({ children }) => {
  const [showMenu, setShowMenu] = useState(false);

  const value = useMemo(
    () => ({ showMenu, setShowMenu }),
    [showMenu, setShowMenu]
  );

  return (
    <MenuContext.Provider value={value}>
      {showMenu && createPortal(<Menu />, document.body)}
      {children}
    </MenuContext.Provider>
  );
};
