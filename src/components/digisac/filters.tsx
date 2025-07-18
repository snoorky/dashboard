import { ListFilterPlus } from "lucide-react";
import { formatPeriod } from "@/utils/functions";
import { Select } from "../ui/select";
import Card from "../ui/card";

type Option = {
  label: string;
  value: string;
};

type FilterSectionProps = {
  availablePeriods: string[];
  operatorOptions: Option[];
  selectedOperator: string;
  selectedPeriod: string;
  setSelectedOperator: (value: string) => void;
  setSelectedPeriod: (value: string) => void;
}

export function Filters(props: FilterSectionProps) {
  return (
    <section>
      <Card>
        <div className="flex items-center gap-2">
          <ListFilterPlus className="w-5 h-5 text-accent" />
          <h2 className="text-lg font-semibold">Filtros e Métricas</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mt-4">
          <Select id="operators" label="Funcionários"
            options={props.operatorOptions}
            value={props.selectedOperator}
            onChange={props.setSelectedOperator}
          />

          <Select id="periods" label="Períodos"
            options={props.availablePeriods.map((period) => ({ label: formatPeriod(period), value: period }))}
            value={formatPeriod(props.selectedPeriod)}
            onChange={(period) => {
              props.setSelectedPeriod(period);
              props.setSelectedOperator("Todos");
            }}
          />
        </div>
      </Card>
    </section>
  );
}
