import ModuleBase from '../../moduleBase';
 
export class [PASCAL_DATA] extends ModuleBase {
    constructor(storyConfig = null, el) {
        const els = {
            root: el,
        }

        const CONFIG = {
            styles:  JSON.parse(els.root.dataset.styles),
        };

        super((storyConfig || CONFIG), els); 

        this.generateDynamicStyles(); 
    } 
} 