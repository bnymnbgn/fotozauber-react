// src/components/ui/Button.jsx

import React from "react";
import { Slot } from "@radix-ui/react-slot"; // Wir nutzen eine kleine Hilfsbibliothek
import { cn } from "../../utils/cn";

const Button = React.forwardRef(
  (
    {
      children,
      variant = "primary",
      size = "md",
      asChild = false, // asChild als Prop definieren
      className,
      ...props
    },
    ref
  ) => {
    // Der "asChild" Prop wird jetzt hier ausgewertet
    const Comp = asChild ? Slot : "button";

    const baseClasses =
      "inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:scale-105";

    const variants = {
      primary:
        "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 focus-visible:ring-purple-500 shadow-lg hover:shadow-xl",
      secondary:
        "bg-gradient-secondary text-white hover:opacity-90 focus-visible:ring-secondary-500 shadow-lg hover:shadow-xl",
      outline:
        "border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white focus-visible:ring-primary-500",
      ghost:
        "text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-gray-500",
      danger:
        "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
    };

    const sizes = {
      sm: "py-2 px-4 text-sm",
      md: "py-3 px-6 text-base",
      lg: "py-4 px-8 text-lg",
      xl: "py-5 px-10 text-xl",
      icon: "h-14 w-14 p-0",
    };

    return (
      <Comp
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export default Button;
