
import {  Input } from "react-aria-components";

interface FormInputProps {
    type: string;
    name: string;
    value: string;
    placeholder: string;
    required?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function FormInput({ type, name, value, placeholder, required = true, onChange }: FormInputProps) {
    return (
        <Input
            type={type}
            name={name}
            value={value}
            required={required}
            placeholder={placeholder}
            className="h-10 p-2 border rounded-md w-[500px]"
            onChange={onChange}
        />
    );
}