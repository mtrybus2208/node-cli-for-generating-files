import { storiesOf, addParameters } from '@storybook/html';
import [CAMEL_DATA]Template from './[CAMEL_DATA].twig';
import [PASCAL_DATA] from './[CAMEL_DATA]';
import readme from './README.md';
import './static/index.bundle.css';
import { helpers } from '../stories_include_helper';
import {
    generateBasicLinkArray,
    generateBasicImage,
} from '../../modulesHelpers';
import { withHTML } from '../../.storybook/utils/html';
import {
    withKnobs,
    array,
    text,
    boolean,
    number,
    object,
    color
} from '@storybook/addon-knobs';
 
const stories = storiesOf('[PASCAL_DATA]', module)

stories
    .addDecorator(withKnobs)
    .addDecorator(withHTML())
    .addParameters({
        readme: {
            sidebar: readme,
        },
    })
    .add('basic stories', context => {
        const config = {
            styles:{
                mobile: {},
                desktop: {},
            },
        };
        const codeToCopy = `{% include "templates/modules/[DATA]/index.twig" with ${JSON.stringify(config, null, 2)} %}`; 
        const multi = {
            js: `{% include "templates/modules/[DATA]/static/index.bundle.js" %}`,
            css: `{% include "templates/modules/[DATA]/static/index.bundle.css" %}`,
            templateTwig: `{% include "templates/modules/[DATA]/[CAMEL_DATA].twig" with ${JSON.stringify(config, null, 2)} %}`,
        };
        const helpersObj = helpers(codeToCopy, multi);
        const template = [CAMEL_DATA]Template(config);
        setTimeout(() => {
            [...document.querySelectorAll('.no-search-info')].forEach(el => {
                new [PASCAL_DATA](config, el);
            }); 
        },0);
        return `
            <div class="storybook-root ${boolean('KIOSK ENABLED', false, '###KIOSK/POD###') ? 'kiosk-enabled' : 'kiosk-disabled'}">
                ${template}
                ${helpersObj.template}
            </div>
        `;
    });