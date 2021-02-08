import { useState } from 'react';
import './App.css';
import { Issue, IssueState } from './components/Issue';

/**
 * 子のイベントを受けるやつ
 */
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
