const sortCargos = (_cargos = []) => {
  const ordenar_cargos_acendente = true;
  const sortIdentificadores = (
    { tipo_de_cargo: { identificador_periodo: a } },
    { tipo_de_cargo: { identificador_periodo: b } },
  ) => (ordenar_cargos_acendente ? a - b : b - a);

  const sortPeriodos = (a, b) => (ordenar_cargos_acendente ? a - b : b - a);
  const getAccesories = (cargo_padre) => _cargos
    .filter((e) => e.cargo_padre === cargo_padre && e.es_accesorio);

  const cargosPrincipales = _cargos
    .filter((c) => !c.cargo_padre || _cargos.some((a) => a.cargo_padre === c.id))
    .sort((a, b) => (ordenar_cargos_acendente ? a.id - b.id : b.id - a.id));

  const periodos = [...new Set(cargosPrincipales
    .map((cargo) => cargo.tipo_de_cargo.periodo_fiscal.id))].sort(sortPeriodos);
  const entries = periodos
    .map((p) => [p, cargosPrincipales.filter((c) => c.tipo_de_cargo.periodo_fiscal.id === p)
      .sort(sortIdentificadores)]);
  const cargosGroupByPeriod = Object.fromEntries(entries);
  const output = periodos.map((p) => cargosGroupByPeriod[p]).flat()
    .reduce((a, b) => [...a, b, ...getAccesories(b.id)], []);
  return output;
};

export default sortCargos;
