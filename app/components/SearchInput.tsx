import {SearchField, Label, Input, Button} from 'react-aria-components';

export default function SearchInput() {
    return (
        <SearchField>
            <Label>Search</Label>
            <Input />
            <Button>✕</Button>
        </SearchField>
    );
}
