export const createParentOptions = () => {
    return ['parentTodo1', 'parentTodo2', 'parentTodo3'].map((issue) => {
        return (
            <option key={issue} value={issue}>
                {issue}
            </option>
        );
    });
};

export const createChildOptions = (main: string) => {
    const childItems: { [id: string]: string[] } = {
        parentTodo1: ['A', 'B', 'C'],
        parentTodo2: ['D', 'E', 'F'],
        parentTodo3: ['G', 'H', 'I'],
    };

    return childItems[main].map((sub) => {
        return (
            <option key={sub} value={sub}>
                {sub}
            </option>
        );
    });
};
