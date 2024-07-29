import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Label } from "react-aria-components";
import Page from "~/components/Page";
import Separator from "~/components/Separator";
import { api } from "~/services/api";
import { commitSession, getSession } from "~/session";


export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const user = Object.fromEntries(formData);

    try {
        const response = await api.post("/sign-up", user);

        const token = response.data.token;

        const session = await getSession();

        session.set("token", token);

        return redirect("/login", {
            headers: {
                "Set-Cookie": await commitSession(session),
            }
        });
        
    } catch (error) {
        console.log(JSON.stringify(error, null, 2));

        return null;
    }
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("cookie"));
    
    return session.data.token ?? null;
}

export default function SignUpPage() {
    const [user, setUser] = useState({
        name: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();

    const token = useLoaderData<typeof loader>();

    useEffect(() => {
        if(token) {
            navigate("/home");
        }
    });
    
    function handleChangeInput(event: React.ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        });
    }
    
    return (
        <Page>
            <div className="w-full h-full flex justify-center items-center">

                <Form method="POST" className="flex flex-col gap-4 items-center border rounded-md py-20 px-8">
                    <Label className="text-lg font-medium">Venha aproveitar, faça seu cadastro!</Label>

                    <Separator size={30} />

                    <input onChange={handleChangeInput} type="text" name="name" value={user.name} required placeholder="Seu nome *" className="h-10 p-2 border rounded-md w-[500px]" />

                    <input onChange={handleChangeInput} type="text" name="username" value={user.username.toLowerCase()} required placeholder="Seu usuário *" className="h-10 p-2 border rounded-md w-[500px]" />

                    <input onChange={handleChangeInput} type="text" name="password" value={user.password} required placeholder="Sua senha *" className="h-10 p-2 border rounded-md w-[500px]" />

                    <button className="px-8 h-10 bg-blue-500 w-[500px] text-sm rounded-md text-white hover:opacity-85">Cadastrar</button>

                    <Link to={"/login"}><span className="text-blue-400">Já é cadastrado? Faça login!</span></Link>
                </Form>
            </div>
        </Page>
    );
}
