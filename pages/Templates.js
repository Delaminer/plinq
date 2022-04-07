import { useEffect, useState } from 'react';
import TemplateEditor from './TemplateEditor';

export default function Templates({ templates }) {
    const [selectedTemplate, setSelectedTemplate] = useState(-1);
    const [currentTemplate, setCurrentTemplate] = useState(null);
    useEffect(() => {
        if (selectedTemplate != -1) {
            // We have a current template to modify
            setCurrentTemplate(templates[selectedTemplate]);
        }
        else {
            // There is no template to modify
            setCurrentTemplate(null);
        }
    }, [setCurrentTemplate, selectedTemplate]);

    return (
        <div className='templates'>
            <div className='controls'>
                <p>{templates.length} templates</p>
                <button className='add-template'>ADD</button>
            </div>
            <div className='left column'>
                <ul>
                    {templates.map((template, index) => (
                        <li
                            onClick={() => setSelectedTemplate(index)}
                            className={index == selectedTemplate ? 'active' : ''}
                        >
                            <span>{template.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className='right column'>
                {
                    currentTemplate ? <TemplateEditor template={currentTemplate}/> : (
                        <div>
                            <p>No template selected</p>
                            </div>
                    )
                }
            </div>
        </div>
    );
};
