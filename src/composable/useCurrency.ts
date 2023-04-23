export default function useCurrency() {

    function formatCurrency(value: number, locale: string, currency: string) {
        return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
    }
    return {
        formatCurrency
    }
}