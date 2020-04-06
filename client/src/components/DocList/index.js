import React from 'react';
import { Collapse } from 'antd';

const { Panel } = Collapse;

const DocList = () => {
    return (
        <div>
            <h3 className="text-center mb-5 mt-2">Документы</h3>
            <Collapse>
                <Panel
                    header="Doc Item"
                >
                    wrwerwer
                </Panel>
            </Collapse>
        </div>
    )
}

export default DocList;