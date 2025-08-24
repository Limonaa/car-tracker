export const currency = (v: number, c = 'PLN') =>
    new Intl.NumberFormat('pl-PL', { style: 'currency', currency: c }).format(v);

export const km = (v?: number|null) => (v ?? 0).toLocaleString('pl-PL') + 'km';