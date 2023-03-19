// External dependencies
import { useMemo } from 'react';
import currency from 'currency.js';

// Types & Interfaces
interface UseTotalProps {
  importes: (string | number)[];
}

function useTotal({ importes }: UseTotalProps) {
  const total = useMemo(() => {
    let output = currency(0);

    importes.forEach((importe) => {
      output = output.add(importe);
    });

    return output.value;
  }, [importes]);

  const roundedTotal = useMemo(() => Math.ceil(total), [total]);

  const roundedCents = useMemo(() => currency(roundedTotal)
    .subtract(total).value, [total, roundedTotal]);

  const format = (value: string | number) => currency(value).format();

  const formatedValues = useMemo(() => ({
    total: format(total),
    roundedTotal: format(roundedTotal),
    roundedCents: format(roundedCents),
  }), [total, roundedTotal, roundedCents]);

  return {
    total,
    roundedTotal,
    roundedCents,
    formatedValues,
  };
}

export default useTotal;
