import { configure, addDecorator } from '@storybook/polymer';
import { setOptions } from '@storybook/addon-options';
import { withKnobs } from '@storybook/addon-knobs';
import { withNotes } from '@storybook/addon-notes';
import litAny from '../package';

addDecorator(withKnobs);
addDecorator(withNotes);

function loadStories() {
    const req = require.context('../storybook', true, /\.stories\.js$/);
    req.keys().forEach(filename => req(filename));
}

setOptions({
    name: `lit-any ${litAny.version}`,
    addonPanelInRight: true,
    selectedAddonPanel: 'storybook/notes/panel',
    url: 'https://github.com/wikibus/lit-any',
    sortStoriesByKind: true,
});

configure(loadStories, module);
