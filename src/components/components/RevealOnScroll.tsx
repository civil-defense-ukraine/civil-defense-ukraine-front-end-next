"use client";

import classNames from "classnames";
import { useElementOnScreen } from "../hooks/useElementOnScreen";
import { ReactNode } from "react";
export interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  hiddenClassName?: string;
  visibleClassName?: string;
}

export const RevealOnScroll = ({
  children,
  className,
  hiddenClassName = "hide--left",
  visibleClassName = "show",
}: RevealOnScrollProps) => {
  const { isVisible, container } = useElementOnScreen();

  return (
    <div
      ref={container}
      className={classNames(className, hiddenClassName, {
        [visibleClassName]: isVisible,
      })}
    >
      {children}
    </div>
  );
};
