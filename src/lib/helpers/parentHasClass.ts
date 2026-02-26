// More robust: uses Element.closest for class matching up the ancestor chain
const parentHasClass = (element: HTMLElement, ...classNames: string[]) => {
    for (const cls of classNames) {
        if (element.closest?.(`.${cls}`)) return true;
    }
    return false;
};

export default parentHasClass;
