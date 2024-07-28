import { Button, Input, Label } from "react-aria-components";
import Page from "~/components/Page";

export default function LoginPage() {
    return (
        <Page>
            <div className="w-full h-full flex justify-center items-center">

                <form className=" p-4 flex flex-col gap-4 items-center">
                    <Label>LOGIN</Label>
                    <Input type="text" name="username" placeholder="Seu usuário *" className="h-10 p-2 border rounded-md w-[500px]" />

                    <Input type="text" name="password" placeholder="Sua senha *" className="h-10 p-2 border rounded-md w-[500px]" />

                    <Button type="submit" className="px-8 h-10 bg-blue-500 w-[500px] text-xl rounded-md text-white hover:opacity-85">Entrar</Button>
                </form>
            </div>
        </Page>
    );
}
