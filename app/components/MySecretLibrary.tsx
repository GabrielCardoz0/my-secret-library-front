import { Link } from "react-router-dom";

export default function MySecretLibrary() {

    return (
        <Link to={"/home"}>
            <div className="h-32 px-10 flex items-center justify-center text-2xl font-semibold">MY SECRET LIBRARY</div>
        </Link>
    );
}
