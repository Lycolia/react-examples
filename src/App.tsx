import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SelectBox } from './components/SelectBox';
import { Issue, IssueState } from './components/Issue';

export const useIssue = () => {
    const [value, setValue] = useState<IssueState>({
        parent: 'parentTodo1',
        child: 'A',
    });
    const onChange = (props: IssueState) => {
        setValue(props);
    };

    return {
        value,
        onChange,
    };
};

function App() {
    const issue = useIssue();
    return (
        <>
            <Issue initial={issue.value} onChange={issue.onChange}></Issue>
            <br />
            parentIssue: {issue.value.parent}
            <br />
            childIssue: {issue.value.child}
        </>
    );
}

export default App;
