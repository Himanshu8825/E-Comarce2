import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';

const Form = ({
  formControls,
  formData,
  setFormData,
  onSubmit,
  buttonText,
}) => {
  const renderInputsByComponentType = (getControlItem) => {
    let element = null;
    const value = formData[getControlItem.name] || '';

    switch (getControlItem.componentType) {
      case 'Input':
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      case 'select':
        element = (
          <Select
            value={value}
            onValueChange={(val) =>
              setFormData({
                ...formData,
                [getControlItem.name]: val,
              })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options?.length > 0 &&
                getControlItem.options.map((item, index) => (
                  <SelectItem key={index} value={item.id}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        );
        break;

      case 'textarea':
        element = (
          <Textarea
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;

      default:
        element = (
          <Input
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            id={getControlItem.name}
            type={getControlItem.type || 'text'}
            value={value}
            onChange={(e) =>
              setFormData({
                ...formData,
                [getControlItem.name]: e.target.value,
              })
            }
          />
        );
        break;
    }
    return element;
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="flex flex-col gap-3 poppins-medium">
        {formControls.map((item, index) => (
          <div key={index} className="grid w-full gap-1.5">
            <Label htmlFor={item.name} className="mb-1">
              {item.label}
            </Label>
            {renderInputsByComponentType(item)}
          </div>
        ))}
      </div>
      <Button  type="submit" className="mt-4 w-full bg-[#7D0DC3] hover:bg-[#5a058e]">
        {buttonText || 'Submit'}
      </Button>
    </form>
  );
};

export default Form;
