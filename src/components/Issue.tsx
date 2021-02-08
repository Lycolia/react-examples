import styles from './YmdSelector.module.scss';
import { useEffect, useMemo, useRef, useState } from 'react';
import { createChildOptions, createParentOptions } from './Options';

/**
 * ステートの型
 */
export type IssueState = {
    /**
     * 親Issue
     */
    parent: string;
    /**
     * 子Issue
     */
    child: string;
};

/**
 * コンポーネントの props の型
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
    onChange(changeValue: IssueState): void;
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
 * 親 Issue の選択に応じて子 Issue のリストが変わるやつ
 * @param props
 */
export const Issue = (props: IssueProps) => {
    // 子の状態を常に見れるようにする
    const childRef = useRef<HTMLSelectElement>(null);
    // 親の変更監視
    const parent = useParent(props.initial.parent);
    // 子の変更監視
    const child = useChild(props.initial.child);

    // TSX内に書くと無限に実行されるので結果だけ取る
    const memorizedParentOptions = createParentOptions();
    // parent.value が変更されたときだけ更新されるMemoを作成する
    const memorizedChildOptions = useMemo(() => {
        return createChildOptions(parent.value);
    }, [parent.value]);

    // DOM が更新された時でかつ parent.value か child.value が更新された時に走るやつ
    useEffect(() => {
        // DOM 更新時に onChange が走らないので ref から取得する
        const chref = childRef.current;
        // nullable回避
        const childValue = chref?.options[chref.selectedIndex].value ?? '';
        // 親に伝達
        props.onChange({
            parent: parent.value,
            child: childValue,
        });
    }, [parent.value, child.value]);

    return (
        <>
            {/**
             * onChange={parent.onChange} だと常に呼ばれているため
             * 関数に内包して onChange の時だけ走るようにする
             * 常にコールされてると setState() -> render() -> useEffect() -> setState() の無限ループになり
             * React から warning が出まくる。多分パフォーマンスも良くない
             */}
            <select
                onChange={(ev) => {
                    parent.onChange(ev);
                }}
                defaultValue={props.initial.parent}
            >
                {memorizedParentOptions}
            </select>
            <span> / </span>
            {/**
             * onChange={child.onChange} は useEffect() のトリガー用
             * child.value は親に返さない
             */}
            <select
                ref={childRef}
                onChange={(ev) => {
                    child.onChange(ev);
                }}
                defaultValue={props.initial.child}
            >
                {memorizedChildOptions}
            </select>
        </>
    );
};
