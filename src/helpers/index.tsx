const toSnakeCase = (str: string) => {
    return str
    .replace(/\d+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");
};

export { toSnakeCase };
