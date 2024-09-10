import { filterOptions } from '@/config/Index';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Fragment } from 'react';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';

const ProductFilter = ({ filters, filterHandler }) => {
  return (
    <div className="bg-background rounded-lg shadow-sm poppins-medium">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>

      <div className="p-4 space-y-4">
        {Object.keys(filterOptions).map((item, index) => (
          <Fragment key={index}>
            <div>
              <h3 className="text-base font-bold">{item}</h3>

              <div className="grid gap-2 mt-2">
                {filterOptions[item].map((option, optionIndex) => (
                  <Label
                    className="flex items-center gap-2 font-medium"
                    key={optionIndex}
                  >
                    <Checkbox
                      checked={
                        filters[item] && filters[item].includes(option.id)
                      }
                      onCheckedChange={() => filterHandler(item, option.id)}
                    />
                    {option.label}
                  </Label>
                ))}
              </div>
            </div>
            <Separator />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductFilter;
