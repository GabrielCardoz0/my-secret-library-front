import { Button, Input, Label, ListBox, ListBoxItem, Popover, Select, SelectValue, TextArea } from "react-aria-components";
import SubmitButton from "~/components/Button";
import Page from "~/components/Page";
import Separator from "~/components/Separator";

export default function CreateBookPage() {
    return (
        <Page>
            <div className="w-full h-full flex flex-col items-center">
                
                <div className="h-32 px-10 flex items-center justify-center text-2xl font-semibold">MY SECRET LIBRARY</div>

                <span className="flex items-center justify-center text-xl">Novo livro</span>

                <Separator size={30} />

                <form className="flex flex-col gap-4">
                    <Input type="text" name="name" placeholder="Nome do livro *" className="h-10 p-2 border rounded-md w-[500px]" />
                    <Input type="text" name="serie_name" placeholder="Nome da série do livro" className="h-10 p-2 border rounded-md w-[500px]" />
                    <Input type="text" name="author" placeholder="Autor *" className="h-10 p-2 border rounded-md w-[500px]" />
                    <Input type="text" name="gender" placeholder="Gênero *" className="h-10 p-2 border rounded-md w-[500px]" />
                    <Input type="text" name="img_url" placeholder="Capa do livro" className="h-10 p-2 border rounded-md w-[500px]" />
                    <TextArea name="synopses" placeholder="Sinopse" className="h-32 p-2 border rounded-md w-[500px]" />
                    <Select className="flex gap-4 items-center" isRequired>
                        <Label>Minha nota</Label>
                        <Button className="flex gap-2 p-2">
                            <SelectValue />
                            <span aria-hidden="true">▼</span>
                        </Button>
                        <Popover>
                            <ListBox className="bg-white rounded-md w-[100px] p-2">
                                <ListBoxItem className="p-1">1</ListBoxItem>
                                <ListBoxItem className="p-1">2</ListBoxItem>
                                <ListBoxItem className="p-1">3</ListBoxItem>
                                <ListBoxItem className="p-1">4</ListBoxItem>
                                <ListBoxItem className="p-1">5</ListBoxItem>
                            </ListBox>
                        </Popover>
                    </Select>


                    <SubmitButton>Cadastrar</SubmitButton>

                </form>
            </div>
        </Page>
    )
}