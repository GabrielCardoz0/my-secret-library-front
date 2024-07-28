import {Button, Header, Keyboard, Menu, MenuItem, MenuTrigger, Popover, Section, Separator, Text} from 'react-aria-components';

export default function VerticalDots() {
    return (
        <MenuTrigger>
        <Button />
        <Popover>
            <Menu>
            <MenuItem>
                <Text slot="label" />
                <Text slot="description" />
                <Keyboard />
            </MenuItem>
            <Separator />
            <Section>
                <Header />
                <MenuItem />
            </Section>
            </Menu>
        </Popover>
        </MenuTrigger>
    );
}
