import styles from './YmdSelector.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createChildOptions, createParentOptions } from './Options';

/**
 * ステートの型
 */
export type IssueState = {
    parent: string;
    child: string;
};

/**
 * コンポーネントのpropsの型
 */
export type IssueProps = {
    /**
     * 初期値
     */
    initial: IssueState;
    /**
     * 親に値を返すコールバック
     * @param changeValue
     */
    onChange(changeValue: { parent: string; child: string }): void;
};

/**
 * セレクトボックスで選択中の値を取得
 * @param el 対象のセレクトボックス
 */
export const getSelectedValue = (el: React.ChangeEvent<HTMLSelectElement>) => {
    return el.target.options[el.target.selectedIndex].value;
};

export const useParent = (initialValue: string) => {
    const [parent, setParent] = useState(initialValue);
    const onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = getSelectedValue(ev);
        setParent(value);
    };

    return {
        value: parent,
        onChange,
    };
};

export const useChild = (initialValue: string) => {
    const [child, setChild] = useState(initialValue);
    const onChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
        const value = getSelectedValue(ev);
        setChild(value);
    };

    return {
        value: child,
        onChange,
    };
};

//#endregion

/**
 * 親Issueの選択に応じて子Issueのリストが変わるやつ
 * @param props
 */
export const Issue = (props: IssueProps) => {
    const childRef = useRef<HTMLSelectElement>(null);
    const parent = useParent(props.initial.parent);
    const child = useChild(props.initial.child);

    const memorizedParentOptions = createParentOptions();
    const memorizedChildOptions = useMemo(() => {
        return createChildOptions(parent.value);
    }, [parent.value]);

    useEffect(() => {
        const chref = childRef.current;
        const childValue = chref?.options[chref.selectedIndex].value ?? '';
        props.onChange({
            parent: parent.value,
            child: childValue,
        });
    }, [parent.value, child.value]);

    return (
        <>
            <select
                onChange={(ev) => {
                    parent.onChange(ev);
                }}
                defaultValue={'parentTodo1'}
            >
                {memorizedParentOptions}
            </select>
            <span> / </span>
            <select
                ref={childRef}
                onChange={(ev) => {
                    child.onChange(ev);
                }}
                defaultValue={'A'}
            >
                {memorizedChildOptions}
            </select>
        </>
    );
};
