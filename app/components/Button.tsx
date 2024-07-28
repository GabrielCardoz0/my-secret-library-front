import React from "react";
import { Button } from "react-aria-components";

interface ButtonComponentProps {
    children: React.ReactNode;   
    onPress?: () => void;
}

export default function SubmitButton({ onPress, children }: ButtonComponentProps) {
    return (
        <Button type="submit" onPress={onPress} className="px-8 h-10 bg-blue-500 rounded-md text-white hover:opacity-85">{children}</Button>
    );
}
