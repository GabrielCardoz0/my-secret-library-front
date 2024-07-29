import { Form, redirect, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Button, Key, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, TextArea } from "react-aria-components";
import SubmitButton from "~/components/Button";
import MySecretLibrary from "~/components/MySecretLibrary";
import Page from "~/components/Page";
import Separator from "~/components/Separator";
import { api } from "~/services/api";
import FormInput from "./FormInput";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { getSession } from "~/session";

interface NewBook {
    name: string;
    serie_name: string;
    author: string;
    gender: string;
    img_url: string;
    synopsis: string;
    rating: Key;
    is_read: boolean;
}


export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const formsValues = Object.fromEntries(formData);

    const newBook = {
        ...formsValues,
        rating: Number(formsValues.rating),
        is_read: false
    };

    const session = await getSession(request.headers.get("cookie"));

    const bearedToken = `Bearer ${session.data.token}`;

    try {
        await api.post("/books", newBook, {
            headers: {
                Authorization: bearedToken
            },
        });

        return redirect("/home");
        
    } catch (error) {
        console.log(JSON.stringify(error, null, 2));
    }

    return null;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const session = await getSession(request.headers.get("cookie"));
    
    return session.data.token ?? null;
}

export default function CreateBookPage() {
    const [newBook, setNewBook] = useState<NewBook>({
        name: "",
        serie_name: "",
        author: "",
        gender: "",
        img_url: "",
        synopsis: "",
        rating: 0,
        is_read: false
    });

    const navigate = useNavigate();

    const token = useLoaderData<typeof loader>();

    useEffect(() => {
        if(!token) return navigate("/login");
    }, [token, navigate])

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewBook({
            ...newBook,
            [event.target.name]: event.target.value
        });
    }

    const handleSelectChange = (note: Key) => {
        setNewBook({
            ...newBook,
            rating: note
        });
    }

    return (
        <Page>
            <div className="w-full h-full flex flex-col items-center">
                
                <MySecretLibrary />

                <span className="flex items-center justify-center text-xl">Novo livro</span>

                <Separator size={30} />

                <Form method="POST" className="flex flex-col gap-4">
                    <FormInput onChange={handleChanges} type="text" name="name" value={newBook.name} placeholder="Nome do livro *" />
                    <FormInput onChange={handleChanges} type="text" name="serie_name" value={newBook.serie_name} placeholder="Nome da série do livro" required={false} />
                    <FormInput onChange={handleChanges} type="text" name="author" value={newBook.author} placeholder="Autor *" />
                    <FormInput onChange={handleChanges} type="text" name="gender" value={newBook.gender} placeholder="Gênero *" />
                    <FormInput onChange={handleChanges} type="text" name="img_url" value={newBook.img_url} placeholder="Capa do livro" />
                    
                    <TextArea onChange={handleChanges} name="synopsis" value={newBook.synopsis} required placeholder="Sinopse" className="h-32 p-2 border rounded-md w-[500px]" />
                    
                    <Select className="flex gap-4 items-center" isRequired onSelectionChange={handleSelectChange} name="rating">
                        <Label>Minha nota: </Label>
                        <Button className="flex gap-2 p-2">
                            <SelectValue />
                            <span aria-hidden="true">▼</span>
                        </Button>
                        <Popover>
                            <ListBox className="bg-white rounded-md w-[100px] p-2">
                                <ListBoxItem className="p-1" id={1}>1</ListBoxItem>
                                <ListBoxItem className="p-1" id={2}>2</ListBoxItem>
                                <ListBoxItem className="p-1" id={3}>3</ListBoxItem>
                                <ListBoxItem className="p-1" id={4}>4</ListBoxItem>
                                <ListBoxItem className="p-1" id={5}>5</ListBoxItem>
                            </ListBox>
                        </Popover>
                    </Select>

                    <SubmitButton>Cadastrar</SubmitButton>

                </Form>
            </div>
        </Page>
    )
}
