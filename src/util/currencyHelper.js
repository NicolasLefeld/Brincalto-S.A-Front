export const formatCurrency = (number) => {
    return number?.toLocaleString("es-AR", {
        style: "currency",
        currency: "ARS",
        minimumFractionDigits: 2,
    });
};
